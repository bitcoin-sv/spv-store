import EventEmitter from "events";
import { OneSatService } from "../1sat-service/1sat-service";
import {
  CaseModSPV,
  type Network,
  type Services,
  type Stores,
} from "../case-mod-spv";
import type { Indexer } from "../models/indexer";
import { BlockStorageIDB, TxnStorageIDB, TxoStorageIDB } from "../storage/idb";
import { BlockStore, TxnStore, TxoStore } from "../stores";

export async function initialize1SatWeb(
  accountId: string,
  indexers: Indexer[],
  owners = new Set<string>(),
  network: Network = "mainnet",
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

  const stores: Stores = {};
  stores.blocks = new BlockStore(blockStorage, services, emitter);
  stores.txns = new TxnStore(txnStorage, services, stores, emitter);
  stores.txos = new TxoStore(
    txoStorage,
    services,
    stores,
    indexers,
    owners,
    emitter,
  );

  return new CaseModSPV(services, stores, emitter, true);
}
