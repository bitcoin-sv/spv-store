import { Indexer, Outpoint, ParseMode, type Ingest } from "../models";
import { OneSatProvider } from "../providers";
import type { Network } from "../spv-store";
import type { TxoStore } from "../stores";

export class OneSatIndexer extends Indexer {
  tag = "1sat";
  name = "1Sat";

  constructor(
    public owners = new Set<string>(),
    public network: Network = "mainnet",
    public syncHistory = false,
  ) {
    super(owners, network);
  }

  async sync(txoStore: TxoStore, ingestQueue: { [txid: string]: Ingest }, parseMode = ParseMode.PersistSummary): Promise<number> {
    const oneSat = new OneSatProvider(this.network, txoStore.services.account?.accountId || '');
    let maxScore = 0;
    for (const address of txoStore.owners) {
      const utxos = await oneSat.txosByAddress(address, !this.syncHistory);
      console.log("Syncing", utxos.length, "utxos for ", address);
      for (const u of utxos) {
        if (u.satoshis == 1 && u.data.insc?.file.type.startsWith("application/bsv-20")) continue;
        const outpoint = new Outpoint(u.outpoint);
        let ingest = ingestQueue[outpoint.txid];
        if (!ingest) {
          ingest = {
            txid: outpoint.txid,
            height: u.height || 0,
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
