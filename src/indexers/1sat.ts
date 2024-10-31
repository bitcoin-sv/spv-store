import { IndexData, Indexer, Outpoint, ParseMode, Txo, type Ingest } from "../models";
import { OneSatProvider } from "../providers";
import type { TxoStore } from "../stores";
import { Lock } from "./lock";
import type { Origin } from "./origin";

export class OneSatIndexer extends Indexer {
  tag = "1sat";
  name = "1Sat";

  async sync(txoStore: TxoStore, ingestQueue: { [txid: string]: Ingest }): Promise<number> {
    const oneSat = new OneSatProvider(this.network, txoStore.services.account?.accountId || '');
    const utxos = await oneSat.utxos();
    let maxScore = 0;
    console.log("Syncing", utxos.length, "utxos for ", [...txoStore.owners]);
    let originOutpoints: string[] = [];
    for (const u of utxos) {
      const outpoint = new Outpoint(u.outpoint);
      const txo = new Txo(outpoint, BigInt(u.satoshis), [], 0);
      txo.owner = u.owners?.find(o => txoStore.owners.has(o));
      // if (u.script) {
      //   txo.script = [...Buffer.from(u.script, "base64")];
      // }
      if (txo.owner) {
        if (txo.satoshis > 1n && !u.data?.lock) {
          txo.data["fund"] = new IndexData(txo.owner, [{ id: "address", value: txo.owner }])
        }
        if (u.data?.origin && !u.data?.insc?.file?.type.startsWith('application/bsv-20')) {
          const origin: Origin = {
            outpoint: u.data.origin.outpoint,
            nonce: 0,
            map: u.data.origin.map,
            insc: {
              file: {
                type: u.data.origin?.type || "",
                size: 0,
                hash: "",
                content: [],
              },
            }
          };
          originOutpoints.push(u.outpoint);

          const idxData = new IndexData(origin, []);
          if (origin.outpoint) {
            idxData.events.push({ id: "outpoint", value: origin.outpoint });
          }
          if (origin.insc?.file?.type) {
            idxData.events.push({ id: "type", value: origin.insc.file.type });
          }
          txo.data["origin"] = idxData;
        }
        if (u.data?.ordlock?.status == 0) {
          txo.data["list"] = new IndexData(u.data.ordlock, []);
        }
        if (u.data?.lock) {
          txo.data["lock"] = new IndexData(new Lock(u.data.lock.until), [
            { id: "until", value: u.data.lock.until.toString().padStart(7, "0") },
            { id: "address", value: txo.owner }
          ]);
        }
        if (Object.keys(txo.data).length > 0) {
          await txoStore.storage.put(txo);
        }
      } else {
        console.log("No owner for", u.owners);
      }
      let ingest = ingestQueue[outpoint.txid];
      if (!ingest) {
        ingest = {
          txid: outpoint.txid,
          height: u.height || 0,
          source: "1sat",
          idx: u.idx || 0,
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
    if (originOutpoints.length > 0) {
      const ancestors = await oneSat.getOriginAncestors(originOutpoints);
      for (const ancestor of ancestors) {
        const [txid, vout] = ancestor.outpoint.split("_");
        let ingest = ingestQueue[txid];
        if (!ingest) {
          ingest = {
            txid: txid,
            height: ancestor.height,
            idx: Number(ancestor.idx),
            parseMode: ParseMode.Dependency,
            outputs: [parseInt(vout)],
            source: 'ancestor',
          }
          ingestQueue[txid] = ingest;
        } else {
          ingest.outputs!.push(parseInt(vout));
        }
      }
    }
    return maxScore;
  }
}
