import { IndexData, Indexer, Outpoint, ParseMode, Txo, type Ingest } from "../models";
import type { TxoStore } from "../stores";
import type { Origin } from "./origin";

export class OneSatIndexer extends Indexer {
  tag = "1sat";
  name = "1Sat";

  async sync(txoStore: TxoStore, ingestQueue: { [txid: string]: Ingest }): Promise<number> {
    // const outputs = new Map<string, number[]>();

    const utxos = await txoStore.services.account!.utxos();
    let maxScore = 0;
    for (const u of utxos) {
      const outpoint = new Outpoint(u.outpoint);
      const txo = new Txo(outpoint, BigInt(u.satoshis), [], 0);
      txo.owner = u.owners?.find(o => txoStore.owners.has(o));
      if (txo.owner) {
        if (txo.satoshis > 1n) {
          txo.data["fund"] = new IndexData(txo.owner, [{ id: "address", value: txo.owner }])
        }
        if (u.origin) {
          const origin: Origin = {
            outpoint: u.origin.outpoint,
            nonce: 0,
            map: u.origin.map,
            insc: u.origin.data?.insc,
          }

          const idxData = new IndexData(origin, []);
          if (u.origin.outpoint) {
            idxData.events.push({ id: "data", value: u.origin.outpoint });
          }
          if (origin.insc?.file?.type) {
            idxData.events.push({ id: "type", value: origin.insc.file.type });
          }
          txo.data["origin"] = idxData;
        }
        if (u.data?.list) {
          txo.data["list"] = new IndexData(u.data.list, []);
        }
        if (Object.keys(txo.data).length > 0) {
          txoStore.storage.put(txo);
        }
      }
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
    return maxScore;
  }
}
