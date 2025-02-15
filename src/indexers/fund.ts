import type { IndexContext } from "../models/index-context";
import { parseAddress } from "../models/address";
import {
  type Event,
  Indexer,
  IndexData,
  type Ingest,
  Outpoint,
  ParseMode,
} from "../models";
import type { TxoStore } from "../stores";
import { OneSatProvider } from "../providers";

export class FundIndexer extends Indexer {
  tag = "fund";
  name = "Funds";

  async parse(ctx: IndexContext, vout: number): Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    const script = ctx.tx.outputs[vout].lockingScript;
    const address = parseAddress(script, 0, this.network);
    if (txo.satoshis < 2n) return;
    const events: Event[] = [];
    txo.owner = address;
    if (address && this.owners.has(address)) {
      events.push({ id: "address", value: address });
      return new IndexData(txo.owner, events);
    }
  }

  async preSave(ctx: IndexContext): Promise<void> {
    let satsOut = ctx.spends.reduce((acc, spends) => {
      if (!spends.data[this.tag]) return acc;
      return acc + (spends.owner && this.owners.has(spends.owner) ?
        spends.satoshis :
        0n);
    }, 0n);
    let satsIn = ctx.txos.reduce((acc, txo) => {
      if (!txo.data[this.tag]) return acc;
      return acc + (txo.owner && this.owners.has(txo.owner) ?
        txo.satoshis :
        0n);
    }, 0n);
    const balance = Number(satsIn - satsOut);
    if (balance) {
      ctx.summary[this.tag] = {
        amount: balance,
      };
    }
  }

  async sync(txoStore: TxoStore, ingestQueue: { [txid: string]: Ingest }): Promise<number> {
      const oneSat = new OneSatProvider(this.network, txoStore.services.account?.accountId || '');
      let maxScore = 0;
      for (const address of txoStore.owners) {
        const utxos = await oneSat.txosByAddress(address, true);
        console.log("Syncing", utxos.length, "utxos for ", [...txoStore.owners]);
        for (const u of utxos) {
          if (!u.owners?.includes(address) || u.satoshis < 2n || u.data?.lock) continue;
          const outpoint = new Outpoint(u.outpoint);
          let ingest = ingestQueue[outpoint.txid];
          if (!ingest) {
            ingest = {
              txid: outpoint.txid,
              height: u.height || 0,
              source: "1sat",
              idx: u.idx || 0,
              parseMode: ParseMode.Persist,
              outputs: [],
            };
            ingestQueue[outpoint.txid] = ingest;
          }
          if (!u.spend) {
            ingest.outputs!.push(outpoint.vout);
          }
          if (u.height < 50000000) {
            maxScore = Math.max(maxScore, u.height * 1000000000 + u.idx);
          }
        }
      }
      return maxScore;
    }
}
