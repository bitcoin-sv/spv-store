import type { TxnStorage } from "../storage/txn-storage";
import {
  isBroadcastResponse,
  type BroadcastFailure,
  type BroadcastResponse,
  type Transaction,
} from "@bsv/sdk";
import type { Services, Stores } from "../case-mod-spv";
import type { EventEmitter } from "../lib/event-emitter";

export enum TxnStatus {
  REJECTED = -1,
  PENDING = 0,
  BROADCASTED = 1,
  CONFIRMED = 2,
  IMMUTABLE = 3,
}

export class TxnStore {
  constructor(
    public storage: TxnStorage,
    public services: Services,
    public stores: Stores,
    public events?: EventEmitter
  ) {}

  async destroy() {
    await this.storage.destroy();
  }

  async broadcast(
    tx: Transaction
  ): Promise<BroadcastResponse | BroadcastFailure> {
    const resp = await this.services.broadcast.broadcast(tx);
    if (isBroadcastResponse(resp)) {
      this.events?.emit("broadcastSuccess", tx);
    } else {
      this.events?.emit("broadcastFailure", tx);
    }
    return resp;
  }

  async loadTx(
    txid: string,
    fromRemote = false
  ): Promise<Transaction | undefined> {
    let tx = await this.storage.get(txid);
    if (!tx && fromRemote) {
      tx = await this.services.txns.fetch(txid);
    }
    return tx;
  }

  async saveTx(tx: Transaction) {
    if (tx.merklePath) {
      try {
        if (!(await tx.merklePath.verify(tx.id("hex"), this.stores.blocks!))) {
          throw new Error("Invalid proof");
        }
      } catch (e) {
        console.error(e);
      }
    }
    await this.storage.put(tx);
  }

  async ensureTxns(txids: string[]) {
    console.log("Downloading", txids.length, "txs");
    const exists = await this.storage.exists(txids);
    const missing: { [txid: string]: boolean } = {};
    for (const [i, txid] of txids.entries()) {
      if (!exists[i]) missing[txid] = true;
    }
    const missingTxids = Object.keys(missing);
    if (missingTxids.length) {
      const results = await this.services.txns.batchFetch(missingTxids);
      await this.storage.putMany(results);
    }
  }
}
