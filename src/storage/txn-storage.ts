import type { Transaction } from "@bsv/sdk";

export interface TxnStorage {
    destroy(): void;
    get(txid: string): Promise<Transaction | undefined>;
    getMany(txids: string[]): Promise<(Transaction | undefined)[]>;
    put(tx: Transaction): Promise<void>;
    putMany(txs: Transaction[]): Promise<void>;
    exists(txids: string[]): Promise<boolean[]>;
}