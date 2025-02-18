import type { IndexContext, IndexSummary } from "../models/index-context";
import { parseAddress } from "../models/address";
import {
  type Event,
  Indexer,
  type IndexData,
  type Ingest,
  Outpoint,
  ParseMode,
} from "../models";
import type { TxoStore } from "../stores";
import { OneSatProvider } from "../providers";
import type { Network } from "../spv-store";

export class FundIndexer extends Indexer {
  tag = "fund";
  name = "Funds";

  constructor(
      public owners = new Set<string>(),
      public network: Network = "mainnet",
      public syncHistory = false,
    ) {
      super(owners, network);
    }

  async parse(ctx: IndexContext, vout: number): Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    const script = ctx.tx.outputs[vout].lockingScript;
    const address = parseAddress(script, 0, this.network);
    if (txo.satoshis < 2n) return;
    const events: Event[] = [];
    txo.owner = address;
    if (address && this.owners.has(address)) {
      events.push({ id: "address", value: address });
      return {
        data: txo.owner,
        events,
      };
    }
  }

  async summerize(ctx: IndexContext, parseMode: ParseMode, outputs?: Set<number>): Promise<IndexSummary | undefined> {
    let satsOut = 0n
    let satsIn = 0n;
    for (let spend of ctx.spends.values()) {
      if (!spend.script.length) {
        return
      }
      if (spend.data[this.tag]) {
        satsOut += (spend.owner && this.owners.has(spend.owner) ?
          spend.satoshis :
          0n);
      }
    };
    satsIn = ctx.txos.reduce((acc, txo) => {
      if (!txo.data[this.tag]) return acc;
      return acc + (txo.owner && this.owners.has(txo.owner) ?
        txo.satoshis :
        0n);
    }, 0n);

    const balance = Number(satsIn - satsOut);
    if (balance) {
      return {
        amount: balance,
      };
    }
  }

  async sync(txoStore: TxoStore, ingestQueue: { [txid: string]: Ingest }, parseMode = ParseMode.PersistSummary): Promise<number> {
    const oneSat = new OneSatProvider(this.network, txoStore.services.account?.accountId || '');
    let maxScore = 0;
    for (const address of txoStore.owners) {
      const utxos = await oneSat.txosByAddress(address, !this.syncHistory);
      console.log("Syncing", utxos.length, "utxos for ", [...txoStore.owners]);
      for (const u of utxos) {
        if (u.satoshis < 2 || u.data?.lock) continue;
        const outpoint = new Outpoint(u.outpoint);
        let ingest = ingestQueue[outpoint.txid];
        if (!ingest) {
          ingest = {
            txid: outpoint.txid,
            height: u.height || Date.now(),
            source: "1sat",
            idx: u.idx || 0,
            parseMode,
            outputs: [],
          };
          ingestQueue[outpoint.txid] = ingest;
        }
        if (!u.spend) {
          ingest.outputs!.push(outpoint.vout);
        }
        if (u.height < 50000000) {
          maxScore = Math.max(maxScore, u.height * 1e9 + u.idx);
        }
      }
    }
    return maxScore;
  }
}
