import { Hash, HD, Utils } from "@bsv/sdk";
import type { IndexContext } from "../models/index-context";
import { IndexData } from "../models/index-data";
import { Indexer, IndexMode } from "../models/indexer";
import { OneSatProvider } from "../providers/1sat-provider";
import type { Network } from "../spv-store";
import type { RemoteBsv20 } from "./remote-types";

export const FEE_XPUB = 'xpub661MyMwAqRbcF221R74MPqdipLsgUevAAX4hZP2rywyEeShpbe3v2r9ciAvSGT6FB22TEmFLdUyeEDJL4ekG8s9H5WXbzDQPr6eW1zEYYy9'
const hdKey = HD.fromString(FEE_XPUB);

export enum Bsv20Status {
  Invalid = -1,
  Pending = 0,
  Valid = 1,
}

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
  name = "Bsv20s";

  provider: OneSatProvider;
  constructor(
    public owners = new Set<string>(),
    public indexMode: IndexMode,
    public network: Network = "mainnet",
  ) {
    if (indexMode !== IndexMode.Trust) {
      throw new Error("Bsv20 requires Trust mode");
    }
    super(owners, indexMode, network);
    this.provider = new OneSatProvider(network);
  }


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
      bsv20.fundAddress = deriveFundAddress(bsv20.tick)
      if (txo.owner && this.owners.has(txo.owner)) {
        data.events.push({ id: "tick", value: bsv20.tick });
      }
      return data;
    } catch (e) {
      return;
    }
  }

  async preSave(ctx: IndexContext) {
    const tokens = new Map<string, RemoteBsv20>();
    for (const spend of ctx.spends) {
      const bsv20 = spend.data.bsv20;
      if (!bsv20) continue;
      if (bsv20.data.status == 0 && this.indexMode !== IndexMode.Verify) {
        const remote = await this.provider.getBsv2021Txo(spend.outpoint);
        if (remote) {
          tokens.set(bsv20.data.tick, remote);
          bsv20.data.status = remote.status;
          bsv20.data.dec = remote.dec;
        }
      }
    }
    for (const txo of ctx.txos) {
      const bsv20 = txo.data.bsv20;
      if (bsv20?.data?.tick && tokens.has(bsv20.data.tick)) {
        bsv20.data.dec = tokens.get(bsv20.data.tick)!.dec;
      }
    }
  }
}

export function deriveFundAddress(idOrTick: string | number[]): string {
  const hash = Hash.sha256(idOrTick);
  const reader = new Utils.Reader(hash);
  let path = `m/21/${reader.readUInt32BE() >> 1}`;
  reader.pos = 24;
  path += `/${reader.readUInt32BE() >> 1}`;
  return hdKey.derive(path).pubKey.toAddress();
}