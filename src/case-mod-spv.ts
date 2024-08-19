import { isBroadcastResponse, type BroadcastFailure, type BroadcastResponse, type Transaction } from "@bsv/sdk";
import EventEmitter from "events";
import type { TxoLookup, TxoResults } from "./models/search";
import type { BlockHeaderService } from "./blocks/block-service";
import type { TxnService } from "./txn-store/txn-service";
import type { BroadcastService } from "./broadcast/broadcast-service";
import type { InventoryService } from "./inv-service/inv-service";
import type { SpendsService } from "./spends-service/spends-service";
import type { BlockStore } from "./blocks/block-store";
import type { TxnStore } from "./txn-store/txn-store";
import type { TxoStore } from "./txo-store/txo-store";

export type Network = 'mainnet' | 'testnet';

export interface Services {
    blocks: BlockHeaderService;
    txns: TxnService;
    broadcast: BroadcastService;
    inv: InventoryService;
    spends: SpendsService;
}

export interface Stores {
    blocks?: BlockStore;
    txns?: TxnStore;
    txos?: TxoStore;
}

export class CaseModSPV extends EventEmitter {
    private interval: Timer | undefined;
    private syncInProgress = false;
    constructor(
        public services: Services,
        public stores: Stores,
        public events = new EventEmitter(),
        startSync = false,
    ) {
        super();
        if (startSync) this.sync();
    }

    async destroy(): Promise<void> {
        if (this.interval) clearInterval(this.interval);
        Object.values(this.stores).forEach((store) => store.destroy());
        this.removeAllListeners();
    }

    async broadcast(tx: Transaction): Promise<BroadcastResponse | BroadcastFailure> {
        const resp = await this.stores.txns!.broadcast(tx);
        if (isBroadcastResponse(resp)) {
            await this.stores.txos!.ingest(tx);
        }
        return resp;
    }

    async sync(): Promise<void> {
        await this.stores.blocks!.sync(true);
        this.events.emit('blocksSynced');
        const isSynced = await this.stores.txos!.storage.getState('isSynced');
        if (!isSynced) {
            for (const indexer of this.stores.txos!.indexers) {
                await indexer.sync(this);
            }
            await this.stores.txos!.storage.setState('isSynced', Date.now().toString());
            this.events.emit('txosSynced');
        }
        this.stores.txos!.processQueue();
        this.interval = setInterval(() => this.stores.txos!.syncTxLogs, 60 * 1000);
        this.stores.blocks!.sync();
    }

    async search(lookup: TxoLookup, limit = 100, from?: string): Promise<TxoResults> {
        return this.stores.txos!.storage.search(lookup, limit, from);
    }
}