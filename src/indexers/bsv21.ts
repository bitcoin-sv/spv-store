
import type { IndexContext, IndexSummary } from "../models/index-context";
import { type IndexData } from "../models/index-data";
import { Indexer, IndexMode } from "../models/indexer";
import { Utils } from "@bsv/sdk";
import { Bsv20Status, deriveFundAddress } from "./bsv20";
import { OneSatProvider } from "../providers/1sat-provider";
import type { Network } from "../spv-store";
import { ParseMode } from "../models";

export class Bsv21 {
  status = Bsv20Status.Pending;
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
    const bsv21 = new Bsv21({
      ...obj,
      amt: BigInt(obj.amt),
      dec: parseInt(obj.dec || '0'),
    });
    return bsv21;
  }
}

export class Bsv21Indexer extends Indexer {
  tag = "bsv21";
  name = "Bsv21s";
  tokens: { [id: string]: Bsv21 } = {};

  provider: OneSatProvider;
  constructor(
    public owners = new Set<string>(),
    public indexMode: IndexMode,
    tokens: Bsv21[] = [],
    public network: Network = "mainnet",
  ) {
    super(owners, network);
    tokens.forEach((token) => this.tokens[token.id] = token);
    this.provider = new OneSatProvider(network);
  }

  async parse(ctx: IndexContext, vout: number): Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    if (!txo.data.insc?.data) return;
    if (txo.data.insc?.data.file.type !== "application/bsv-20") return;
    let bsv21: Bsv21;
    try {
      let j: any
      try {
        j = JSON.parse(Utils.toUTF8(txo.data.insc?.data.file.content))
      } catch (e) {
        return
      }
      bsv21 = Bsv21.fromJSON(j);
    } catch (e) {
      return;
    }
    if (bsv21.amt <= 0n || bsv21.amt > 2 ** 64 - 1) return;
    switch (bsv21.op) {
      case "deploy+mint":
        if (bsv21.dec > 18) return;
        bsv21.id = txo.outpoint.toString();
        bsv21.supply = bsv21.amt;
        bsv21.status = Bsv20Status.Valid;
        break;
      case "transfer":
      case "burn":
        if (!bsv21.id) {
          return;
        }
        break;
      default:
        return;
    }

    bsv21.fundAddress = deriveFundAddress(txo.outpoint.toBEBinary());
    const idxData: IndexData = {
      data: bsv21,
      events: [],
    };
    if (txo.owner && this.owners.has(txo.owner)) {
      idxData.events!.push({ id: "address", value: txo.owner });
      idxData.events!.push({ id: "id", value: bsv21.id });
      if (bsv21.contract) {
        idxData.events!.push({ id: "contract", value: bsv21.contract });
      }
    }

    return idxData;
  }

  async summerize(ctx: IndexContext, parseMode: ParseMode): Promise<IndexSummary | undefined> {
    // if (this.indexMode == IndexMode.Trust) return;
    // const balance: { [id: string]: bigint } = {};
    // const tokensIn: { [id: string]: Txo[] } = {};

    let summaryToken: Bsv21 | undefined;
    let summaryBalance = 0;
    for (const spend of ctx.spends) {
      const bsv21 = spend.data.bsv21;
      if (!bsv21) continue;
      let token = this.tokens[bsv21.data.id];
      if (!token) {
        const remote = await this.provider.getBsv2021Txo(bsv21.data.id);
        if (remote) {
          token = new Bsv21({
            op: 'deploy+mint',
            id: bsv21.data.id,
            amt: BigInt(remote.amt),
            dec: remote.dec,
            sym: remote.sym,
            icon: remote.icon,
            status: Bsv20Status.Pending,
            fundAddress: '',
          });
          this.tokens[token.id] = token;
        }
      }
      if (token) {
        bsv21.data.sym = token.sym;
        bsv21.data.icon = token.icon;
        bsv21.data.dec = token.dec;
      }
      if (!summaryToken && token) summaryToken = token;
      if (summaryToken && bsv21.data.id == summaryToken.id && spend.owner && this.owners.has(spend.owner)) {
        summaryBalance -= Number(bsv21.data.amt)
      }
    //   if (bsv21.data.status == Bsv20Status.Pending) {
    //     for (const txo of ctx.txos) {
    //       const outBsv21 = txo.data?.bsv21;
    //       if (outBsv21?.data?.id == bsv21.data.id) {
    //         outBsv21.data.status = Bsv20Status.Pending;
    //         outBsv21.data.sym = bsv21.data.sym;
    //         outBsv21.data.icon = bsv21.data.icon;
    //         outBsv21.data.dec = bsv21.data.dec;
    //       }
    //     }
    //     hasPending = true;
    //   } else if (bsv21.data.status == Bsv20Status.Valid) {
    //     if (!tokensIn[bsv21.data.id]) {
    //       tokensIn[bsv21.data.id] = [];
    //     }
    //     tokensIn[bsv21.data.id].push(spend);
    //     balance[bsv21.data!.id] =
    //       (balance[bsv21.data!.id] || 0n) + bsv21.data.amt;
    //   }
    }
    // const tokensOut: { [id: string]: Txo[] } = {};
    // const reasons: { [id: string]: string } = {};
    for (const txo of ctx.txos) {
      const bsv21 = txo.data?.bsv21;
      if (!bsv21 || !["transfer", "burn"].includes(bsv21.data.op)) continue;
      const token = this.tokens[bsv21.data.id];
      if (!summaryToken) summaryToken = bsv21.data as Bsv21;
      if (summaryToken && bsv21.data.id == summaryToken?.id && txo.owner && this.owners.has(txo.owner)) {
        summaryBalance += Number(bsv21.data.amt)
      }

      if (token) {
        bsv21.data.sym = token.sym;
        bsv21.data.icon = token.icon;
        bsv21.data.contract = token.contract;
        bsv21.data.supply = token.supply;
        bsv21.data.dec = token.dec;
      }

      // if (!tokensOut[bsv21.data.id]) {
      //   tokensOut[bsv21.data.id] = [];
      // }
      // tokensOut[bsv21.data.id].push(txo);
      // balance[bsv21.data.id] =
      //   (balance[bsv21.data.id] || 0n) - BigInt(bsv21.data.amt);
    }

    // if (!hasPending) {
    //   for (const [id, txos] of Object.entries(tokensOut)) {
    //     const reason = reasons[id];
    //     for (const txo of txos) {
    //       txo.data.bsv21.data.status = reason
    //         ? Bsv20Status.Invalid
    //         : Bsv20Status.Valid;
    //       txo.data.bsv21.data.reason = reason;
    //     }
    //   }
    // }
    if (summaryToken?.sym) {
      return {
        id: summaryToken.sym,
        amount: summaryBalance / Math.pow(10, summaryToken.dec || 0),
        icon: summaryToken.icon,
      }
    }
  }

  serialize(bsv21: Bsv21): string {
    return JSON.stringify({
      ...bsv21,
      amt: bsv21.amt.toString(),
    })
  }

  deserialize(str: string): Bsv21 {
    return new Bsv21(JSON.parse(str));
  }
}
