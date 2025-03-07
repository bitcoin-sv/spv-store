import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import { TxnStatus, type Txn } from "../../stores/txn-store";
import type { TxnBackup, TxnStorage } from "../txn-storage";
import type { Network } from "../../spv-store";
import { MerklePath, Transaction, Utils } from "@bsv/sdk";
import { Block } from "../../models";

const TXN_DB_VERSION = 1;

export interface TxnSchema extends DBSchema {
  txns: {
    key: string;
    value: Txn;
    indexes: {
      status: [number, number];
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
          ["status", "block.height"]
        );
      },
    });

    return new TxnStorageIDB(db);
  }

  async destroy() {
    this.db.close();
  }

  async get(txid: string): Promise<Txn | undefined> {
    return this.db.get("txns", txid).catch(() => undefined);
  }

  async getMany(txids: string[]): Promise<(Txn | undefined)[]> {
    const t = this.db.transaction("txns");
    const txns = await Promise.all(
      txids.map((txid) => t.store.get(txid).catch(() => undefined))
    );
    await t.done;
    return txns;
  }

  async backup(limit = 1000, from = [TxnStatus.BROADCASTED]): Promise<TxnBackup> {
    const writer = new Utils.Writer();
    const idx = this.db.transaction("txns").store.index("status");
    const query = IDBKeyRange.lowerBound(from, false)
    let count = 0
    let nextPage: any;
    for await (const cursor of idx.iterate(query)) {
      if(++count > limit) {
        nextPage = cursor.key;
        break;
      }
      const tx = Transaction.fromBinary(cursor.value.rawtx);
      if(cursor.value.proof) {
        tx.merklePath = MerklePath.fromBinary(cursor.value.proof);
      }
      const beef = tx.toAtomicBEEF();
      writer.writeUInt32LE(beef.length);
      writer.write(beef);
    }

    return {
      data: writer.toArray(),
      nextPage,
    };
  }

  async restore(data: number[]): Promise<void> {
    const reader = new Utils.Reader(data);
    const t = this.db.transaction("txns", "readwrite");
    while (!reader.eof()) {
      const len = reader.readUInt32LE();
      const beef = reader.read(len);
      const tx = Transaction.fromAtomicBEEF(beef);
      const txid = tx.id("hex");
      t.store.put({
        txid,
        rawtx: tx.toBinary(),
        proof: tx.merklePath?.toBinary(),
        status: TxnStatus.CONFIRMED,
        block: new Block(
          tx.merklePath?.blockHeight,
          BigInt(tx.merklePath?.path[0].find((p) => p.hash == txid)!.offset || 0)
        )
      });
    }
    await t.done;
  }

  async put(txn: Txn): Promise<void> {
    await this.db.put("txns", txn);
  }

  async putMany(txns: Txn[]): Promise<void> {
    if (!txns.length) return;
    const t = this.db.transaction("txns", "readwrite");
    await Promise.all(
      txns.map((txn) => {
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

  async getByStatus(
    status: TxnStatus,
    toBlock: number,
    limit = 25
  ): Promise<Txn[]> {
    const t = this.db.transaction("txns");
    const idx = t.store.index("status");
    const query = IDBKeyRange.bound([status, 0], [status, toBlock]);
    const txns: Txn[] = [];
    for await (const cursor of idx.iterate(query)) {
      txns.push(cursor.value);
      if (txns.length >= limit) break;
    }
    await t.done;
    return txns;
  }
}
