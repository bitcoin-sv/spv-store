import type { IndexContext } from "../models/index-context";
import {
  Block,
  IndexData,
  Indexer,
  IndexMode,
  Outpoint,
  parseAddress,
  ParseMode,
  TxoLookup,
  TxoSort,
  type BlockHeader,
  type Event,
  type Ingest,
} from "../models";
import { OneSatProvider } from "../providers/1sat-provider";
import type { Inscription } from "./insc";
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
    public indexMode: IndexMode,
    public network: Network = "mainnet",
  ) {
    super(owners, indexMode, network);
    this.oneSat = new OneSatProvider(network);
  }

  async parse(ctx: IndexContext, vout: number, parseMode = ParseMode.Persist): Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    if (txo.satoshis != 1n || ctx.block.height < TRIGGER || txo.data.insc?.data?.file?.type == "application/bsv-20") return;
    if(!txo.owner) {
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
    let spendOutpoint: Outpoint | undefined;
    for (const spend of ctx.spends.values()) {
      deps.push(spend.outpoint);
      if (satsIn == outSat && spend.satoshis == 1n && spend.block.height >= TRIGGER) {
        spendOutpoint = spend.outpoint;
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
    return new IndexData(origin, events, deps);
  }

  async preSave(ctx: IndexContext): Promise<void> {
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
      ctx.summary[this.tag] = {
        id,
        amount: balance,
        icon,
      };
    }
  }

  async resolve(txoStore: TxoStore, block: BlockHeader): Promise<void> {
    if (this.indexMode === IndexMode.Verify) return;
    const results = await txoStore.search(new TxoLookup(this.tag, 'outpoint', ':', undefined, true), TxoSort.ASC, 1000)

    const ingestQueue: {[txid: string]:Ingest} = {};
    const originOutpoints = new Set<string>();
    for (const txo of results.txos) {
      const originData = txo.data.origin;
      originData.events = originData?.events.filter(e => e.id != "outpoint");
      const origin = originData?.data as Origin;
      if (!origin?.outpoint) {
        const remote = await this.oneSat.getTxo(txo.outpoint);
        if (remote?.data?.origin?.outpoint) {
          origin.outpoint = remote?.data?.origin?.outpoint;
          if (this.indexMode == IndexMode.Trust) {
            const file = await this.oneSat.getInscriptionFile(origin.outpoint);
            origin.insc = {file};
            origin.map = remote.data.origin.map;
            origin.nonce = (remote.data.origin.nonce || 0) + 1;
            originData.events.push({ id: "outpoint", value: origin.outpoint });
            await txoStore.storage.put(txo)
          } else if (this.indexMode == IndexMode.TrustAndVerify) {
            let ingest = ingestQueue[txo.outpoint.txid];
            originOutpoints.add(origin.outpoint);
            if (!ingest) {
              ingest = {
                txid: txo.outpoint.txid,
                height: txo.block.height,
                idx: Number(txo.block.idx),
                parseMode: ParseMode.Persist,
                outputs: [txo.outpoint.vout],
                source: "origin",
                reprocess: true,
              };
              ingestQueue[txo.outpoint.txid] = ingest;
            } else {
              ingest.outputs!.push(txo.outpoint.vout);
            }
          }
        }
      }
    }
    if (this.indexMode == IndexMode.TrustAndVerify) {
      const ancestors = await this.oneSat.getOriginAncestors([...originOutpoints]);
      for (const ancestor of ancestors) {
        const [txid, vout] = ancestor.outpoint.split("_");
        let ingest = ingestQueue[txid];
        if (!ingest) {
          ingest = {
            txid: txid,
            height: ancestor.height,
            idx: Number(ancestor.idx),
            parseMode: ParseMode.Persist,
            outputs: [parseInt(vout)],
            source: 'ancestor',
            reprocess: true,
          }
          ingestQueue[txid] = ingest;
        } else {
          ingest.outputs!.push(parseInt(vout));
        }
      }
      const ingests = Object.values(ingestQueue);
      if (ingests.length > 0) {
        await txoStore.queue(ingests);
      }
    }
  }
}
