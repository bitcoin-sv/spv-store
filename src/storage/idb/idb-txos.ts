import { openDB, type DBSchema, type IDBPDatabase } from "@tempfix/idb";
import { Txo, TxoStatus } from "../../models/txo";
import { IngestStatus, type Ingest } from "../../models/ingest";
import type { TxoStorage } from "../txo-storage";
import { Outpoint } from "../../models/outpoint";
import { TxoSort, type TxoLookup, type TxoResults } from "../../models/search";
import type { Network } from "../../spv-store";
import { ParseMode, TxLog } from "../../models";

const TXO_DB_VERSION = 1;

export interface TxoSchema extends DBSchema {
  txos: {
    key: [string, number];
    value: Txo;
    indexes: {
      spend: [string, number];
      events: string;
      tags: string;
      deps: string;
    };
  };
  ingestQueue: {
    key: string;
    value: Ingest;
    indexes: {
      status: [number, number, number];
    };
  };
  txLog: {
    key: string;
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
  for (const data of Object.values(obj.data)) {
    data.deps = data.deps.map((dep) => new Outpoint(dep));
  }
  return obj;
}

function buildTxoIndex(txo: Txo) {
  txo.tags = [];
  txo.events = [];
  txo.deps = [];
  const blockStr = txo.block.height.toString(10).padStart(7, "0");
  const idxStr = txo.block.idx.toString(10).padStart(9, "0");
  const sort = `${blockStr}.${idxStr}`;
  const deps = new Set<string>();
  for (const [tag, data] of Object.entries(txo.data)) {
    for (const dep of data.deps) {
      deps.add(dep.toString());
    }
    if (txo.spend || txo.status == TxoStatus.Dependency) continue;
    if (data.events.length) txo.tags.push(`${tag}:${sort}`);
    for (const e of data.events) {
      txo.events.push(`${tag}:${e.id}:${e.value}:${sort}`);
    }
  }
  txo.deps = Array.from(deps);
  txo.hasEvents = txo.events.length;
}

export class TxoStorageIDB implements TxoStorage {
  private constructor(public db: IDBPDatabase<TxoSchema>) { }
  static async init(
    accountId: string,
    network: Network
  ): Promise<TxoStorageIDB> {
    const db = await openDB<TxoSchema>(
      `txos-${accountId}-${network}`,
      TXO_DB_VERSION,
      {
        upgrade(db) {
          const txos = db.createObjectStore("txos", {
            keyPath: ["outpoint.txid", "outpoint.vout"],
          });
          txos.createIndex("spend", ["spend", "hasEvents"]);
          txos.createIndex("events", "events", { multiEntry: true });
          txos.createIndex("tags", "tags", { multiEntry: true });
          txos.createIndex("deps", "deps", { multiEntry: true });
          const ingestQueue = db.createObjectStore("ingestQueue", {
            keyPath: "txid",
          });
          ingestQueue.createIndex("status", ["status", "height", "idx"]);
          db.createObjectStore("state", { keyPath: "key" });
          const txLog = db.createObjectStore("txLog", { keyPath: "txid" });
          txLog.createIndex("height", ["height", "idx"]);
        },
      }
    );
    return new TxoStorageIDB(db);
  }

  async destroy() {
    this.db.close();
  }

  async get(outpoint: Outpoint): Promise<Txo | undefined> {
    const txo = await this.db.get("txos", [outpoint.txid, outpoint.vout]);
    return txo && hydrateTxo(txo);
  }

  async getMany(outpoints: Outpoint[]): Promise<(Txo | undefined)[]> {
    const t = this.db.transaction("txos");
    const txos = await Promise.all(
      outpoints.map((outpoint) => t.store.get([outpoint.txid, outpoint.vout]))
    );
    await t.done;
    return txos.map((txo) => txo && hydrateTxo(txo));
  }

