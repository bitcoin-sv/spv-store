import type { Txn } from "../stores";

export interface TxnService {
  fetchTxn(txid: string): Promise<Txn>;
  // fetchTxns(txids: string[]): Promise<Txn[]>;
  fetchProof(txid: string): Promise<number[] | undefined>;
}
