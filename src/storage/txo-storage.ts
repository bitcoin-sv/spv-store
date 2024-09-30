import type { TxLog } from "../services/inv-service";
import type { Ingest, IngestStatus } from "../models/ingest";
import type { Outpoint } from "../models/outpoint";
import type { TxoLookup, TxoResults, TxoSort } from "../models/search";
import type { Txo } from "../models/txo";

/**
 * Interface representing a storage system for transaction outputs (Txo).
 */
export interface TxoStorage {
  /**
   * Destroys the storage, cleaning up any resources.
   * @returns A promise that resolves when the operation is complete.
   */
  destroy(): Promise<void>;

  /**
   * Retrieves a transaction output by its outpoint.
   * @param outpoint - The outpoint of the transaction output.
   * @returns A promise that resolves to the transaction output or undefined if not found.
   */
  get(outpoint: Outpoint): Promise<Txo | undefined>;

  /**
   * Retrieves multiple transaction outputs by their outpoints.
   * @param outpoints - An array of outpoints.
   * @returns A promise that resolves to an array of transaction outputs or undefined if not found.
   */
  getMany(outpoints: Outpoint[]): Promise<(Txo | undefined)[]>;

  /**
   * Retrieves transaction outputs by the transaction ID that spent them.
   * @param txid - The transaction ID.
   * @returns A promise that resolves to an array of transaction outputs.
   */
  getBySpend(txid: string): Promise<Txo[]>;

  /**
   * Stores a transaction output.
   * @param txo - The transaction output to store.
   * @returns A promise that resolves when the operation is complete.
   */
  put(txo: Txo): Promise<void>;

  /**
   * Stores multiple transaction outputs.
   * @param txos - An array of transaction outputs to store.
   * @returns A promise that resolves when the operation is complete.
   */
  putMany(txos: Txo[]): Promise<void>;

  /**
   * Searches for transaction outputs based on a lookup criteria.
   * @param lookup - The lookup criteria.
   * @param sort - Optional sorting criteria.
   * @param limit - Optional limit on the number of results.
   * @param from - Optional starting point for the search.
   * @returns A promise that resolves to the search results.
   */
  search(lookup: TxoLookup, sort?: TxoSort, limit?: number, from?: string): Promise<TxoResults>;

  /**
   * Retrieves a state value by its key.
   * @param key - The key of the state value.
   * @returns A promise that resolves to the state value or undefined if not found.
   */
  getState(key: string): Promise<string | undefined>;

  /**
   * Sets a state value by its key.
   * @param key - The key of the state value.
   * @param value - The value to set.
   * @returns A promise that resolves when the operation is complete.
   */
  setState(key: string, value: string): Promise<void>;

  /**
   * Retrieves the length of the queue.
   * @returns A promise that resolves to the length of the queue.
   */
  getQueueLength(): Promise<number>;

  /**
   * Retrieves ingests based on their status.
   * @param status - The status of the ingests.
   * @param limit - The maximum number of ingests to retrieve.
   * @param start - Optional starting point for the retrieval.
   * @param stop - Optional stopping point for the retrieval.
   * @returns A promise that resolves to an array of ingests.
   */
  getIngests(
    status: IngestStatus,
    limit: number,
    start?: number,
    stop?: number,
  ): Promise<Ingest[]>;

  /**
   * Stores an ingest.
   * @param ingest - The ingest to store.
   * @returns A promise that resolves when the operation is complete.
   */
  putIngest(ingest: Ingest): Promise<void>;

  /**
   * Stores multiple ingests.
   * @param ingests - An array of ingests to store.
   * @returns A promise that resolves when the operation is complete.
   */
  putIngests(ingests: Ingest[]): Promise<void>;

  /**
   * Deletes an ingest by its transaction ID.
   * @param txid - The transaction ID of the ingest to delete.
   * @returns A promise that resolves when the operation is complete.
   */
  delIngest(txid: string): Promise<void>;

  /**
   * Deletes multiple ingests by their transaction IDs.
   * @param txids - An array of transaction IDs of the ingests to delete.
   * @returns A promise that resolves when the operation is complete.
   */
  delIngests(txids: string[]): Promise<void>;

  /**
   * Retrieves a transaction log by its transaction ID.
   * @param txid - The transaction ID of the log to retrieve.
   * @returns A promise that resolves to the transaction log or undefined if not found.
   */
  getTxLog(txid: string): Promise<TxLog | undefined>;

  /**
   * Retrieves multiple transaction logs by their transaction IDs.
   * @param txids - An array of transaction IDs of the logs to retrieve.
   * @returns A promise that resolves to an array of transaction logs or undefined if not found.
   */
  getTxLogs(txids: string[]): Promise<(TxLog | undefined)[]>;

  /**
   * Retrieves recent transaction logs.
   * @param limit - Optional limit on the number of logs to retrieve.
   * @returns A promise that resolves to an array of recent transaction logs.
   */
  getRecentTxLogs(limit?: number): Promise<TxLog[]>;

  /**
   * Stores a transaction log.
   * @param txLog - The transaction log to store.
   * @returns A promise that resolves when the operation is complete.
   */
  putTxLog(txLog: TxLog): Promise<void>;

  /**
   * Retrieves backup logs.
   * @returns A promise that resolves to an array of backup logs.
   */
  getBackupLogs(): Promise<TxLog[]>;
}
