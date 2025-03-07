import type { IndexContext, IndexSummary } from "../models/index-context";
import {
  Indexer,
  Outpoint,
  parseAddress,
  ParseMode,
  UnmetDependency,
  type Event,
  type IndexData,
  type Ingest,
} from "../models";
import { OneSatProvider } from "../providers/1sat-provider";
import { InscriptionIndexer, type Inscription } from "./insc";
import type { Sigma } from "./remote-types";
import type { Network } from "../spv-store";
import type { TxoStore } from "../stores";

const TRIGGER = 783968;
export interface Origin {
  outpoint?: string;
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
    public network: Network = "mainnet",
    public syncHistory = false,
  ) {
    super(owners, network);
    this.oneSat = new OneSatProvider(network);
  }

  async parse(ctx: IndexContext, vout: number, parseMode = ParseMode.Persist): Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    if (txo.satoshis != 1n || ctx.block.height < TRIGGER || txo.data.insc?.data?.file?.type == "application/bsv-20") return;
    if (!txo.owner) {
      txo.owner = parseAddress(ctx.tx.outputs[vout].lockingScript, 0, this.network);;
    }
    let outSat = 0n;
    for (let i = 0; i < vout; i++) {
      outSat += ctx.txos[i].satoshis;
    }
    let satsIn = 0n;
    let origin: Origin = {
      outpoint: "",
      insc: txo.data.insc?.data,
      nonce: 0,
      sigma: txo.data.sigma?.data
    };
    const deps: Outpoint[] = [];
    // let spendOutpoint: Outpoint | undefined;
    for (let [vin, spend] of ctx.spends.entries()) {
      deps.push(spend.outpoint);
      if (!spend.isPopulated()) {
        const txo = await ctx.store.storage.get(spend.outpoint);
        if (txo && txo.isPopulated()) {
          spend = txo;
        } else if ([ParseMode.Persist, ParseMode.PersistSummary].includes(parseMode) && satsIn == outSat) {
          console.log("Resolving dependency", ctx.txid, parseMode, spend.outpoint.toString());
          throw new UnmetDependency(spend.outpoint, ParseMode.Persist);
        } else {
          spend = ctx.spends[vin] = await ctx.store.resolveOutput(spend.outpoint, ParseMode.OutputsOnly)
        }
      }

      if (satsIn == outSat && spend.satoshis == 1n && spend.block.height >= TRIGGER) {
        if (spend.data.origin?.data) {
          origin = {
            ...spend.data.origin.data,
          };
          if (origin?.nonce) {
            origin.nonce++;
          }
        }
        break;
      }
      satsIn += spend.satoshis;
      if (satsIn > outSat) {
        origin.outpoint = txo.outpoint.toString();
        break;
      }
    }
    const events: Event[] = [];
    origin.map = {
      ...origin.map || {},
      ...txo.data.map?.data || {},
    };
    if (txo.owner && this.owners.has(txo.owner)) {
      events.push({ id: "outpoint", value: origin.outpoint?.toString() || "" });
      if (origin.insc?.file?.type) {
        events.push({ id: "type", value: origin.insc.file.type });
      }
    }
    const file = origin.insc?.file;
    if (file && file.size && file.size > 4096) {
      file.content = [];
    }
    return {
      data: origin,
      events,
      deps,
    };
  }

  async summerize(ctx: IndexContext): Promise<IndexSummary | undefined> {
    let balance = 0;
    let hasTag = false;
    let icon: string | undefined;
    let id = "";
    for (const spend of ctx.spends) {
      if (spend.data[this.tag]) {
        let origin = spend.data[this.tag].data as Origin;
        if (spend.owner && this.owners.has(spend.owner)) {
          hasTag = true;
          balance--;
          if (!icon && origin?.insc?.file?.type.startsWith("image/")) {
            icon = origin?.outpoint;
            id = origin.map?.name || "";
          }
        }
      }
    }
    for (const txo of ctx.txos) {
      if (txo.data[this.tag]) {
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
      return {
        id,
        amount: balance,
        icon,
      };
    }
  }

  async sync(txoStore: TxoStore, ingestQueue: { [txid: string]: Ingest }, parseMode = ParseMode.Persist): Promise<number> {
    const oneSat = new OneSatProvider(this.network, txoStore.services.account?.accountId || '');
    let maxScore = 0;
    for (const address of txoStore.owners) {
      const utxos = await oneSat.txosByAddress(address, !this.syncHistory);
      console.log("Syncing", utxos.length, "utxos for ", [...txoStore.owners]);
      for (const u of utxos) {
        if (u.satoshis != 1 || u.data.insc?.file.type.startsWith("application/bsv-20")) continue;
        const outpoint = new Outpoint(u.outpoint);
        let ingest = ingestQueue[outpoint.txid];
        if (!ingest) {
          ingest = {
            txid: outpoint.txid,
            height: u.height || Date.now(),
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

  serialize(origin: Origin): string {
    return JSON.stringify({
      outpoint: origin.outpoint,
      nonce: origin.nonce,
      insc: origin.insc && InscriptionIndexer.serialize(origin.insc),
      map: origin.map,
      sigma: origin.sigma,
    });
  }

  deserialize(data: string): Origin {
    const origin = JSON.parse(data);
    origin.insc = origin.insc && InscriptionIndexer.deserialize(origin.insc);
    return origin;
  }
}
