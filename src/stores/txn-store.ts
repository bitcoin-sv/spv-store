import type { TxnStorage } from "../storage/txn-storage";
import {
  isBroadcastResponse,
  MerklePath,
  Transaction,
  type BroadcastFailure,
  type BroadcastResponse,
} from "@bsv/sdk";
import type { Services, Stores } from "../spv-store";
import type { EventEmitter } from "../lib/event-emitter";
import { Block } from "../models";

/**
 * Represents a transaction in the system.
 *
 * @interface Txn
 * @property {string} txid - The unique identifier for the transaction.
 * @property {number[]} rawtx - The raw transaction data.
 * @property {number[]} [proof] - Optional proof data for the transaction.
 * @property {Block} block - The block containing the transaction.
 * @property {TxnStatus} status - The current status of the transaction.
 */
export interface Txn {
  txid: string;
  rawtx: number[];
  proof?: number[];
  block: Block;
  status: TxnStatus;
}

/**
 * Enum representing the various statuses a transaction can have.
 *
 * @enum {number}
 * @property {number} REJECTED - The transaction has been rejected.
 * @property {number} PENDING - The transaction is pending and awaiting further action.
 * @property {number} BROADCASTED - The transaction has been broadcasted to the network.
 * @property {number} CONFIRMED - The transaction has been confirmed by the network, but could still be re-orged
 * @property {number} IMMUTABLE - The transaction is 6 blocks deep and is considered immutable.
 */
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
    public events?: EventEmitter
  ) { }

  async destroy() {
    this.stopSync = true;
    if (this.syncRunning) await this.syncRunning;
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
  ): Promise<Transaction> {
    let txn = await this.storage.get(txid);
    if (!txn) {
      this.events?.emit("fetchingTx", { txid });
      const tx = await this.services.txns!.fetchBeef(txid);
      await this.saveTx(tx);
      return tx;
    } else {
      const tx = Transaction.fromBinary(txn.rawtx);
      if (txn.proof) {
        tx.merklePath = MerklePath.fromBinary(txn.proof);
        if ((await tx.merklePath.verify(txn.txid, this.stores.blocks!))) {
          return tx
        }
        tx.merklePath = await this.services.txns?.fetchProof(txn.txid);
      }
      if (tx.merklePath) {
        if ((await tx.merklePath.verify(txn.txid, this.stores.blocks!))) {
          return tx
        } else {
          throw new Error("Invalid merkle proof");
        }
      } else {
        for (const input of tx.inputs) {
          if (input.sourceTXID) {
            input.sourceTransaction = await this.loadTx(input.sourceTXID)
          }
        }
      }
      return tx;
    }
  }

  async saveTx(tx: Transaction) {
    const txn: Txn = {
      txid: tx.id("hex"),
      rawtx: tx.toBinary(),
      block: new Block(),
      status: TxnStatus.BROADCASTED,
    };
    if (tx.merklePath) {
      const verified = await tx.merklePath.verify(txn.txid, this.stores.blocks!);
      console.log("Verified", verified);
      if (!verified) {
        throw new Error("Invalid merkle proof");
      }
      txn.proof = tx.merklePath!.toBinary();
      txn.block.height = tx.merklePath!.blockHeight;
      txn.block.idx = BigInt(
        tx.merklePath!.path[0].find((p) => p.hash == txn.txid)?.offset || 0
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
      const txns = await this.storage.getByStatus(
        TxnStatus.BROADCASTED,
        Date.now() - 600000,
        25
      );
      if (txns.length) {
        for (const txn of txns) {
          // this.events?.emit("fetchingTx", { txid: txn.txid });
          const merklePath = await this.services.txns?.fetchProof(txn.txid);
          if (!merklePath) {
            txn.block.height = Date.now();
            continue;
          }
          if (await merklePath.verify(txn.txid, this.stores.blocks!)) {
            txn.block.height = merklePath.blockHeight;
            txn.block.idx = BigInt(
              merklePath.path[0].find((p) => p.hash == txn.txid)?.offset || 0
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
      const txns = await this.storage.getByStatus(
        TxnStatus.CONFIRMED,
        chaintip!.height - 5,
        25
      );
      if (txns.length) {
        for (const txn of txns) {
          let merklePath: MerklePath | undefined = MerklePath.fromBinary(txn.proof!);
          let verified = false;
          try {
            verified = await merklePath.verify(txn.txid, this.stores.blocks!);
          } catch {
            console.error("Failed to verify merkle path:", txn.txid);
          }
          if (verified) {
            txn.status = TxnStatus.IMMUTABLE;
            continue;
          }
          // this.events?.emit("fetchingTx", { txid: txn.txid });
          merklePath = await this.services.txns!.fetchProof(txn.txid);
          if (merklePath) {
            try {
              verified = await merklePath.verify(txn.txid, this.stores.blocks!)
            } catch {
              console.error("Failed to verify merkle path:", txn.txid);
            }
            if (verified) {
              txn.block.height = merklePath!.blockHeight;
              txn.block.idx = BigInt(
                merklePath.path[0].find((p) => p.hash == txn.txid)?.offset || 0
              );
              txn.proof = merklePath.toBinary();
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

  // async ensureTxns(txids: string[]) {
  //   console.log("Downloading", txids.length, "txs");
  //   const exists = await this.storage.exists(txids);
  //   const missing: { [txid: string]: boolean } = {};
  //   for (const [i, txid] of txids.entries()) {
  //     if (!exists[i]) await this.loadTx(txid, true);
  //   }
  //   const missingTxids = Object.keys(missing);
  //   if (missingTxids.length) {
  //     const results = await this.services.txns?.fetchTxns(missingTxids) || [];
  //     await Promise.all([
  //       ...results.map((txn) => {
  //         if (!txn.proof) return;
  //         let merklePath = MerklePath.fromBinary(txn.proof);
  //         txn.block.height = merklePath!.blockHeight;
  //         txn.block.idx = BigInt(
  //           merklePath!.path[0].find((p) => p.hash == txn.txid)?.offset || 0
  //         );
  //       }),
  //     ]);
  //     await this.storage.putMany(results);
  //   }
  // }
}
