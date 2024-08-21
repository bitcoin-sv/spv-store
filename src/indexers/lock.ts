import type { IndexContext } from "../models/index-context";
import { Indexer } from "../models/indexer";
import { IndexData } from "../models/index-data";
import { Script, Utils } from "@bsv/sdk";
import { LockTemplate, lockPrefix, lockSuffix } from "../templates/lock";
import { Txo, TxoStatus } from "../models/txo";
import type { Event } from "../models/event";
import { TxoStore } from "../stores/txo-store";
import type { Ordinal } from "./remote-types";
import { Outpoint, type Ingest } from "../models";

const PREFIX = Buffer.from(lockPrefix, "hex");
const SUFFIX = Buffer.from(lockSuffix, "hex");

export class Lock {
  constructor(public until = 0) {}
}

export class LockIndexer extends Indexer {
  tag = "lock";
  parse(ctx: IndexContext, vout: number): IndexData | undefined {
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
    txo.owner = Utils.toBase58Check(dataScript.chunks[0].data!);
    const events: Event[] = [];
    if (txo.owner && this.owners.has(txo.owner)) {
      events.push({ id: "until", value: until.toString().padStart(7, "0") });
      events.push({ id: "address", value: txo.owner });
    }
    return new IndexData(new Lock(until), [], events);
  }

  async sync(txoStore: TxoStore): Promise<number> {
    const limit = 10000;
    let lastHeight = 0;
    for await (const owner of this.owners) {
      let offset = 0;
      let utxos: Ordinal[] = [];
      do {
        const resp = await fetch(
          `https://ordinals.gorillapool.io/api/locks/address/${owner}/unspent?limit=${limit}&offset=${offset}`,
        );
        utxos = ((await resp.json()) as Ordinal[]) || [];
        const txos: Txo[] = [];
        for (const u of utxos) {
          if (!u.data?.lock || !u.data.lock.until) continue;
          const txo = new Txo(
            new Outpoint(u.outpoint),
            BigInt(u.satoshis),
            new LockTemplate().lock(owner, u.data.lock.until).toBinary(),
            TxoStatus.TRUSTED,
          );
          if (u.height) {
            txo.block = { height: u.height, idx: BigInt(u.idx || 0) };
          }
          txo.data[this.tag] = new IndexData(
            new Lock(u.data.lock.until),
            [],
            [
              {
                id: "until",
                value: u.data.lock.until.toString().padStart(7, "0"),
              },
              { id: "address", value: owner },
            ],
          );
          lastHeight = Math.max(lastHeight, u.height || 0);
          txos.push(txo);
        }
        await txoStore.storage.putMany(txos);
        await txoStore.queue(
          txos.map(
            (t) =>
              ({
                txid: t.outpoint.txid,
                height: t.block.height,
                idx: Number(t.block.idx),
                checkSpends: true,
                downloadOnly: this.syncMode === TxoStatus.TRUSTED,
              }) as Ingest,
          ),
        );
        offset += limit;
      } while (utxos.length == 100);
    }
    return lastHeight;
  }
}
