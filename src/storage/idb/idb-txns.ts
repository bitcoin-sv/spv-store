import { openDB, type DBSchema, type IDBPDatabase } from "@tempfix/idb";
import { MerklePath, Transaction } from "@bsv/sdk";
import { Block } from "../../models/block";
import { TxnStatus } from "../../stores/txn-store";
import type { TxnStorage } from "../txn-storage";
import type { Network } from "../../case-mod-spv";

const TXN_DB_VERSION = 1;

export interface Txn {
  txid: string;
  rawtx: number[];
  proof?: number[];
  block: Block;
  status: TxnStatus;
}

export interface TxnSchema extends DBSchema {
  txns: {
    key: string;
    value: Txn;
    indexes: {
      status: [number, number];
    };
  };
  state: {
    key: string;
    value: {
      key: string;
      state: number;
    };
  };
}

export class TxnStorageIDB implements TxnStorage {
  private constructor(public db: IDBPDatabase<TxnSchema>) {}

  static async init(network: Network): Promise<TxnStorageIDB> {
    const db = await openDB<TxnSchema>(`txns-${network}`, TXN_DB_VERSION, {
      upgrade(db) {
        db.createObjectStore("txns", { keyPath: "txid" }).createIndex(
          "status",
          ["status", "height"]
        );
        db.createObjectStore("state", { keyPath: "key" });
      },
    });

    return new TxnStorageIDB(db);
  }

  async destroy() {
    const destroyed = new Promise(async (resolve) => {
      this.db.onclose = resolve;
    });
    this.db.close();
    await destroyed;
  }

  async get(txid: string): Promise<Transaction | undefined> {
    const txn = await this.db.get("txns", txid).catch(() => null);
    if (txn) {
      const tx = Transaction.fromBinary(txn.rawtx);
      if (txn.proof) {
        tx.merklePath = MerklePath.fromBinary(Array.from(txn.proof));
      }
      return tx;
    }
  }

  async getMany(txids: string[]): Promise<(Transaction | undefined)[]> {
    const t = this.db.transaction("txns");
    const txns = await Promise.all(txids.map((txid) => t.store.get(txid)));
    await t.done;
    return txns.map((txn) => {
      if (!txn) return;
      const tx = Transaction.fromBinary(txn.rawtx);
      if (txn.proof) {
        tx.merklePath = MerklePath.fromBinary(Array.from(txn.proof));
      }
      return tx;
    });
  }

  async put(tx: Transaction) {
    const txn: Txn = {
      txid: tx.id("hex"),
      rawtx: tx.toBinary(),
      block: new Block(),
      status: TxnStatus.PENDING,
    };
    if (tx.merklePath) {
      txn.block.height = tx.merklePath.blockHeight;
      txn.block.idx = BigInt(
        tx.merklePath.path[0].find((p) => p.hash == txn.txid)?.offset || 0
      );
      txn.proof = tx.merklePath.toBinary();
      txn.status = TxnStatus.CONFIRMED;
    }
    await this.db.put("txns", txn);
  }

  async putMany(txs: Transaction[]): Promise<void> {
    if (!txs.length) return;
    const t = this.db.transaction("txns", "readwrite");
    await Promise.all(
      txs.map((tx) => {
        const txn: Txn = {
          txid: tx.id("hex"),
          rawtx: tx.toBinary(),
          block: new Block(),
          status: TxnStatus.PENDING,
        };
        if (tx.merklePath) {
          txn.block.height = tx.merklePath.blockHeight;
          txn.block.idx = BigInt(
            tx.merklePath.path[0].find((p) => p.hash == txn.txid)?.offset || 0
          );
          txn.proof = tx.merklePath.toBinary();
          txn.status = TxnStatus.CONFIRMED;
        }
        return t.store.put(txn);
      })
    );
    await t.done;
  }

  async exists(txids: string[]): Promise<boolean[]> {
    const t = this.db.transaction("txns");
    const foundTxids = await Promise.all([
      ...txids.map((txid) => t.store.getKey(txid).catch(() => null)),
    ]);
    await t.done;
    return foundTxids.map((txid) => !!txid);
  }
}
