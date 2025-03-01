import type { MerklePath, Transaction } from "@bsv/sdk";
import type { Txn } from "../stores";

export interface TxnService {
  fetchBeef(txid: string): Promise<Transaction>;
  fetchProof(txid: string): Promise<MerklePath | undefined>;
}
