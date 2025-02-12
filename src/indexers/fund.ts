import type { IndexContext } from "../models/index-context";
import { parseAddress } from "../models/address";
import {
  type Event,
  Indexer,
  IndexData,
} from "../models";

export class FundIndexer extends Indexer {
  tag = "fund";
  name = "Funds";

  async parse(ctx: IndexContext, vout: number): Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    const script = ctx.tx.outputs[vout].lockingScript;
    const address = parseAddress(script, 0, this.network);
    if (txo.satoshis < 2n) return;
    const events: Event[] = [];
    txo.owner = address;
    if (address && this.owners.has(address)) {
      events.push({ id: "address", value: address });
      return new IndexData(txo.owner, events);
    }
  }

  async preSave(ctx: IndexContext): Promise<void> {
    let satsOut = ctx.spends.reduce((acc, spends) => {
      if (!spends.data[this.tag]) return acc;
      return acc + (spends.owner && this.owners.has(spends.owner) ?
        spends.satoshis :
        0n);
    }, 0n);
    let satsIn = ctx.txos.reduce((acc, txo) => {
      if (!txo.data[this.tag]) return acc;
      return acc + (txo.owner && this.owners.has(txo.owner) ?
        txo.satoshis :
        0n);
    }, 0n);
    const balance = Number(satsIn - satsOut);
    if (balance) {
      ctx.summary[this.tag] = {
        amount: balance,
      };
    }
  }
}
