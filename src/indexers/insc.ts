import { Hash, OP, Utils } from "@bsv/sdk";
import type { IndexContext } from "../models/index-context";

import {
  IndexData,
  Indexer,
  Outpoint,
  parseAddress,
  type Event,
} from "../models";

export interface File {
  hash : string;
  size : number;
  type : string;
  text ?: string;
  json ?: { [key : string] : any };
}

export interface Inscription {
  file ?: File;
  fields ?: { [key : string] : any };
  parent ?: string;
}

export class OrdIndexer extends Indexer {
  tag = "insc";

  async parse(
    ctx : IndexContext,
    vout : number,
    previewOnly = false,
  ) : Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    if (txo.satoshis != 1n) return;
    const script = ctx.tx.outputs[vout].lockingScript;
    let fromPos : number | undefined;
    for (let i = 0; i < script.chunks.length; i++) {
      const chunk = script.chunks[i];
      if (
        i >= 2 &&
        chunk.data?.length === 3 &&
        Utils.toUTF8(chunk.data) == "ord" &&
        script.chunks[i - 1].op == OP.OP_IF &&
        script.chunks[i - 2].op == OP.OP_FALSE
      ) {
        fromPos = i + 1;
      }
    }
    if (fromPos === undefined) return;

    if (!txo.owner) txo.owner = parseAddress(script, 0);
    const insc = {
      file: { hash: "", size: 0, type: "" },
      fields: {},
    } as Inscription;

    for (let i = fromPos; i < script.chunks.length; i += 2) {
      const field = script.chunks[i];
      if (field.op == OP.OP_ENDIF) {
        if (!txo.owner) txo.owner = parseAddress(script, i + 1);
        if (!txo.owner && script.chunks[i + 1]?.op == OP.OP_CODESEPARATOR) {
          txo.owner = parseAddress(script, i + 2);
        }
        break;
      }
      if (field.op > OP.OP_16) return;
      const value = script.chunks[i + 1];
      if (value.op > OP.OP_PUSHDATA4) return;

      if (field.data?.length || 0 > 1) {
        if (!insc.fields) insc.fields = {};
        insc.fields[Buffer.from(field.data!).toString()] = value.data;
        continue;
      }
      // TODO: handle MAP

      let fieldNo = 0;
      if (field.op > OP.OP_PUSHDATA4 && field.op <= OP.OP_16) {
        fieldNo = field.op - 80;
      } else if (field.data?.length) {
        fieldNo = field.data[0];
      }
      switch (fieldNo) {
        case 0:
          insc.file.size = value.data?.length || 0;
          if (!value.data?.length) break;
          insc.file.hash = Utils.toHex(Hash.sha256(value.data));
          if (value.data?.length <= 1024) {
            try {
              const text = new TextDecoder("utf8", {
                fatal: true,
              }).decode(Buffer.from(value.data));
              // insc.file.json = JSON.parse(text);
            } catch {
              console.log("Error parsing text");
            }
          }
          break;
        case 1:
          insc.file.type = Buffer.from(value.data || []).toString();
          break;
        case 3:
          if (!value.data || value.data.length != 36) break;
          try {
            const parent = new Outpoint(value.data);
            if (
              !ctx.spends.find(
                (s) => s.outpoint.toString() == parent.toString(),
              )
            )
              continue;
            insc.parent = parent.toString();
          } catch {
            console.log("Error parsing parent outpoint");
          }
          break;
        default:
          if (!insc.fields) insc.fields = {};
          insc.fields[fieldNo.toString()] =
            value.data && Buffer.from(value.data).toString("base64");
      }
    }

    const events : Event[] = [];
    if (!previewOnly && txo.owner && this.owners.has(txo.owner)) {
      events.push({ id: "address", value: txo.owner });
    }
    return new IndexData(insc, events);
  }

  // async sync(txoStore: TxoStore): Promise<number> {
  //     const limit = 100;
  //     let lastHeight = 0;
  //     for await (const owner of this.owners) {
  //         let offset = 0;
  //         let utxos: Ordinal[] = [];
  //         offset = 0;
  //         if (this.mode !== IndexMode.Verify) {
  //             do {
  //                 const url = `https://ordinals.gorillapool.io/api/txos/address/${owner}/unspent?limit=${limit}&offset=${offset}&bsv20=false`;
  //                 const resp = await fetch(url);
  //                 utxos = ((await resp.json()) as Ordinal[]) || [];
  //                 const txos: Txo[] = [];
  //                 for (const u of utxos) {
  //                     const ord: Ord = {};
  //                     if (u.origin?.data?.bsv20) continue;
  //                     const events: Event[] = [{ id: "address", value: owner }];
  //                     if (u.origin?.data?.insc && u.origin?.data?.insc?.file) {
  //                         ord.insc = { file: u.origin.data.insc.file };
  //                     }
  //                     if (u.origin?.data?.insc) {
  //                         ord.origin = {
  //                             outpoint: new Outpoint(u.origin.outpoint),
  //                             nonce: 0,
  //                             insc: { file: u.origin.data.insc.file },
  //                         };
  //                     }
  //                     if (!ord.origin && !ord.insc) continue;
  //                     const txo = new Txo(
  //                         new Outpoint(u.outpoint),
  //                         1n,
  //                         new P2PKH().lock(Utils.fromBase58Check(owner).data).toBinary(),
  //                         TxoStatus.Trusted,
  //                     );
  //                     if (u.height) {
  //                         txo.block = { height: u.height, idx: BigInt(u.idx || 0) };
  //                     }
  //                     txo.data[this.tag] = new IndexData(ord, undefined, events);
  //                     if (u.data?.list && u.data?.list.payout && u.data?.list.price) {
  //                         const price = BigInt(u.data.list.price);
  //                         txo.data.list = new IndexData(
  //                             {
  //                                 payout: Utils.toArray(u.data.list.payout, "base64"),
  //                                 price,
  //                             },
  //                             undefined,
  //                             [{ id: "price", value: price.toString(16).padStart(16, "0") }],
  //                         );
  //                     }
  //                     lastHeight = Math.max(lastHeight, u.height || 0);
  //                     txos.push(txo);
  //                 }

  //                 await txoStore.storage.putMany(txos);
  //                 if (this.mode !== IndexMode.Trust) {
  //                     const resp = await fetch(
  //                         `https://ordinals.gorillapool.io/api/inscriptions/ancestors`,
  //                         {
  //                             method: "POST",
  //                             headers: { "Content-Type": "application/json" },
  //                             body: JSON.stringify(txos.map((t) => t.outpoint)),
  //                         },
  //                     );
  //                     const ancestors = (await resp.json()) as {
  //                         txid: string;
  //                         idx: string;
  //                         height?: number;
  //                     }[];
  //                     await txoStore.queue(
  //                         ancestors.map(
  //                             (u) =>
  //                                 ({
  //                                     txid: u.txid,
  //                                     height: Number(u.height || Date.now()),
  //                                     idx: Number(u.idx || 0),
  //                                     isDepOnly: true,
  //                                 }) as Ingest,
  //                         ),
  //                     );
  //                 }

  //                 await txoStore.queue(
  //                     txos.map(
  //                         (t) =>
  //                             ({
  //                                 txid: t.outpoint.txid,
  //                                 height: t.block.height,
  //                                 idx: Number(t.block.idx),
  //                                 checkSpends: true,
  //                                 downloadOnly: this.mode === IndexMode.Trust,
  //                             }) as Ingest,
  //                     ),
  //                 );

  //                 offset += limit;
  //             } while (utxos.length == limit);
  //         }
  //     }
  //     return lastHeight;
  // }
}
