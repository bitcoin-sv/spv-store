import { Hash, HD, Utils } from "@bsv/sdk";
import { Outpoint, Txo, TxoStatus, type Ingest } from "../models";
import type { IndexContext } from "../models/index-context";
import { IndexData } from "../models/index-data";
import { Indexer, IndexMode } from "../models/indexer";
import type { TxoStore } from "../stores";
import type { RemoteBsv20 } from "./remote-types";
import { OneSatProvider } from "../providers/1sat-provider";

export const FEE_XPUB = 'xpub661MyMwAqRbcF221R74MPqdipLsgUevAAX4hZP2rywyEeShpbe3v2r9ciAvSGT6FB22TEmFLdUyeEDJL4ekG8s9H5WXbzDQPr6eW1zEYYy9'
const hdKey = HD.fromString(FEE_XPUB);
export class Bsv20 {
  status = 0;
  public tick = "";
  public op = "";
  public amt = 0n;
  public dec = 0;
  public reason?: string;
  public fundAddress = "";

  static fromJSON(obj: any): Bsv20 {
    const bsv20 = new Bsv20();
    Object.assign(bsv20, {
      ...obj,
      amt: BigInt(obj.amt),
    });
    return bsv20;
  }
}

export class Bsv20Indexer extends Indexer {
  tag = "bsv20";

  async parse(ctx: IndexContext, vout: number): Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    if (!txo.data.insc?.data) return;
    if (txo.data.insc?.data.file.type !== "application/bsv-20") return;
    let bsv20: Bsv20;
    try {
      bsv20 = Bsv20.fromJSON(JSON.parse(Utils.toUTF8(txo.data.insc?.data.file.content)));
      const data = new IndexData(bsv20);
      const amt = BigInt(bsv20.amt);
      if (amt <= 0n || amt > 2 ** 64 - 1) return;
      switch (bsv20.op) {
        case "deploy":
          if (bsv20.dec || 0 > 18) return;
          break;
        case "mint":
        case "transfer":
        case "burn":
          break;
        default:
          return;
      }
      if (!bsv20.tick) {
        return;
      }
      if(this.mode !== IndexMode.Verify) {
        const provider = new OneSatProvider(this.network);
        const remote = await provider.getBsv20Txo(txo.outpoint);
        bsv20.status = remote?.status || 0;
      }
      bsv20.fundAddress = deriveFundAddress(bsv20.tick)
      if(txo.owner && this.owners.has(txo.owner)) {
        data.events.push({ id: "tick", value: bsv20.tick });
      }
      return data;
    } catch (e) {
      return;
    }
  }

  async sync(txoStore: TxoStore, ingestQueue: {[txid: string]: Ingest}): Promise<void>  {
    const limit = 100;
    for await (const owner of this.owners) {
      let resp = await fetch(
        `https://ordinals.gorillapool.io/api/bsv20/${owner}/balance`,
      );
      const balance = (await resp.json()) as RemoteBsv20[];
      for await (const token of balance) {
        if (!token.tick) continue;
        console.log("importing", token.tick);
        // try {
        let offset = 0;
        let utxos: RemoteBsv20[] = [];
        do {
          resp = await fetch(
            `https://ordinals.gorillapool.io/api/bsv20/${owner}/tick/${token.tick}?limit=${limit}&offset=${offset}&includePending=true`,
          );
          utxos = ((await resp.json()) as RemoteBsv20[]) || [];
          const txos: Txo[] = [];
          for (const u of utxos) {
            const txo = new Txo(
              new Outpoint(u.txid, u.vout),
              1n,
              Utils.toArray(u.script, "base64"),
              TxoStatus.Trusted,
            );
            if (u.height) {
              txo.block = { height: u.height, idx: BigInt(u.idx || 0) };
            }
            
            txo.data[this.tag] = new IndexData(
              Bsv20.fromJSON({
                tick: token.tick,
                amt: u.amt,
                dec: token.dec,
                sym: token.sym,
                op: u.op!,
                status: u.status,
                icon: token.icon,
                fundAddress: deriveFundAddress(token.tick)
              }),
              [
                { id: "address", value: owner },
                { id: "tick", value: token.tick },
              ],
            );
            if (u.listing && u.payout && u.price) {
              const price = BigInt(u.price);
              txo.data.list = new IndexData(
                {
                  payout: Utils.toArray(u.payout, "base64"),
                  price,
                },
                [
                  {
                    id: "price",
                    value: price.toString(16).padStart(16, "0"),
                  },
                ],
              );
            }
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
                source: "bsv20",
                idx: Number(t.block.idx),
                outputs: [t.outpoint.vout],
                downloadOnly: true,
              };
              ingestQueue[t.outpoint.txid] = ingest;
            } else {
              ingest.outputs!.push(t.outpoint.vout);
            }
          }
          // if (this.syncMode !== TxoStatus.TRUSTED) {
          //   resp = await fetch(
          //     `https://ordinals.gorillapool.io/api/bsv20/${owner}/id/${token.id}/ancestors`,
          //   );
          //   const txids = (await resp.json()) as { [score: string]: string };
          //   await txoStore.queue(
          //     Object.entries(txids).map(([score, txid]) => {
          //       const [height, idx] = score.split(".");
          //       return {
          //         txid,
          //         height: Number(height || Date.now()),
          //         idx: Number(idx || 0),
          //         isDep: true
          //       } as Ingest
          //     })
          //   );
          // }

          offset += limit;
        } while (utxos.length == limit);
      }
    }
  }
}

export function deriveFundAddress(idOrTick: string | number[]): string {
  const hash = Hash.sha256(idOrTick);
  const reader = new Utils.Reader(hash);
  let path = `m/21/${reader.readUInt32BE()>>1}`;
  reader.pos = 24;
  path += `/${reader.readUInt32BE()>>1}`;
  return hdKey.derive(path).pubKey.toAddress();
}