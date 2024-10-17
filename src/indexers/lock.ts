import type { IndexContext } from "../models/index-context";
import { Indexer } from "../models/indexer";
import { IndexData } from "../models/index-data";
import { Script, Utils } from "@bsv/sdk";
import { lockPrefix, lockSuffix } from "../templates/lock";
import type { Event } from "../models/event";

const PREFIX = Buffer.from(lockPrefix, "hex");
const SUFFIX = Buffer.from(lockSuffix, "hex");

export class Lock {
  constructor(public until = 0) { }
}

export class LockIndexer extends Indexer {
  tag = "lock";
  name = "Locks";
  async parse(
    ctx: IndexContext,
    vout: number
  ): Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    const script = Buffer.from(txo.script);
    const prefixIdx = script.indexOf(PREFIX);
    if (prefixIdx === -1) return;
    const suffixIdx = script.indexOf(SUFFIX, prefixIdx + PREFIX.length);
    if (suffixIdx === -1) return;
    const dataScript = Script.fromBinary(
      Array.from(script.subarray(prefixIdx + PREFIX.length, suffixIdx)),
    );
    if (dataScript.chunks[0]?.data?.length != 20 || !dataScript.chunks[1]?.data)
      return;
    const until = parseInt(
      Buffer.from(dataScript.chunks[1]!.data!).reverse().toString("hex"),
      16,
    );

    txo.owner = Utils.toBase58Check(dataScript.chunks[0].data!, this.network == 'mainnet' ? [0] : [111]);
    const events: Event[] = [];
    if (txo.owner && this.owners.has(txo.owner)) {
      events.push({ id: "until", value: until.toString().padStart(7, "0") });
      events.push({ id: "address", value: txo.owner });
    }
    return new IndexData(new Lock(until), events);
  }

  async preSave(ctx: IndexContext): Promise<void> {
    const locksIn = ctx.spends.reduce((acc, spends) => {
      if (!spends.data[this.tag]) return acc;
      return acc + spends.satoshis;
    }, 0n)
    const locksOut = ctx.txos.reduce((acc, txo) => {
      if (!txo.data[this.tag]) return acc;
      return acc + txo.satoshis;
    }, 0n);
    const balance = locksIn - locksOut;
    if (balance != 0n) {
      ctx.summary[this.tag] = {
        amount: balance,
      };
    }
  }
}
