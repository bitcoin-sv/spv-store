import type { Ordinal } from "../indexers/remote-types";

export interface TxSyncLog {
    txid: string,
    height: number,
    idx: number,
    outs: number[],
    score: number,
}

export interface AccountService {
    accountId?: string;
    register(addresses: string[]): Promise<void>;
    syncTxLogs(from: number): Promise<TxSyncLog[]>;
    subscribed(): boolean;
    subscribe(cb: (topic: string, data: string) => void ): void;
    unsubscribe(): void;
    utxos(): Promise<Ordinal[]>;
    spends(outpoints: string[]): Promise<string[]>;
}