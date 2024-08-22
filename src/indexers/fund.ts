import type { IndexContext } from "../models/index-context";
import { parseAddress } from "../models/address";
import { P2PKH, Utils } from "@bsv/sdk";
import { TxoStore } from "../stores/txo-store";
import {
  type Event,
  Indexer,
  IndexData,
  Txo,
  TxoStatus,
  Outpoint,
  type Ingest,
  IndexMode,
} from "../models";
import type { Ordinal } from "./remote-types";

export class FundIndexer extends Indexer {
  tag = "fund";

  async parse(ctx : IndexContext, vout : number) : Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    const script = ctx.tx.outputs[vout].lockingScript;
    const address = parseAddress(script, 0);
    if (txo.satoshis < 2n) return;
    const events : Event[] = [];
    if (address && this.owners.has(address)) {
      txo.owner = address;
      events.push({ id: "address", value: address });
    }
    return new IndexData(address, events);
  }

  async preSave(ctx : IndexContext) : Promise<void> {
    let satsIn = ctx.spends.reduce((acc, spends) => {
      return acc + (spends.owner && this.owners.has(spends.owner) ?
        spends.satoshis :
        0n);
    }, 0n);
    let satsOut = ctx.txos.reduce((acc, txo) => {
      return acc + (txo.owner && this.owners.has(txo.owner) ?
        txo.satoshis :
        0n);
    }, 0n);
    const balance = satsIn - satsOut;
    if (balance != 0n) {
      ctx.summary[this.tag] = balance.toString();
    }
  }

  async sync(txoStore : TxoStore) : Promise<number> {
    const limit = 10000;
    let lastHeight = 0;
    for await (const owner of this.owners) {
      let offset = 0;
      let utxos : Ordinal[] = [];
      do {
        const resp = await fetch(
          `https://ordinals.gorillapool.io/api/txos/address/${owner}/unspent?limit=${limit}&offset=${offset}`,
        );
        utxos = ((await resp.json()) as Ordinal[]) || [];
        const txos : Txo[] = [];
        for (const u of utxos) {
          if (u.satoshis < 2) continue;
          const txo = new Txo(
            new Outpoint(u.outpoint),
            BigInt(u.satoshis),
            new P2PKH().lock(Utils.fromBase58Check(owner).data).toBinary(),
            TxoStatus.Trusted,
          );
          txos.push(txo);
          if (this.mode === IndexMode.Verify) continue;
          txo.owner = owner;
          if (u.height) {
            txo.block = { height: u.height, idx: BigInt(u.idx || 0) };
          }
          txo.data[this.tag] = new IndexData(owner, [
            { id: "address", value: owner },
          ]);
          lastHeight = Math.max(lastHeight, u.height || 0);
        }
        if (this.mode !== IndexMode.Verify) {
          await txoStore.storage.putMany(txos);
        }
        if (this.mode != IndexMode.Trust) {
          await txoStore.queue(txos.map((t) => ({
            txid: t.outpoint.txid,
            height: t.block.height,
            idx: Number(t.block.idx),
            checkSpends: true,
            downloadOnly: this.mode === IndexMode.Trust,
          }) as Ingest));
        }
        offset += limit;
      } while (utxos.length == 100);
    }
    return lastHeight;
  }
}
