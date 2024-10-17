import { Indexer, Outpoint, ParseMode, type Ingest } from "../models";
import type { TxoStore } from "../stores";

export class OneSatIndexer extends Indexer {
  tag = "1sat";
  name = "1Sat";

  async sync(txoStore: TxoStore, ingestQueue: { [txid: string]: Ingest }): Promise<number> {
    // const outputs = new Map<string, number[]>();

    const utxos = await txoStore.services.account!.utxos();
    let maxScore = 0;
    for (const u of utxos) {
      const outpoint = new Outpoint(u.outpoint);
      let ingest = ingestQueue[outpoint.txid];
      if (!ingest) {
        ingest = {
          txid: outpoint.txid,
          height: 0,
          source: "1sat",
          idx: 0,
          parseMode: ParseMode.Persist,
          outputs: [outpoint.vout],
        };
        ingestQueue[outpoint.txid] = ingest;
      } else {
        ingest.outputs!.push(outpoint.vout);
      }
      if (u.height < 50000000) {
        maxScore = Math.max(maxScore, u.height * 1000000000 + u.idx);
      }
    }
    // for (const [txid, vouts] of outputs) {
    //   const tx = await txoStore.stores.txns!.loadTx(txid, true);
    //   if (!tx) {
    //     continue;
    //   }

    //   // await txoStore.ingest(tx, "1sat", ParseMode.Persist, true, vouts);
    //   ingest = {
    //     txid: t.outpoint.txid,
    //     height: t.block.height,
    //     source: "origin",
    //     idx: Number(t.block.idx),
    //     parseMode: ParseMode.Persist,
    //     outputs: [t.outpoint.vout],
    //   };
    // }
    return maxScore;
  }
}
