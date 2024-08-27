import { P2PKH, Utils } from "@bsv/sdk";
import type { IndexContext, IndexQueue } from "../models/index-context";
import { TxoStore } from "../stores/txo-store";
import {
  Block,
  IndexData,
  Indexer,
  IndexMode,
  Outpoint,
  Txo,
  TxoStatus,
  type Event,
  type Ingest,
} from "../models";
import { OneSatProvider } from "../providers/1sat-provider";
import type { Inscription } from "./insc";
import type { Ordinal } from "./remote-types";
import { Listing } from "./ordlock";
import type { TxLog } from "../services";

export interface Origin {
  outpoint : string;
  nonce ?: number;
  insc ?: Inscription;
}

export class OriginIndexer extends Indexer {
  tag = "origin";

  async parse(ctx : IndexContext, vout : number, previewOnly = false) : Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    if (txo.satoshis != 1n) return;

    let outSat = 0n;
    for (let i = 0; i < vout; i++) {
      outSat += ctx.txos[i].satoshis;
    }
    let inSat = 0n;
    let origin : Origin | undefined;
    const deps : Outpoint[] = [];
    for (const spend of ctx.spends) {
      if (inSat == outSat && spend.satoshis == 1n) {
        if (spend.data.origin?.data) {
          origin = {
            ...spend.data.origin.data,
          };
          if (origin?.nonce) {
            origin.nonce++;
          }
          deps.push(spend.outpoint);
        } else if (this.mode !== IndexMode.Verify) {
          const provider = new OneSatProvider(this.network);
          const remote = await provider.getTxo(spend.outpoint);
          if (remote?.origin?.data?.insc) {
            origin = {
              outpoint: remote.origin.outpoint,
              insc: { file: remote.origin.data.insc.file },
              nonce: 0,
            };
            if (!previewOnly && this.mode == IndexMode.TrustAndVerify) {
              const ancestors = await this.fetchAncestors(txo.owner || "", [
                txo.outpoint,
              ]);
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

    const events : Event[] = [];
    if (origin && txo.owner && this.owners.has(txo.owner)) {
      events.push({ id: "outpoint", value: origin.outpoint.toString() });
    }
    return new IndexData(origin, events, deps);
  }

  async sync(txoStore : TxoStore) : Promise<number> {
    const limit = 100;
    let lastHeight = 0;
    for await (const owner of this.owners) {
      let offset = 0;
      let utxos : Ordinal[] = [];
      offset = 0;

      do {
        const url = `https://ordinals.gorillapool.io/api/txos/address/${owner}/unspent?limit=${limit}&offset=${offset}&bsv20=false`;
        const resp = await fetch(url);
        utxos = ((await resp.json()) as Ordinal[]) || [];
        const txos : Txo[] = [];
        for (const u of utxos) {
          if (!u.origin?.data?.insc || u.origin?.data?.bsv20) continue;
          const txo = new Txo(
            new Outpoint(u.outpoint),
            1n,
            new P2PKH().lock(Utils.fromBase58Check(owner).data).toBinary(),
            TxoStatus.Trusted,
          );
          txos.push(txo);
          if (this.mode == IndexMode.Verify) continue;
          txo.owner = owner;
          if (u.height) {
            txo.block = new Block(u.height, BigInt(u.idx || 0));
          }
          const origin : Origin = {
            outpoint: u.origin.outpoint,
            insc: { file: u.origin.data.insc.file },
          };
          txo.data[this.tag] = new IndexData(origin, [
            { id: "outpoint", value: origin.outpoint.toString() },
          ]);

          if (u.data?.insc) {
            txo.data.insc = new IndexData(u.data.insc);
          }

          if (u.data?.list) {
            const price = BigInt(u.data.list.price);
            txo.data.list = new IndexData(
              new Listing(Utils.toArray(u.data.list.payout, "base64"), price),
              [{ id: "price", value: price.toString(16).padStart(16, "0") }],
            );
          }
          lastHeight = Math.max(lastHeight, u.height || 0);
        }
        if (this.mode !== IndexMode.Verify) {
          await txoStore.storage.putMany(txos);
        }

        if (this.mode !== IndexMode.Trust) {
          const ancestors = await this.fetchAncestors(
            owner,
            txos.map((t) => t.outpoint),
          );
          await txoStore.queue(
            [...Object.entries(ancestors)].map(([txid, block]) => ({
              txid,
              height: block.height,
              source: "https://ordinals.gorillapool.io",
              idx: Number(block.idx),
              isDepOnly: true,
            }))
          );
          await txoStore.queue(txos.map((t) => ({
            txid: t.outpoint.txid,
            height: t.block.height,
            source: "https://ordinals.gorillapool.io",
            idx: Number(t.block.idx),
            checkSpends: true,
            downloadOnly: this.mode === IndexMode.Trust,
          })));
        }
        await txoStore.storage.putInvs(txos.map((t) => ({
          owner,
          txid: t.outpoint.txid,
          height: t.block.height,
          idx: Number(t.block.idx),
        })))
        offset += limit;
      } while (utxos.length == limit);
    }
    return lastHeight;
  }

  async fetchAncestors(owner : string, outpoints : Outpoint[]) : Promise<IndexQueue> {
    const resp = await fetch(
      `https://ordinals.gorillapool.io/api/inscriptions/ancestors`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(outpoints),
      },
    );
    const ancestors = (await resp.json()) as {
      txid : string;
      idx : string;
      height ?: number;
    }[];

    return ancestors.reduce((queue, u) => {
      queue[u.txid] =new Block(u.height || Date.now(), BigInt(u.idx || 0));
      return queue;
    }, {} as IndexQueue);
  }
}