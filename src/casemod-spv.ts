import {
  isBroadcastResponse,
  type BroadcastFailure,
  type BroadcastResponse,
  type Transaction,
} from "@bsv/sdk";
import type { TxoLookup, TxoResults } from "./models/search";
import type {
  BlockHeaderService,
  BroadcastService,
  InventoryService,
  SpendsService,
  TxnService,
} from "./services";
import type { BlockStore, TxnStore, TxoStore } from "./stores";
import type { BlockHeader, IndexContext, Outpoint, Txo } from "./models";
import { EventEmitter } from "./lib/event-emitter";

export type Network = "mainnet" | "testnet";

export interface Services {
  blocks : BlockHeaderService;
  txns : TxnService;
  broadcast : BroadcastService;
  inv : InventoryService;
  spends : SpendsService;
}

export interface Stores {
  blocks ?: BlockStore;
  txns ?: TxnStore;
  txos ?: TxoStore;
}

export class CaseModSPV {
  private interval : Timer | undefined;
  constructor(
    public services : Services,
    public stores : Stores,
    public events = new EventEmitter(),
    startSync = false,
  ) {
    if (startSync) this.sync();
  }

  async destroy() : Promise<void> {
    if (this.interval) clearInterval(this.interval);

    for (const store of Object.values(this.stores)) {
      if (store.destroy) {
        await store.destroy();
      }
    }
    this.events.emit(
      "destroyed",
      "The CaseModSPV instance has been destroyed!",
    );

    this.events.removeAllListeners();
  }

  async broadcast(
    tx : Transaction,
  ) : Promise<BroadcastResponse | BroadcastFailure> {
    const resp = await this.stores.txns!.broadcast(tx);
    if (isBroadcastResponse(resp)) {
      await this.stores.txos!.ingest(tx);
    }
    return resp;
  }

  async sync() : Promise<void> {
    await this.stores.blocks!.sync(true);
    this.events.emit("blocksSynced");
    const isSynced = await this.stores.txos!.storage.getState("isSynced");
    if (!isSynced) {
      for (const indexer of this.stores.txos!.indexers) {
        await indexer.sync(this.stores.txos!);
      }
      await this.stores.txos!.storage.setState(
        "isSynced",
        Date.now().toString(),
      );
      this.events.emit("txosSynced");
    }
    this.stores.blocks!.sync();
    this.stores.txos!.processQueue();
    // this.stores.txos!.syncTxLogs();
    if (this.interval) clearInterval(this.interval);
    // this.interval = setInterval(
    //   () => this.stores.txos!.syncTxLogs(),
    //   60 * 1000
    // );
  }

  async search(
    lookup : TxoLookup,
    limit = 100,
    from ?: string,
  ) : Promise<TxoResults> {
    return this.stores.txos!.search(lookup, limit, from);
  }

  async getTxo(outpoint : Outpoint) : Promise<Txo | undefined> {
    return this.stores.txos!.storage.get(outpoint);
  }

  async getTxos(outpoints : Outpoint[]) : Promise<(Txo | undefined)[]> {
    return this.stores.txos!.storage.getMany(outpoints);
  }

  async getTx(
    txid : string,
    fromRemote = false,
  ) : Promise<Transaction | undefined> {
    return this.stores.txns!.loadTx(txid, fromRemote);
  }

  // async parseTx(tx: Transaction): Promise<IndexContext> {
  //   // return this.services.txns!.parse(tx);
  // }

  async getSyncedBlock() : Promise<BlockHeader | undefined> {
    return this.stores.blocks!.storage.getSynced();
  }

  async getChaintip() : Promise<BlockHeader | undefined> {
    return this.services.blocks!.getChaintip();
  }
}
