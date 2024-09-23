import type { IndexContext } from "../models/index-context";
import { Indexer, IndexMode as IndexMode } from "../models/indexer";
import { IndexData } from "../models/index-data";
import { Script, Utils } from "@bsv/sdk";
import { LockTemplate, lockPrefix, lockSuffix } from "../templates/lock";
import { Txo, TxoStatus } from "../models/txo";
import type { Event } from "../models/event";
import { TxoStore } from "../stores/txo-store";
import type { Ordinal } from "./remote-types";
import { Outpoint, type Ingest } from "../models";
import { TxLog } from "../services";

const PREFIX = Buffer.from(lockPrefix, "hex");
const SUFFIX = Buffer.from(lockSuffix, "hex");

export class Lock {
  constructor(public until = 0) { }
}

export class LockIndexer extends Indexer {
  tag = "lock";
  async parse(
    ctx: IndexContext,
    vout: number
  ): Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    const script = Buffer.from(txo.script);
    const prefixIdx = script.indexOf(PREFIX);
    if (prefixIdx === -1) return;
    const suffixIdx = script.indexOf(SUFFIX, prefixIdx + PREFIX.length);
    if (suffixIdx === -1) return;
    const dataScript = Script.fromBinary(
      Array.from(script.subarray(prefixIdx + PREFIX.length, suffixIdx)),
    );
    if (dataScript.chunks[0]?.data?.length != 20 || !dataScript.chunks[1]?.data)
      return;
    const until = parseInt(
      Buffer.from(dataScript.chunks[1]!.data!).reverse().toString("hex"),
      16,
    );
    
    txo.owner = Utils.toBase58Check(dataScript.chunks[0].data!, this.network == 'mainnet' ? [0] : [111]);
    const events: Event[] = [];
    if (txo.owner && this.owners.has(txo.owner)) {
      events.push({ id: "until", value: until.toString().padStart(7, "0") });
      events.push({ id: "address", value: txo.owner });
    }
    return new IndexData(new Lock(until), events);
  }

  async preSave(ctx: IndexContext): Promise<void> {
    const locksIn = ctx.spends.reduce((acc, spends) => {
      if (!spends.data[this.tag]) return acc;
      return acc + spends.satoshis;
    }, 0n)
    const locksOut = ctx.txos.reduce((acc, txo) => {
      if (!txo.data[this.tag]) return acc;
      return acc + txo.satoshis;
    }, 0n);
    const balance = locksIn - locksOut;
    if (balance != 0n) {
      ctx.summary[this.tag] = {
        amount: balance,
      };
    }
  }

  async sync(txoStore: TxoStore, ingestQueue: {[txid: string]: Ingest}): Promise<void>  {
    const limit = 10000;
    for await (const owner of this.owners) {
      let offset = 0;
      let utxos: Ordinal[] = [];
      do {
        const resp = await fetch(
          `https://ordinals.gorillapool.io/api/locks/address/${owner}/unspent?tag=lock&origins=false&limit=${limit}&offset=${offset}`,
        );
        utxos = ((await resp.json()) as Ordinal[]) || [];
        const txos: Txo[] = [];
        for (const u of utxos) {
          if (!u.data?.lock || !u.data.lock.until) continue;
          const txo = new Txo(
            new Outpoint(u.outpoint),
            BigInt(u.satoshis),
            new LockTemplate().lock(owner, u.data.lock.until).toBinary(),
            TxoStatus.Trusted,
          );
          txos.push(txo);
          if (this.mode === IndexMode.Verify) continue;
          txo.owner = owner;
          if (u.height) {
            txo.block = { height: u.height, idx: BigInt(u.idx || 0) };
          }
          txo.data[this.tag] = new IndexData(
            new Lock(u.data.lock.until),
            [
              { id: "until", value: u.data.lock.until.toString().padStart(7, "0") },
              { id: "address", value: owner },
            ],
          );
          txos.push(txo);
        }

        if (this.mode !== IndexMode.Verify) {
          await txoStore.storage.putMany(txos);
        }

        for (const t of txos) {
          let ingest = ingestQueue[t.outpoint.txid];
          if (!ingest) {
            ingest = {
              txid: t.outpoint.txid,
              height: t.block.height,
              source: "lock",
              idx: Number(t.block.idx),
              outputs: [t.outpoint.vout],
              downloadOnly: this.mode === IndexMode.Trust,
            };
            ingestQueue[t.outpoint.txid] = ingest;
          } else {
            ingest.outputs!.push(t.outpoint.vout);
          }
        }

        offset += limit;
      } while (utxos.length == 100);
    }
  }
}
