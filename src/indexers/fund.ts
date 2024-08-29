import type { IndexContext } from "../models/index-context";
import { parseAddress } from "../models/address";
import { P2PKH, Utils } from "@bsv/sdk";
import { TxoStore } from "../stores/txo-store";
import {
  type Event,
  Indexer,
  IndexData,
  Txo,
  TxoStatus,
  Outpoint,
  type Ingest,
  IndexMode,
} from "../models";
import type { Ordinal } from "./remote-types";
import { TxLog } from "../services";
import type { CaseModSPV } from "../casemod-spv";

export class FundIndexer extends Indexer {
  tag = "fund";

  async parse(ctx: IndexContext, vout: number): Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    const script = ctx.tx.outputs[vout].lockingScript;
    txo.owner = parseAddress(script, 0);
    if (txo.satoshis < 2n) return;
    const events: Event[] = [];
    if (txo.owner && this.owners.has(txo.owner)) {
      events.push({ id: "address", value: txo.owner });
    }
    return new IndexData(txo.owner, events);
  }

  async preSave(ctx: IndexContext): Promise<void> {
    let satsIn = ctx.spends.reduce((acc, spends) => {
      if (!spends.data[this.tag]) return acc;
      return acc + (spends.owner && this.owners.has(spends.owner) ?
        spends.satoshis :
        0n);
    }, 0n);
    let satsOut = ctx.txos.reduce((acc, txo) => {
      if (!txo.data[this.tag]) return acc;
      return acc + (txo.owner && this.owners.has(txo.owner) ?
        txo.satoshis :
        0n);
    }, 0n);
    const balance = satsIn - satsOut;
    if (balance != 0n) {
      ctx.summary[this.tag] = {
        amount: balance,
      };
    }
  }

  async sync(casemod: CaseModSPV) {
    const limit = 10000;
    const tip = await casemod.getSyncedBlock();
    for await (const owner of this.owners) {
      let offset = 0;
      let utxos: Ordinal[] = [];
      do {
        const resp = await fetch(
          `https://ordinals.gorillapool.io/api/txos/address/${owner}/unspent?limit=${limit}&offset=${offset}`,
        );
        utxos = ((await resp.json()) as Ordinal[]) || [];
        const txos: Txo[] = [];
        for (const u of utxos) {
          if (u.satoshis < 2) continue;
          const txo = new Txo(
            new Outpoint(u.outpoint),
            BigInt(u.satoshis),
            new P2PKH().lock(Utils.fromBase58Check(owner).data).toBinary(),
            TxoStatus.Trusted,
          );
          txos.push(txo);
          if (this.mode === IndexMode.Verify) continue;
          txo.owner = owner;
          if (u.height) {
            txo.block = { height: u.height, idx: BigInt(u.idx || 0) };
          }
          txo.data[this.tag] = new IndexData(owner, [
            { id: "address", value: owner },
          ]);
        }
        if (this.mode !== IndexMode.Verify) {
          await casemod.stores.txos!.storage.putMany(txos);
        }
        if (this.mode != IndexMode.Trust) {
          await casemod.stores.txos!.queue(txos.map((t) => ({
            txid: t.outpoint.txid,
            height: t.block.height,
            source: "https://ordinals.gorillapool.io",
            idx: Number(t.block.idx),
            checkSpends: true,
            downloadOnly: this.mode === IndexMode.Trust,
          }) as Ingest));
        }
        await casemod.stores.txos!.storage.putInvs([
          ...txos.map((t) => ({
            txid: t.outpoint.txid,
            height: t.block.height,
            idx: Number(t.block.idx),
            owner,
            source: "https://ordinals.gorillapool.io",
          })),
          {
            txid: "",
            height: tip!.height,
            idx: 0,
            owner,
            source: "https://ordinals.gorillapool.io",
          },
        ]);
        offset += limit;
      } while (utxos.length == 100);

    }
  }
}
