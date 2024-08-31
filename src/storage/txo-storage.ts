import type { TxLog } from "../services/inv-service";
import type { Ingest, IngestStatus } from "../models/ingest";
import type { Outpoint } from "../models/outpoint";
import type { TxoLookup, TxoResults, TxoSort } from "../models/search";
import type { Txo } from "../models/txo";

export interface TxoStorage {
  destroy(): Promise<void>;
  get(outpoint: Outpoint): Promise<Txo | undefined>;
  getMany(outpoints: Outpoint[]): Promise<(Txo | undefined)[]>;
  getBySpend(txid: string): Promise<Txo[]>;
  put(txo: Txo): Promise<void>;
  putMany(txos: Txo[]): Promise<void>;
  search(lookup: TxoLookup, sort?: TxoSort, limit?: number, from?: string): Promise<TxoResults>;
  getState(key: string): Promise<string | undefined>;
  setState(key: string, value: string): Promise<void>;
  getQueueLength(): Promise<number>;
  getIngests(
    status: IngestStatus,
    limit: number,
    start?: number,
    stop?: number,
  ): Promise<Ingest[]>;
  putIngest(ingest: Ingest): Promise<void>;
  putIngests(ingests: Ingest[]): Promise<void>;
  delIngest(txid: string): Promise<void>;
  delIngests(txids: string[]): Promise<void>;
  getTxLog(txid: string): Promise<TxLog | undefined>;
  getTxLogs(txids: string[]): Promise<(TxLog | undefined)[]>;
  getRecentTxLogs(limit?: number): Promise<TxLog[]>;
  putTxLog(txLog: TxLog): Promise<void>;
  getBackupLogs(): Promise<TxLog[]>;
}
