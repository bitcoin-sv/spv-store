import { OneSatProvider } from "../providers/1sat-provider";
import {
  CaseModSPV,
  type Network,
  type Services,
  type Stores,
} from "../casemod-spv";
import type { Indexer } from "../models/indexer";
import { BlockStorageIDB, TxnStorageIDB, TxoStorageIDB } from "../storage/idb";
import { BlockStore, TxnStore, TxoStore } from "../stores";
import { EventEmitter } from "../lib/event-emitter";

export class OneSatWebSPV extends CaseModSPV {
  private constructor(
    public services: Services,
    public stores: Stores,
    public events: EventEmitter,
    startSync = false,
  ) {
    super(services, stores, events, startSync);
  }

  static async init(
    accountId: string,
    indexers: Indexer[],
    owners = new Set<string>(),
    startSync = false,
    network: Network = "mainnet",
  ) {
    const oneSatService = new OneSatProvider(network);
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

    return new CaseModSPV(services, stores, emitter, startSync);
  }
}
