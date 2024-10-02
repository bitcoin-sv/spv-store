import { P2PKH, Utils } from "@bsv/sdk";
import type { IndexContext, IndexQueue } from "../models/index-context";
import {
  Block,
  IndexData,
  Indexer,
  IndexMode,
  Outpoint,
  ParseMode,
  Txo,
  TxoStatus,
  type Event,
  type Ingest,
} from "../models";
import { OneSatProvider } from "../providers/1sat-provider";
import type { Inscription } from "./insc";
import type { Ordinal } from "./remote-types";
import { Listing } from "./ordlock";
import type { TxoStore } from "../stores";
import type { Network } from "../spv-store";

export interface Origin {
  outpoint: string;
  nonce?: number;
  insc?: Inscription;
  map?: { [key: string]: any };
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
            origin = {
              outpoint: remote.origin.outpoint,
              insc: { file: remote.origin.data.insc.file },
              map: remote.origin.data.map,
              nonce: 0,
            };
            if (
              this.indexMode == IndexMode.TrustAndVerify &&
              parseMode == ParseMode.Persist &&
              !origin.insc?.file?.type.startsWith("application/bsv-20")
            ) {
              const ancestors = await this.oneSat.getOriginAncestors([txo.outpoint]);
              for (const [txid, block] of Object.entries(ancestors)) {
                ctx.queue[txid] = block;
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

  async sync(txoStore: TxoStore, ingestQueue: { [txid: string]: Ingest }): Promise<void> {
    const limit = 100;
    for await (const owner of this.owners) {
      let offset = 0;
      let utxos: Ordinal[] = [];
      offset = 0;

      do {
        const url = `https://ordinals.gorillapool.io/api/txos/address/${owner}/unspent?limit=${limit}&offset=${offset}&bsv20=false`;
        const resp = await fetch(url);
        utxos = ((await resp.json()) as Ordinal[]) || [];
        const txos: Txo[] = [];
        for (const u of utxos) {
          if (!u.origin?.data?.insc || u.origin?.data?.bsv20) continue;
          const txo = new Txo(
            new Outpoint(u.outpoint),
            1n,
            new P2PKH().lock(Utils.fromBase58Check(owner).data).toBinary(),
            TxoStatus.Trusted,
          );
          txos.push(txo);
          if (this.indexMode == IndexMode.Verify) continue;
          txo.owner = owner;
          if (u.height) {
            txo.block = new Block(u.height, BigInt(u.idx || 0));
          }
          const origin: Origin = {
            outpoint: u.origin.outpoint,
            insc: { file: u.origin.data.insc.file },
            map: u.origin.data.map,
          };
          txo.data[this.tag] = new IndexData(origin, [
            { id: "outpoint", value: origin.outpoint.toString() },
          ]);

          if (u.data?.insc) {
            txo.data.insc = new IndexData(u.data.insc);
          }
          if (u.data?.map) {
            txo.data.map = new IndexData(u.data.map);
          }

          if (u.data?.list) {
            const price = BigInt(u.data.list.price);
            txo.data.list = new IndexData(
              new Listing(Utils.toArray(u.data.list.payout, "base64"), price),
              [{ id: "price", value: price.toString(16).padStart(16, "0") }],
            );
          }
        }

        if (this.indexMode !== IndexMode.Verify) {
          await txoStore.storage.putMany(txos);
        }

        if (this.indexMode !== IndexMode.Trust) {
          for (const t of txos) {
            let ingest = ingestQueue[t.outpoint.txid];
            if (!ingest) {
              ingest = {
                txid: t.outpoint.txid,
                height: t.block.height,
                source: "origin",
                idx: Number(t.block.idx),
                parseMode: ParseMode.Persist,
                outputs: [t.outpoint.vout],
              };
              ingestQueue[t.outpoint.txid] = ingest;
            } else {
              ingest.outputs!.push(t.outpoint.vout);
              ingest.parseMode = ParseMode.Persist;
            }
          }
        }
        if (this.indexMode == IndexMode.Verify) {
          const ancestors = await this.oneSat.getOriginAncestors(
            txos.map((t) => t.outpoint),
          );
          for (const [txid, block] of Object.entries(ancestors)) {
            if (ingestQueue[txid]) continue
            ingestQueue[txid] = {
              txid,
              height: block.height,
              source: "ancestor",
              idx: Number(block.idx),
              parseMode: ParseMode.Dependency,
            };
          }
        }
        offset += limit;
      } while (utxos.length == limit);
    }
  }
}
