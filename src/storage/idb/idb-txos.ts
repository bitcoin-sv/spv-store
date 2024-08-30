import { openDB, type DBSchema, type IDBPDatabase } from "@tempfix/idb";
import { Txo, TxoStatus } from "../../models/txo";
import { IngestStatus, type Ingest } from "../../models/ingest";
import type { TxoStorage } from "../txo-storage";
import { Outpoint } from "../../models/outpoint";
import type { Indexer } from "../../models/indexer";
import { TxoSort, type TxoLookup, type TxoResults } from "../../models/search";
import type { Network } from "../../casemod-spv";
import type { TxLog } from "../../services/inv-service";

const TXO_DB_VERSION = 1;

export interface TxoSchema extends DBSchema {
  txos: {
    key: [string, number];
    value: Txo;
    indexes: {
      spend: string;
      events: string;
      tags: string;
      // owner: string;
    };
  };
  ingestQueue: {
    key: string;
    value: Ingest;
    indexes: {
      status: [number, number, number];
    };
  };
  syncLog: {
    key: [string, string];
    value: TxLog;
    indexes: {
      height: [string, number, number];
    };
  };
  txLog: {
    key: [string, string];
    value: TxLog;
    indexes: {
      height: [number, number];
    };
  };
  state: {
    key: string;
    value: {
      key: string;
      value: string;
    };
  };
}

function hydrateTxo(obj: Txo) {
  obj.outpoint = new Outpoint(obj.outpoint.txid, obj.outpoint.vout);
  return obj;
  // const txo = new Txo(
  //   obj.outpoint,
  //   obj.satoshis,
  //   obj.script,
  //   obj.status,
  // );
  // Object.assign(txo, obj);
  // return txo;
}

function buildTxoIndex(txo: Txo) {
  txo.tags = [];
  txo.events = [];
  const blockStr = txo.block.height.toString(10).padStart(7, "0");
  const idxStr = txo.block.idx.toString(10).padStart(9, "0");
  const sort = `${blockStr}.${idxStr}`;
  if (!txo.spend && txo.status !== TxoStatus.Dependency) {
    for (const [tag, data] of Object.entries(txo.data)) {
      if (data.events.length) txo.tags.push(`${tag}:${sort}`);
      for (const e of data.events) {
        txo.events.push(`${tag}:${e.id}:${e.value}:${sort}`);
      }
    }
  }
}

export class TxoStorageIDB implements TxoStorage {
  private constructor(
    public db: IDBPDatabase<TxoSchema>,
    public indexers: Indexer[] = [],
  ) { }
  static async init(
    accountId: string,
    indexers: Indexer[] = [],
    network: Network,
  ): Promise<TxoStorageIDB> {
    const db = await openDB<TxoSchema>(
      `txostore-${accountId}-${network}`,
      TXO_DB_VERSION,
      {
        upgrade(db) {
          const txos = db.createObjectStore("txos", {
            keyPath: ["outpoint.txid", "outpoint.vout"],
          });
          txos.createIndex("spend", "spend");
          txos.createIndex("events", "events", { multiEntry: true });
          txos.createIndex("tags", "tags", { multiEntry: true });
          const ingestQueue = db.createObjectStore("ingestQueue", {
            keyPath: "txid",
          });
          ingestQueue.createIndex("status", ["status", "height", "idx"]);
          db.createObjectStore("state", { keyPath: "key" });
          db.createObjectStore("syncLog", {
            keyPath: ["owner", "txid"],
          }).createIndex("height", ["owner", "height", "idx"]);
          db.createObjectStore("txLog", {
            keyPath: "txid",
          }).createIndex("height", ["height", "idx"]);
        },
      },
    );
    return new TxoStorageIDB(db, indexers);
  }

  async destroy() {
    const destroyed = new Promise(async (resolve) => {
      this.db.onclose = resolve;
    });
    this.db.close();
    await destroyed;
  }

  async get(outpoint: Outpoint): Promise<Txo | undefined> {
    const txo = await this.db.get("txos", [outpoint.txid, outpoint.vout]);
    return txo && hydrateTxo(txo);
  }

  async getMany(outpoints: Outpoint[]): Promise<(Txo | undefined)[]> {
    const t = this.db.transaction("txos");
    const txos = await Promise.all(
      outpoints.map((outpoint) => t.store.get([outpoint.txid, outpoint.vout])),
    );
    await t.done;
    return txos.map((txo) => txo && hydrateTxo(txo));
  }

  async getBySpend(txid: string): Promise<(Txo | undefined)[]> {
    const txos = await this.db.getAllFromIndex("txos", "spend", txid);
    return txos.map((txo) => hydrateTxo(txo));
  }

  async put(txo: Txo): Promise<void> {
    buildTxoIndex(txo);
    await this.db.put("txos", txo);
  }

  async putMany(txos: Txo[]): Promise<void> {
    if (!txos.length) return;
    const t = this.db.transaction("txos", "readwrite");
    await Promise.all(
      txos.map((txo) => {
        buildTxoIndex(txo);
        return t.store.put(txo);
      }),
    );
    await t.done;
  }

  async setSpend(outpoint: Outpoint, spendTxid: string): Promise<Txo> {
    const t = this.db.transaction("txos", "readwrite");
    const txo = await t.store.get([outpoint.txid, outpoint.vout]);
    if (!txo) throw new Error("Txo not found");
    txo.spend = spendTxid;
    buildTxoIndex(txo);
    await t.store.put(txo);
    await t.done;
    return hydrateTxo(txo);
  }