  async getBySpend(txid: string): Promise<Txo[]> {
    const txos = await this.db.getAllFromIndex(
      "txos",
      "spend",
      IDBKeyRange.bound([txid], [txid, Number.MAX_SAFE_INTEGER])
    );
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
      })
    );
    await t.done;
  }

  async search(
    lookup: TxoLookup,
    sort = TxoSort.DESC,
    limit = 10,
    from?: string
  ): Promise<TxoResults> {
    const dbkey = lookup.toQueryKey();
    const lower = from && sort == TxoSort.ASC ? from : dbkey;
    const upper = from && sort == TxoSort.DESC ? from : dbkey + "\uffff";
    const query = IDBKeyRange.bound(
      lower,
      upper,
      true,
      true
    );

    const indexName = lookup.id ? "events" : "tags";
    const results: TxoResults = { txos: [] };
    const t = this.db.transaction("txos");
    const index = t.store.index(indexName);
    for await (const cursor of index.iterate(
      query,
      sort == TxoSort.DESC ? "prev" : "next"
    )) {
      const txo = hydrateTxo(cursor.value);
      results.nextPage = cursor.key;
      if (lookup.owner && txo.owner != lookup.owner) continue;
      results.txos.push(txo);
      if (limit > 0 && results.txos.length >= limit) {
        await t.done;
        return results;
      }
    }
    await t.done;
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
        [IngestStatus.DOWNLOADED, Number.MAX_SAFE_INTEGER]
      )
    );
    return queueLength;
  }

  async getIngests(
    status: IngestStatus,
    limit: number,
    start: number = 0,
    stop: number = 0
  ): Promise<Ingest[]> {
    const query = IDBKeyRange.bound(
      [status, start],
      [status, stop || Number.MAX_SAFE_INTEGER]
    );
    const ingests = await this.db.getAllFromIndex(
      "ingestQueue",
      "status",
      query,
      limit
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
    await t.done;
    await this.db.put("ingestQueue", ingest);
  }

  async putIngests(ingests: Ingest[]): Promise<void> {
    if (!ingests.length) return;
    const t = this.db.transaction("ingestQueue", "readwrite");
    await Promise.all(
      ingests.map(async (ingest) => {
        const prev = await t.store.get(ingest.txid).catch(() => undefined);
        if (prev?.outputs) {
          const outputs = new Set<number>(prev.outputs);
          for (const idx of ingest.outputs || []) {
            outputs.add(idx);
          }
          ingest.outputs = Array.from(outputs);
        }
        t.store.put(ingest);
      })
    );
    await t.done;
  }

  async delIngest(txid: string): Promise<void> {
    await this.db.delete("ingestQueue", txid);
  }

  async delIngests(txids: string[]): Promise<void> {
    const t = this.db.transaction("ingestQueue", "readwrite");
    await Promise.all(txids.map((txid) => t.store.delete(txid)));
    await t.done;
  }

  async getTxLog(txid: string): Promise<TxLog | undefined> {
    return this.db.get("txLog", txid);
  }

  async getTxLogs(txids: string[]): Promise<(TxLog | undefined)[]> {
    const t = this.db.transaction("txLog");
    const logs = await Promise.all(
      txids.map((txid) => t.store.get(txid).catch(() => undefined))
    );
    await t.done;
    return logs.filter((log) => log !== undefined);
  }

  async putTxLog(txLog: TxLog): Promise<void> {
    await this.db.put("txLog", txLog);
  }

  async getRecentTxLogs(limit = 100): Promise<TxLog[]> {
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

  async getBackupLogs(): Promise<Ingest[]> {
    const ingests = new Map<string, DepLog>();
    const t = this.db.transaction("txos");
    const promises: Promise<void>[] = [];
    for await (const cursor of t.store
      .index("spend")
      .iterate(IDBKeyRange.bound(["", 1], ["", Number.MAX_SAFE_INTEGER]))) {
      const u = cursor.value;
      let ingest = ingests.get(u.outpoint.txid);
      if (!ingest) {
        ingests.set(u.outpoint.txid, {
          txid: u.outpoint.txid,
          height: u.block.height,
          idx: Number(u.block.idx),
          outputs: new Set<number>([u.outpoint.vout]),
        });
      } else {
        ingest.outputs!.add(u.outpoint.vout);
      }
      promises.push(this.loadDeps(u.outpoint, ingests));
    }

    await Promise.all(promises);
    await t.done;

    return Array.from(ingests.values())
      .sort((a, b) => a.height - b.height || a.idx - b.idx)
      .map((ingest) => ({
        txid: ingest.txid,
        height: ingest.height,
        idx: ingest.idx,
        outputs: Array.from(ingest.outputs),
        parseMode: ingest.isDep ? ParseMode.Dependency : ParseMode.Persist,
      }));
  }

  async loadDeps(op: Outpoint, deps: Map<string, DepLog>) {
    const log = deps.get(op.txid);
    if (log && !log.outputs!.has(op.vout)) {
      log.outputs!.add(op.vout);
      return;
    }
    const txo = await this.get(op);
    if (!txo) throw new Error(`Missing dep: ${op.txid}:${op.vout}`);
    if (!log) {
      deps.set(op.txid, {
        txid: op.txid,
        height: txo.block.height,
        idx: Number(txo.block.idx),
        isDep: true,
        outputs: new Set<number>([op.vout]),
      });
    }

    for (const data of Object.values(txo.data)) {
      for (const dep of data.deps) {
        await this.loadDeps(dep, deps);
      }
    }
  }
}

type DepLog = {
  txid: string;
  height: number;
  idx: number;
  isDep?: boolean;
  outputs: Set<number>;
};
