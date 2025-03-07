import type { Txn, TxnStatus } from "../stores";

export interface TxnBackup {
  data: number[];
  nextPage?: any;
}

/**
 * Interface representing a transaction storage system.
 */
export interface TxnStorage {
  /**
   * Destroys the storage instance, releasing any resources held.
   * @returns A promise that resolves when the storage is destroyed.
   */
  destroy(): Promise<void>;

  /**
   * Retrieves a transaction by its ID.
   * @param txid - The ID of the transaction to retrieve.
   * @returns A promise that resolves to the transaction if found, or undefined if not found.
   */
  get(txid: string): Promise<Txn | undefined>;

  /**
   * Retrieves multiple transactions by their IDs.
   * @param txids - An array of transaction IDs to retrieve.
   * @returns A promise that resolves to an array of transactions, with undefined for any transactions not found.
   */
  getMany(txids: string[]): Promise<(Txn | undefined)[]>;

  // getAllTxids(): Promise<string[]>;

  backup(limit?: number, from?: any): Promise<TxnBackup>;

  restore(data: number[]): Promise<void>;

  /**
   * Retrieves transactions by their status up to a specified block number, with an optional limit on the number of transactions.
   * @param status - The status of the transactions to retrieve.
   * @param toBlock - The block number up to which to retrieve transactions.
   * @param limit - The maximum number of transactions to retrieve.
   * @returns A promise that resolves to an array of transactions matching the criteria.
   */
  getByStatus(status: TxnStatus, toBlock: number, limit: number): Promise<Txn[]>;

  /**
   * Stores a transaction.
   * @param txn - The transaction to store.
   * @returns A promise that resolves when the transaction is stored.
   */
  put(txn: Txn): Promise<void>;

  /**   * Stores multiple transactions.   * @param txns - An array of transactions to store.
   * @returns A promise that resolves when all transactions are stored.
   */
  putMany(txns: Txn[]): Promise<void>;

  /**
   * Checks if transactions exist by their IDs.
   * @param txids - An array of transaction IDs to check.
   * @returns A promise that resolves to an array of booleans indicating the existence of each transaction.
   */
  exists(txids: string[]): Promise<boolean[]>;
}
