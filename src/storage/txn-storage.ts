import type { Txn, TxnStatus } from "../stores";

export interface TxnStorage {
  destroy(): Promise<void>;
  get(txid: string): Promise<Txn | undefined>;
  getMany(txids: string[]): Promise<(Txn | undefined)[]>;
  getByStatus(status: TxnStatus, toBlock: number, limit: number): Promise<Txn[]>
  put(txn: Txn): Promise<void>;
  putMany(txns: Txn[]): Promise<void>;
  exists(txids: string[]): Promise<boolean[]>;
}
