import type { IndexContext, IndexSummary } from "../models/index-context";
import { Indexer } from "../models/indexer";
import { type IndexData } from "../models/index-data";
import { Script, Utils } from "@bsv/sdk";
import { lockPrefix, lockSuffix } from "../templates/lock";
import type { Event } from "../models/event";
import type { TxoStore } from "../stores";
import { Outpoint, ParseMode, type Ingest } from "../models";
import { OneSatProvider } from "../providers";
import type { Network } from "../spv-store";

const PREFIX = Uint8Array.from(Buffer.from(lockPrefix, "hex"));
const SUFFIX = Uint8Array.from(Buffer.from(Utils.toArray(lockSuffix, "hex")));

export class Lock {
  constructor(public until = 0) { }
}

export class LockIndexer extends Indexer {
  tag = "lock";
  name = "Locks";

  constructor(
    public owners = new Set<string>(),
    public network: Network = "mainnet",
    public syncHistory = false,
  ) {
    super(owners, network);
  }
  
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
      events.push({ id: "owner", value: txo.owner });
    }
    return {
      data: new Lock(until),
      events,
    }
  }

  async summerize(ctx: IndexContext): Promise<IndexSummary | undefined> {
    let locksOut = 0n;
    for (const spend of ctx.spends) {
      if (!spend.script.length) return
      if (spend.data[this.tag]) {
        locksOut += (spend.owner && this.owners.has(spend.owner) ?
          spend.satoshis :
          0n);
      }
    }
    let locksIn = 0n;
    for (const txo of ctx.txos) {
      if (txo.data[this.tag]) {
        locksIn += (txo.owner && this.owners.has(txo.owner) ?
          txo.satoshis :
          0n);
      }
    }
    const balance = Number(locksIn - locksOut);
    if (balance) {
      return {
        amount: balance,
      };
    }
  }

  async sync(txoStore: TxoStore, ingestQueue: { [txid: string]: Ingest }, parseMode = ParseMode.PersistSummary): Promise<number> {
    const oneSat = new OneSatProvider(this.network, txoStore.services.account?.accountId || '');
    let maxScore = 0;
    for (const address of txoStore.owners) {
      const utxos = await oneSat.search({
        tag: 'lock',
        id: 'owner',
        value: address,
        limit: 0,
        unspent: !this.syncHistory,
      });
      console.log("Syncing", utxos.length, "locks for ", [...txoStore.owners]);
      for (const u of utxos) {
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
          maxScore = Math.max(maxScore, u.height * 1000000000 + u.idx);
        }
      }
    }
    return maxScore;
  }
}
