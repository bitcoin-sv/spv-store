import type { TxnStorage } from "../storage/txn-storage";
import {
  isBroadcastResponse,
  MerklePath,
  Transaction,
  type BroadcastFailure,
  type BroadcastResponse,
} from "@bsv/sdk";
import type { Services, Stores } from "../casemod-spv";
import type { EventEmitter } from "../lib/event-emitter";
import { Block } from "../models";

export interface Txn {
  txid: string;
  rawtx: number[];
  proof?: number[];
  block: Block;
  status: TxnStatus;
}

export enum TxnStatus {
  REJECTED = -1,
  PENDING = 0,
  BROADCASTED = 1,
  CONFIRMED = 2,
  IMMUTABLE = 3,
}

export class TxnStore {
  private syncRunning: Promise<void> | undefined;
  private stopSync = false;

  constructor(
    public storage: TxnStorage,
    public services: Services,
    public stores: Stores,
    public events?: EventEmitter,
  ) { }

  async destroy() {
    this.stopSync = true;
    if (this.syncRunning) await this.syncRunning;
    await this.storage.destroy();
  }

  async broadcast(
    tx: Transaction,
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
    fromRemote = false,
  ): Promise<Transaction | undefined> {
    let txn = await this.storage.get(txid);
    let saveTx = false;
    if (!txn && fromRemote) {
      txn = await this.services.txns.fetchTxn(txid);
      saveTx = !!txn;
    }
    if (!txn) return;
    const tx = Transaction.fromBinary(txn.rawtx);
    if (txn.proof) {
      tx.merklePath = MerklePath.fromBinary(txn.proof);
    }
    if (saveTx) {
      await this.saveTx(tx);
    }
    return tx;
  }

  async saveTx(tx: Transaction) {
    const txn: Txn = {
      txid: tx.id("hex"),
      rawtx: tx.toBinary(),
      block: new Block(),
      status: TxnStatus.BROADCASTED,
    };
    if (await tx.merklePath?.verify(txn.txid, this.stores.blocks!)) {
      txn.proof = tx.merklePath!.toBinary();
      txn.block.height = tx.merklePath!.blockHeight;
      txn.block.idx = BigInt(
        tx.merklePath!.path[0].find((p) => p.hash == txn.txid)?.offset!
      );
      txn.status = TxnStatus.CONFIRMED;
    }
    await this.storage.put(txn);
  }

  async processQueue() {
    if (this.syncRunning) return;
    this.syncRunning = Promise.all([
      this.processMempool(),
      this.processConfirmed(),
    ]).then(() => { });
  }

  async processMempool(): Promise<void> {
    try {
      const txns = await this.storage.getByStatus(TxnStatus.BROADCASTED, Date.now() - 600000, 25);
      if (txns.length) {
        for (const txn of txns) {
          const proof = await this.services.txns.fetchProof(txn.txid);
          if (!proof) {
            txn.block.height = Date.now();
            continue
          }
          const merklePath = MerklePath.fromBinary(proof);
          if (await merklePath.verify(txn.txid, this.stores.blocks!)) {
            txn.block.height = merklePath.blockHeight;
            txn.block.idx = BigInt(
              merklePath.path[0].find((p) => p.hash == txn.txid)?.offset || 0,
            );
            txn.proof = merklePath.toBinary();
            txn.status = TxnStatus.CONFIRMED;
          } else {
            txn.block.height = Date.now();
          }
        }
        await this.storage.putMany(txns);
      } else {
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (e) {
      console.error("Failed to ingest txs", e);
      await new Promise((r) => setTimeout(r, 1000));
    }
    if (this.stopSync) {
      return;
    }
    return this.processMempool();
  }

  async processConfirmed(): Promise<void> {
    try {
      const chaintip = await this.stores.blocks!.getChaintip();
      const txns = await this.storage.getByStatus(TxnStatus.CONFIRMED, chaintip!.height - 5, 25);
      if (txns.length) {
        for (const txn of txns) {
          let merklePath = MerklePath.fromBinary(txn.proof!);
          if (await merklePath.verify(txn.txid, this.stores.blocks!)) {
            txn.status = TxnStatus.IMMUTABLE;
            continue
          }
          const proof = await this.services.txns.fetchProof(txn.txid);
          if (proof) {
            merklePath = MerklePath.fromBinary(proof);
            if (await merklePath.verify(txn.txid, this.stores.blocks!)) {
              txn.block.height = merklePath!.blockHeight;
              txn.block.idx = BigInt(
                merklePath!.path[0].find((p) => p.hash == txn.txid)?.offset || 0,
              );
              txn.proof = proof;
              if (txn.block.height <= chaintip!.height - 5) {
                txn.status = TxnStatus.IMMUTABLE;
              }
              continue;
            }
          }
          txn.status = TxnStatus.REJECTED;
        }
        await this.storage.putMany(txns);
      } else {
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (e) {
      console.error("Failed to ingest txs", e);
      await new Promise((r) => setTimeout(r, 1000));
    }
    if (this.stopSync) {
      return;
    }
    return this.processConfirmed();
  }

  async ensureTxns(txids: string[]) {
    console.log("Downloading", txids.length, "txs");
    const exists = await this.storage.exists(txids);
    const missing: { [txid: string]: boolean } = {};
    for (const [i, txid] of txids.entries()) {
      if (!exists[i]) await this.loadTx(txid, true);
    }
    const missingTxids = Object.keys(missing);
    if (missingTxids.length) {
      const results = await this.services.txns.fetchTxns(missingTxids);
      await Promise.all([
        ...results.map((txn) => {
          if (!txn.proof) return;
          let merklePath = MerklePath.fromBinary(txn.proof);
          txn.block.height = merklePath!.blockHeight;
          txn.block.idx = BigInt(
            merklePath!.path[0].find((p) => p.hash == txn.txid)?.offset || 0,
          );
        }),
      ])
      await this.storage.putMany(results);
    }
  }
}
