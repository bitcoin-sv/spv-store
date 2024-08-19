import { openDB, type DBSchema, type IDBPDatabase } from "@tempfix/idb";
import { Txo } from "../../models/txo";
import { IngestStatus, type Ingest } from "../../models/ingest";
import type { TxoStorage } from "../txo-storage";
import type { Outpoint } from "../../models/outpoint";
import type { Spend } from "../../models/spend";
import type { Indexer } from "../../models/indexer";
import type { TxoLookup, TxoResults } from "../../models/search";
import type { Network } from "../../case-mod-spv";
import type { TxLog } from "../../inv-service/inv-service";

const TXO_DB_VERSION = 1;

export interface TxoSchema extends DBSchema {
  txos: {
    key: [string, number];
    value: Txo;
    indexes: {
      events: string;
      spends: string;
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
    const db = await openDB<TxoSchema>(`txostore-${accountId}-${network}`, TXO_DB_VERSION, {
      upgrade(db) {
        const txos = db.createObjectStore('txos', { keyPath: ['outpoint.txid', 'outpoint.vout'] });
        txos.createIndex('events', 'events', { multiEntry: true });
        txos.createIndex('spends', 'spend.txid', { multiEntry: true });
        const ingestQueue = db.createObjectStore('ingestQueue', { keyPath: 'txid' });
        ingestQueue.createIndex('status', ['status', 'height', 'idx']);
        db.createObjectStore('state', { keyPath: 'key' });
        db.createObjectStore('txLog', { keyPath: ['owner', 'txid'] })
          .createIndex('height', ['owner', 'height', 'idx']);
      },
    });
    return new TxoStorageIDB(db, indexers);
  }

  async destroy(): Promise<void> {
    this.db.close();
  }

  async get(outpoint: Outpoint): Promise<Txo | undefined> {
    return this.db.get('txos', [outpoint.txid, outpoint.vout]);
  }

  async getMany(outpoints: Outpoint[]): Promise<(Txo | undefined)[]> {
    const t = this.db.transaction('txos');
    const txos = await Promise.all(
      outpoints.map(outpoint => t.store.get([outpoint.txid, outpoint.vout])),
    );
    await t.done;
    return txos;
  }

  async getBySpend(txid: string): Promise<(Txo | undefined)[]> {
    return this.db.getAllFromIndex('txos', 'spends', txid);
  }

  async put(txo: Txo): Promise<void> {
    await this.db.put('txos', txo.toObject());
  }

  async putMany(txos: Txo[]): Promise<void> {
    const t = this.db.transaction('txos', 'readwrite');
    await Promise.all(txos.map(txo => t.store.put(txo.toObject())));
    await t.done;
  }

  async setSpend(outpoint: Outpoint, spend: Spend): Promise<void> {
    const txo = await this.get(outpoint);
    if (!txo) throw new Error('Txo not found');
    txo.spend = spend;
    await this.put(txo);
  }

  async search(lookup: TxoLookup, limit = 10, from?: string): Promise<TxoResults> {
    const dbkey = lookup.toQueryKey();
    const start = from || dbkey;
    const query: IDBKeyRange = IDBKeyRange.bound(start, dbkey + '\uffff', true, false);
    const results: TxoResults = { txos: [] };
    for await (const cursor of this.db.transaction('txos').store.index('events').iterate(query)) {
      const txo = Txo.fromObject(cursor.value, []);
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
    const state = await this.db.get('state', key);
    return state?.value;
  }

  async setState(key: string, value: string): Promise<void> {
    await this.db.put('state', { key, value });
  }

  async getQueueLength(): Promise<number> {
    const queueLength = await this.db.countFromIndex(
      'ingestQueue',
      'status',
      IDBKeyRange.bound([IngestStatus.DOWNLOAD], [IngestStatus.INGEST, Number.MAX_SAFE_INTEGER]),
    );
    return queueLength;
  }

  async getIngests(status: IngestStatus, limit: number): Promise<Ingest[]> {
    const query = IDBKeyRange.bound([status], [status, Number.MAX_SAFE_INTEGER]);
    const ingests = await this.db.getAllFromIndex('ingestQueue', 'status', query, limit);
    return ingests;
  }

  async putIngests(ingests: Ingest[]): Promise<void> {
    const t = this.db.transaction('ingestQueue', 'readwrite');
    for (const ingest of ingests) {
      await t.store.put(ingest);
    }
    await t.done;
  }

  async getInv(owner: string, txid: string): Promise<TxLog | undefined> {
    return this.db.get('txLog', [owner, txid]);
  }

  async getInvs(owner: string, txids: string[]): Promise<(TxLog | undefined)[]> {
    const t = this.db.transaction('txLog', 'readonly');
    const txLogs = await Promise.all(
      txids.map(txid => t.store.get([owner, txid]).catch(() => undefined))
    );
    await t.done;
    return txLogs;
  }

  async putInv(txLog: TxLog): Promise<void> {
    await this.db.put('txLog', txLog);
  }

  async putInvs(txLogs: TxLog[]): Promise<void> {
    const t = this.db.transaction('txLog', 'readwrite');
    await Promise.all(txLogs.map(log => t.store.put(log)));
    await t.done;
  }

  async getSynced(owner: string): Promise<TxLog | undefined> {
    const t = this.db.transaction('txLog', 'readonly')
    const cursor = await t.store.index('height')
      .openCursor(IDBKeyRange.upperBound([owner, 50000000]), 'prev')
    const txLog = cursor?.value
    await t.done;
    return txLog;
  }
}