  // async setSpends(outpoints : Outpoint[], spendTxid : string) : Promise<Txo[]> {
  //   const t = this.db.transaction("txos", "readwrite");
  //   const txos = await Promise.all([
  //     ...outpoints.map(async (outpoint) => {
  //       let txo = await t.store.get([outpoint.txid, outpoint.vout]);
  //       if (!txo) {
  //         txo = new Txo(outpoint, 0n, []);
  //       }
  //       txo.spend = spendTxid;
  //       buildTxoIndex(txo);
  //       await t.store.put(txo);
  //       return hydrateTxo(txo);
  //     }),
  //   ]);
  //   await t.done;
  //   return txos;
  // }

  async search(
    lookup: TxoLookup,
    sort = TxoSort.DESC,
    limit = 10,
    from?: string,
  ): Promise<TxoResults> {
    const dbkey = lookup.toQueryKey();
    const start = from || dbkey;
    const query: IDBKeyRange = IDBKeyRange.bound(
      start,
      dbkey + "\uffff",
      true,
      false,
    );
    const indexName = lookup.id ? "events" : "tags";
    const results: TxoResults = { txos: [] };
    const index = this.db.transaction("txos").store.index(indexName);
    for await (const cursor of index.iterate(query, sort == TxoSort.DESC ? 'prev' : 'next')) {
      const txo = hydrateTxo(cursor.value);
      results.nextPage = cursor.key;
      if (lookup.owner && txo.owner != lookup.owner) continue;
      results.txos.push(txo);
      if (limit > 0 && results.txos.length >= limit) {
        return results;
      }
    }
    delete results.nextPage;
    return results;
  }

  async getState(key: string): Promise<string | undefined> {
    const state = await this.db.get("state", key);
    return state?.value;
  }

  async setState(key: string, value: string): Promise<void> {
    await this.db.put("state", { key, value });
  }

  async getQueueLength(): Promise<number> {
    const queueLength = await this.db.countFromIndex(
      "ingestQueue",
      "status",
      IDBKeyRange.bound(
        [IngestStatus.QUEUED],
        [IngestStatus.DOWNLOADED, Number.MAX_SAFE_INTEGER],
      ),
    );
    return queueLength;
  }

  async getIngests(
    status: IngestStatus,
    limit: number,
    start: number = 0,
    stop: number = 0,
  ): Promise<Ingest[]> {
    const query = IDBKeyRange.bound(
      [status, start],
      [status, stop || Number.MAX_SAFE_INTEGER],
    );
    const ingests = await this.db.getAllFromIndex(
      "ingestQueue",
      "status",
      query,
      limit,
    );
    return ingests;
  }

  async putIngest(ingest: Ingest): Promise<void> {
    const t = this.db.transaction("ingestQueue", "readwrite");
    const prev = await t.store.get(ingest.txid).catch(() => undefined);
    if (prev?.outputs) {
      const outputs = new Set<number>(prev.outputs);
      for (const idx of ingest.outputs || []) {
        outputs.add(idx);
      }
      ingest.outputs = Array.from(outputs);
    }
    await this.db.put("ingestQueue", ingest);
  }

  async putIngests(ingests: Ingest[]): Promise<void> {
    if (!ingests.length) return;
    const t = this.db.transaction("ingestQueue", "readwrite");
    await Promise.all(ingests.map(async (ingest) => {
      const prev = await t.store.get(ingest.txid).catch(() => undefined);
      if (prev?.outputs) {
        const outputs = new Set<number>(prev.outputs);
        for (const idx of ingest.outputs || []) {
          outputs.add(idx);
        }
        ingest.outputs = Array.from(outputs);
      }
      t.store.put(ingest)
    }));
    await t.done;
  }

  async getInv(owner: string, txid: string): Promise<TxLog | undefined> {
    return this.db.get("syncLog", [owner, txid]);
  }

  async getInvs(
    owner: string,
    txids: string[],
  ): Promise<(TxLog | undefined)[]> {
    const t = this.db.transaction("syncLog", "readonly");
    const syncLogs = await Promise.all(
      txids.map((txid) => t.store.get([owner, txid]).catch(() => undefined)),
    );
    await t.done;
    return syncLogs;
  }

  async putInv(syncLog: TxLog): Promise<void> {
    await this.db.put("syncLog", syncLog);
  }

  async putInvs(syncLogs: TxLog[]): Promise<void> {
    if (!syncLogs.length) return;
    const t = this.db.transaction("syncLog", "readwrite");
    await Promise.all(syncLogs.map((log) => t.store.put(log)));
    await t.done;
  }

  async putTxLog(txLog: TxLog): Promise<void> {
    await this.db.put("txLog", txLog);
  }

  async getTxLogs(limit = 100): Promise<TxLog[]> {
    const t = this.db.transaction("txLog");
    const idx = t.store.index("height");
    const logs: TxLog[] = [];
    for await (const cursor of idx.iterate(null, "prev")) {
      logs.push(cursor.value);
      if (logs.length >= limit) break;
    }
    await t.done;
    return logs;
  }

  async getSynced(owner: string): Promise<TxLog | undefined> {
    const t = this.db.transaction("syncLog", "readonly");
    const cursor = await t.store
      .index("height")
      .openCursor(IDBKeyRange.upperBound([owner, 50000000]), "prev");
    const syncLog = cursor?.value;
    await t.done;
    return syncLog;
  }
}
