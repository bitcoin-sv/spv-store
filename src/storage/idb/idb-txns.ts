import { openDB, type DBSchema, type IDBPDatabase } from "@tempfix/idb";
import { MerklePath, Transaction } from "@bsv/sdk";
import { TxnStatus, type Txn } from "../../stores/txn-store";
import type { TxnStorage } from "../txn-storage";
import type { Network } from "../../casemod-spv";

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
  private constructor(public db: IDBPDatabase<TxnSchema>) { }

  static async init(network: Network): Promise<TxnStorageIDB> {
    const db = await openDB<TxnSchema>(`txns-${network}`, TXN_DB_VERSION, {
      upgrade(db) {
        db.createObjectStore("txns", { keyPath: "txid" })
          .createIndex("status", ["status", "block.height"]);
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

  async get(txid: string): Promise<Txn | undefined> {
    return this.db.get("txns", txid).catch(() => undefined);
    // if (txn) {
    //   const tx = Transaction.fromBinary(txn.rawtx);
    //   if (txn.proof) {
    //     tx.merklePath = MerklePath.fromBinary(Array.from(txn.proof));
    //   }
    //   return tx;
    // }
  }

  async getMany(txids: string[]): Promise<(Txn | undefined)[]> {
    const t = this.db.transaction("txns");
    const txns = await Promise.all(txids.map((txid) => t.store.get(txid).catch(() => undefined)));
    await t.done;
    return txns;
  }

  async put(txn: Txn): Promise<void> {
    await this.db.put("txns", txn);
  }

  async putMany(txns: Txn[]): Promise<void> {
    if (!txns.length) return;
    const t = this.db.transaction("txns", "readwrite");
    await Promise.all(
      txns.map((txn) => {
        // const txn: Txn = {
        //   txid: tx.id("hex"),
        //   rawtx: tx.toBinary(),
        //   block: { height: Date.now(), idx: BigInt(0) },
        //   status: TxnStatus.PENDING,
        // };
        // if (tx.merklePath) {
        //   txn.block.height = tx.merklePath.blockHeight;
        //   txn.block.idx = BigInt(
        //     tx.merklePath.path[0].find((p) => p.hash == txn.txid)?.offset || 0,
        //   );
        //   txn.proof = tx.merklePath.toBinary();
        //   txn.status = TxnStatus.CONFIRMED;
        // }
        return t.store.put(txn);
      }),
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

  async getByStatus(status: TxnStatus, toBlock: number, limit = 25): Promise<Txn[]> {
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
