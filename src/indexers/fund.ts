import type { IndexContext } from "../models/index-context";
import { parseAddress } from "../models/address";
import { P2PKH, Utils } from "@bsv/sdk";
import { TxoStore } from "../stores/txo-store";
import {
  Block,
  type Event,
  Indexer,
  IndexData,
  Ingest,
  Txo,
  TxoStatus,
  Outpoint,
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
    }
    return new IndexData(address, [], events);
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
        const ingests = utxos.map(
          (u) =>
            new Ingest(
              u.txid,
              u.height,
              u.idx || 0,
              false,
              true,
              this.syncMode == TxoStatus.TRUSTED,
            ),
        );
        await txoStore.queue(ingests);

        const txos = utxos.map((u) => {
          if (u.satoshis <= 1) return;
          const txo = new Txo(
            new Outpoint(u.outpoint),
            BigInt(u.satoshis),
            new P2PKH().lock(Utils.fromBase58Check(owner).data).toBinary(),
            TxoStatus.TRUSTED,
          );
          txo.owner = owner;
          if (u.height) {
            txo.block = new Block(u.height, BigInt(u.idx || 0));
          }
          txo.data[this.tag] = new IndexData(
            owner,
            [],
            [{ id: "address", value: owner }],
          );
          lastHeight = Math.max(lastHeight, u.height || 0);
          return txo.toObject();
        });
        await txoStore.storage.putMany(txos.filter((t) => t) as Txo[]);
        offset += limit;
      } while (utxos.length == 100);
    }
    return lastHeight;
  }
}
