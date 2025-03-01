import type { Ordinal } from "../indexers/remote-types";

export interface TxSyncLog {
    txid: string
    height: number
    idx: number
    outs: number[]
    score: number
}

export interface Query {
    tag?: string
    id?: string
    value?: string
    tags?: string[]
    unspent?: boolean
    spend?: boolean
    limit?: number
    from?: number
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
    search(query: Query): Promise<Ordinal[]>;
}