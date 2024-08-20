import type { TxLog } from "../services/inv-service";
import type { Ingest, IngestStatus } from "../models/ingest";
import type { Outpoint } from "../models/outpoint";
import type { TxoLookup, TxoResults } from "../models/search";
import type { Spend } from "../models/spend";
import type { Txo } from "../models/txo";

export interface TxoStorage {
  destroy(): void;
  get(outpoint: Outpoint): Promise<Txo | undefined>;
  getMany(outpoints: Outpoint[]): Promise<(Txo | undefined)[]>;
  getBySpend(txid: string): Promise<(Txo | undefined)[]>;
  put(txo: Txo): Promise<void>;
  putMany(txos: Txo[]): Promise<void>;
  setSpend(outpoint: Outpoint, spend: Spend): Promise<void>;
  search(lookup: TxoLookup, limit?: number, from?: string): Promise<TxoResults>;
  getState(key: string): Promise<string | undefined>;
  setState(key: string, value: string): Promise<void>;
  getQueueLength(): Promise<number>;
  putIngest(ingest: Ingest): Promise<void>;
  putIngests(ingests: Ingest[]): Promise<void>;
  getIngests(
    status: IngestStatus,
    limit: number,
    start?: number,
    stop?: number,
  ): Promise<Ingest[]>;
  getInv(owner: string, txid: string): Promise<TxLog | undefined>;
  getInvs(owner: string, txids: string[]): Promise<(TxLog | undefined)[]>;
  putInv(txLog: TxLog): Promise<void>;
  putInvs(txLogs: TxLog[]): Promise<void>;
  getSynced(owner: string): Promise<TxLog | undefined>;
}
