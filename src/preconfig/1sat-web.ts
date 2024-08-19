import EventEmitter from "events";
import { OneSatService } from "../1sat-service/1sat-service";
import { CaseModSPV, type Network, type Services, type Stores } from "../case-mod-spv";
import type { Indexer } from "../models/indexer";
import { BlockStorageIDB } from "../storage/idb/idb-blocks";
import { TxnStorageIDB } from "../storage/idb/idb-txns";
import { TxoStorageIDB } from "../storage/idb/idb-txos";
import { BlockStore } from "../blocks/block-store";
import { TxnStore } from "../txn-store/txn-store";
import { TxoStore } from "../txo-store/txo-store";

export async function initialize1SatWeb(
    accountId: string,
    indexers: Indexer[],
    owners = new Set<string>(),
    network: Network = 'mainnet',
): Promise<CaseModSPV> {
    const oneSatService = new OneSatService(network);
    const emitter = new EventEmitter();
    const services: Services = {
        blocks: oneSatService,
        txns: oneSatService,
        broadcast: oneSatService,
        inv: oneSatService,
        spends: oneSatService,
    };
    const [blockStorage, txnStorage, txoStorage] = await Promise.all([
        BlockStorageIDB.init(network),
        TxnStorageIDB.init(network),
        TxoStorageIDB.init(accountId, indexers, network),
    ]);

    const stores: Stores = {}
    stores.blocks = new BlockStore(
        blockStorage,
        services,
        emitter
    );
    stores.txns = new TxnStore(
        txnStorage,
        services,
        stores,
        emitter
    );
    stores.txos = new TxoStore(
        txoStorage,
        services,
        stores,
        indexers,
        owners,
        emitter,
    );

    return new CaseModSPV(services, stores, emitter, true);
};
