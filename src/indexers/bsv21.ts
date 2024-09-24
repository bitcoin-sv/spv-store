
import type { IndexContext } from "../models/index-context";
import { IndexData } from "../models/index-data";
import { Indexer, IndexMode } from "../models/indexer";
import { Txo, TxoStatus } from "../models/txo";
import { Hash, HD, Utils } from "@bsv/sdk";
import { TxoStore } from "../stores/txo-store";
import { Outpoint, type Ingest } from "../models";
import type { RemoteBsv20 } from "./remote-types";
import { deriveFundAddress, FEE_XPUB } from "./bsv20";
import { OneSatProvider } from "../providers/1sat-provider";
import type { Network } from "../spv-store";

export enum Bsv21Status {
  Invalid = -1,
  Pending = 0,
  Valid = 1,
}

const hdKey = HD.fromString(FEE_XPUB);

export class Bsv21 {
  status = Bsv21Status.Pending;
  public id: string;
  public op = "";
  public amt = 0n;
  public dec = 0;
  public sym?: string;
  public icon?: string;
  public supply?: bigint;
  public contract?: string;
  public reason?: string;
  public fundAddress = "";

  constructor(props: Bsv21) {
    this.id = props.id || "";
    Object.assign(this, props);

  }

  static fromJSON(obj: any): Bsv21 {
    // if (typeof obj.id != "string" && !Array.isArray(obj.id)) return;
    const bsv21 = new Bsv21({
      id: new Outpoint(obj.id as string),
      ...obj,
      amt: BigInt(obj.amt),
    });
    return bsv21;
  }
}

export class Bsv21Indexer extends Indexer {
  tag = "bsv21";
  provider: OneSatProvider;
  constructor(
    public owners = new Set<string>(),
    public mode: IndexMode,
    public network: Network = "mainnet",
  ) { 
    super(owners, mode, network);
    this.provider = new OneSatProvider(network);
  }

  async parse(ctx: IndexContext, vout: number): Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    if (!txo.data.insc?.data) return;
    if (txo.data.insc?.data.file.type !== "application/bsv-20") return;
    let bsv21: Bsv21;
    try {
      bsv21 = Bsv21.fromJSON(JSON.parse(Utils.toUTF8(txo.data.insc?.data.file.content)));
    } catch (e) {
      return;
    }
    const data = new IndexData(bsv21);
    if (bsv21.amt <= 0n || bsv21.amt > 2 ** 64 - 1) return;
    switch (bsv21.op) {
      case "deploy+mint":
        if (bsv21.dec > 18) return;
        bsv21.id = txo.outpoint.toString();
        bsv21.supply = bsv21.amt;
        bsv21.status = Bsv21Status.Valid;
        bsv21.fundAddress = deriveFundAddress(txo.outpoint.toBEBinary());
        break;
      case "transfer":
      case "burn":
        break;
      default:
        return;
    }
    if (!bsv21.id) {
      return;
    }
    if (txo.owner && this.owners.has(txo.owner)) {
      data.events.push({ id: "address", value: txo.owner });
      data.events.push({ id: "id", value: bsv21.id.toString() });
      if (bsv21.contract) {
        data.events.push({ id: "contract", value: bsv21.contract });
      }
    }

    return data;
  }

  async preSave(ctx: IndexContext) {
    const balance: { [id: string]: bigint } = {};
    const tokensIn: { [id: string]: Txo[] } = {};
    for (const spend of ctx.spends) {
      const bsv21 = spend.data.bsv21;
      if (!bsv21) continue;
      if (bsv21.data.status != Bsv21Status.Valid && this.mode !== IndexMode.Verify) {
        const remote = await this.provider.getBsv2021Txo(spend.outpoint);
        if (remote) {
          bsv21.data.status = remote.status;
          bsv21.data.sym = remote.sym;
          bsv21.data.icon = remote.icon;
          bsv21.data.dec = remote.dec;
        }
      }
      if (bsv21.data.status == Bsv21Status.Valid) {
        if (!tokensIn[bsv21.data.id]) {
          tokensIn[bsv21.data.id] = [];
        }
        tokensIn[bsv21.data.id].push(spend);
        balance[bsv21.data!.id] =
          (balance[bsv21.data!.id] || 0n) + bsv21.data.amt;
      }
    }
    const tokensOut: { [id: string]: Txo[] } = {};
    const reasons: { [id: string]: string } = {};
    for (const txo of ctx.txos) {
      const bsv21 = txo.data?.bsv21;
      if (!bsv21 || !["transfer", "burn"].includes(bsv21.data.op)) continue;
      let token: Bsv21 | undefined;
      for (const spend of tokensIn[bsv21.data.id] || []) {
        token = spend.data.bsv21.data;
        bsv21.deps.push(spend.outpoint);
      }
      if ((balance[bsv21.data.id] || 0n) < bsv21.data.amt) {
        reasons[bsv21.data.id] = "Insufficient inputs";
      }

      if (token) {
        bsv21.data.sym = token.sym;
        bsv21.data.icon = token.icon;
        bsv21.data.contract = token.contract;
        bsv21.data.supply = token.supply;
      }

      if (!tokensOut[bsv21.data.id]) {
        tokensOut[bsv21.data.id] = [];
      }
      tokensOut[bsv21.data.id].push(txo);
      balance[bsv21.data.id] =
        (balance[bsv21.data.id] || 0n) - BigInt(bsv21.data.amt);
    }

    for (const [id, txos] of Object.entries(tokensOut)) {
      const reason = reasons[id];
      for (const txo of txos) {
        txo.data.bsv21.data.status = reason
          ? Bsv21Status.Invalid
          : Bsv21Status.Valid;
        txo.data.bsv21.data.reason = reason;
      }
    }
  }

  async sync(txoStore: TxoStore, ingestQueue: { [txid: string]: Ingest }): Promise<void> {
    const limit = 100;
    for await (const owner of this.owners) {
      let resp = await fetch(
        `https://ordinals.gorillapool.io/api/bsv20/${owner}/balance`,
      );
      const balance = (await resp.json()) as RemoteBsv20[];
      for await (const token of balance) {
        if (!token.id) continue;
        console.log("importing", token.id);
        // try {
        let offset = 0;
        let utxos: RemoteBsv20[] = [];
        do {
          resp = await fetch(
            `https://ordinals.gorillapool.io/api/bsv20/${owner}/id/${token.id}?limit=${limit}&offset=${offset}&includePending=true`,
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
              Bsv21.fromJSON({
                id: token.id,
                amt: u.amt,
                dec: token.dec,
                sym: token.sym,
                op: u.op!,
                status: u.status,
                icon: token.icon,
                fundAddress: deriveFundAddress(new Outpoint(token.id).toBEBinary())
                // contract: token.contract
              }),
              [
                { id: "address", value: owner },
                { id: "id", value: token.id!.toString() },
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
                source: "bsv21",
                idx: Number(t.block.idx),
                outputs: [t.outpoint.vout],
                downloadOnly: this.mode === IndexMode.Trust,
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
