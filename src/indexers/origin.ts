import { P2PKH, Utils } from "@bsv/sdk";
import type { IndexContext } from "../models/index-context";
import {
  Block,
  IndexData,
  Indexer,
  IndexMode,
  Outpoint,
  ParseMode,
  type Event,
} from "../models";
import { OneSatProvider } from "../providers/1sat-provider";
import type { Inscription } from "./insc";
import type { Sigma } from "./remote-types";
import type { Network } from "../spv-store";

export interface Origin {
  outpoint: string;
  nonce?: number;
  insc?: Inscription;
  map?: { [key: string]: any };
  sigma?: Sigma[];
}

export class OriginIndexer extends Indexer {
  tag = "origin";
  name = "Origins";
  oneSat: OneSatProvider;

  constructor(
    public owners = new Set<string>(),
    public indexMode: IndexMode,
    public network: Network = "mainnet",
  ) {
    super(owners, indexMode, network);
    this.oneSat = new OneSatProvider(network);
  }

  async parse(ctx: IndexContext, vout: number, parseMode = ParseMode.Persist): Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    if (txo.satoshis != 1n) return;

    let outSat = 0n;
    for (let i = 0; i < vout; i++) {
      outSat += ctx.txos[i].satoshis;
    }
    let inSat = 0n;
    let origin: Origin | undefined;
    const deps: Outpoint[] = [];
    for (const spend of ctx.spends.values()) {
      deps.push(spend.outpoint);
      if (inSat == outSat && spend.satoshis == 1n) {
        if (spend.data.origin?.data) {
          origin = {
            ...spend.data.origin.data,
          };
          if (origin?.nonce) {
            origin.nonce++;
          }
        } else if (this.indexMode !== IndexMode.Verify) {
          const remote = await this.oneSat.getTxo(spend.outpoint);
          if (remote?.origin?.data?.insc) {
            const file = remote.origin.data.insc.file;
            file.content = (await this.oneSat.getInscriptionFile(new Outpoint(remote.origin.outpoint))) || [];
            origin = {
              outpoint: remote.origin.outpoint,
              insc: { file },
              map: remote.origin.data.map,
              nonce: 0,
            };
            if (
              this.indexMode == IndexMode.TrustAndVerify &&
              [ParseMode.Persist, ParseMode.Deep].includes(parseMode) &&
              !origin.insc?.file?.type.startsWith("application/bsv-20")
            ) {
              const ancestors = await this.oneSat.getOriginAncestors(txo.outpoint);
              let hasAncestor = false;
              for (const [txid, block] of Object.entries(ancestors)) {
                ctx.queue[txid] = block;
                hasAncestor = true;
              }
              if (hasAncestor) {
                ctx.queue[ctx.txid] = ctx.block;
              }
            }
          }
        }
        break;
      } else if (inSat > outSat) {
        break;
      }
      inSat += spend.satoshis;
    }
    if (!origin) {
      origin = {
        outpoint: txo.outpoint.toString(),
        insc: txo.data.insc?.data,
        nonce: 0,
        sigma: txo.data.sigma?.data
      };
    }

    const events: Event[] = [];
    origin.map = {
      ...origin.map || {},
      ...txo.data.map?.data || {},
    };
    if (txo.owner && this.owners.has(txo.owner)) {
      events.push({ id: "outpoint", value: origin.outpoint.toString() });
      if (origin.insc?.file?.type) {
        events.push({ id: "type", value: origin.insc.file.type });
      }
    }
    return new IndexData(origin, events, deps);
  }

  async preSave(ctx: IndexContext): Promise<void> {
    let balance = 0;
    let hasTag = false;
    let icon: string | undefined;
    for (const spend of ctx.spends) {
      if(spend.data[this.tag]) {
        let origin = spend.data[this.tag].data as Origin;
        if (spend.owner && this.owners.has(spend.owner)) {
          hasTag = true;
          balance--;
          if (!icon && origin?.insc?.file?.type.startsWith("image/")) {
            icon = origin?.outpoint;
          }
        }
      }
    }
    for (const txo of ctx.txos) {
      if(txo.data[this.tag]) {
        if (txo.owner && this.owners.has(txo.owner)) {
          hasTag = true;
          balance++;
          let origin = txo.data.origin?.data as Origin;
          if (!icon && origin?.insc?.file?.type.startsWith("image/")) {
            icon = origin?.outpoint;
          }
        }
      }
    }
    if (hasTag) {
      ctx.summary[this.tag] = {
        amount: balance,
        icon,
      };
    }
  }
}
