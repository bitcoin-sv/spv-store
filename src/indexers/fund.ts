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
} from "../models";
import type { Ordinal } from "./remote-types";

export class FundIndexer extends Indexer {
  tag = "fund";

  parse(ctx: IndexContext, vout: number): IndexData | undefined {
    const txo = ctx.txos[vout];
    const script = ctx.tx.outputs[vout].lockingScript;
    const address = parseAddress(script, 0);
    if (txo.satoshis < 2n) return;
    const events: Event[] = [];
    if (address && this.owners.has(address)) {
      txo.owner = address;
      events.push({ id: "address", value: address });
      return new IndexData(address, [], events);
    }
    return undefined;
  }

  async sync(txoStore: TxoStore): Promise<number> {
    const limit = 10000;
    let lastHeight = 0;
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
          if (u.satoshis <= 1) continue;
          const txo = new Txo(
            new Outpoint(u.outpoint),
            BigInt(u.satoshis),
            new P2PKH().lock(Utils.fromBase58Check(owner).data).toBinary(),
            TxoStatus.TRUSTED,
          );
          txo.owner = owner;
          if (u.height) {
            txo.block = { height: u.height, idx: BigInt(u.idx || 0) };
          }
          txo.data[this.tag] = new IndexData(
            owner,
            [],
            [{ id: "address", value: owner }],
          );
          lastHeight = Math.max(lastHeight, u.height || 0);
          txos.push(txo);
        }
        await txoStore.storage.putMany(txos);
        await txoStore.queue(
          txos.map(
            (t) =>
              ({
                txid: t.outpoint.txid,
                height: t.block.height,
                idx: Number(t.block.idx),
                checkSpends: true,
                downloadOnly: this.syncMode === TxoStatus.TRUSTED,
              }) as Ingest,
          ),
        );
        offset += limit;
      } while (utxos.length == 100);
    }
    return lastHeight;
  }
}
