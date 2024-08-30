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
  TxLog,
  TxnService,
} from "./services";
import type { BlockStore, TxnStore, TxoStore } from "./stores";
import { Txo, TxoSort, type BlockHeader, type IndexContext, type Outpoint } from "./models";
import { EventEmitter } from "./lib/event-emitter";

export type Network = "mainnet" | "testnet";

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

export class CaseModSPV {
  private interval: Timer | undefined;
  constructor(
    public services: Services,
    public stores: Stores,
    public events = new EventEmitter(),
    startSync = false,
  ) {
    if (startSync) this.sync();
  }

  async destroy(): Promise<void> {
    if (this.interval) clearInterval(this.interval);

    await this.stores.txos?.destroy();
    await this.stores.blocks?.destroy();
    await this.stores.txns?.destroy();

    this.events.emit(
      "destroyed",
      "The CaseModSPV instance has been destroyed!",
    );

    this.events.removeAllListeners();
  }

  async broadcast(
    tx: Transaction,
  ): Promise<BroadcastResponse | BroadcastFailure> {
    const resp = await this.stores.txns!.broadcast(tx);
    if (isBroadcastResponse(resp)) {
      await this.stores.txos!.ingest(tx);
    }
    return resp;
  }

  async sync(): Promise<void> {
    await this.stores.blocks!.sync(true);
    this.events.emit("blocksSynced");
    const isSynced = await this.stores.txos!.storage.getState("isSynced");
    if (!isSynced) {
      for (const indexer of this.stores.txos!.indexers) {
        await indexer.sync(this);
      }
      await this.stores.txos!.storage.setState(
        "isSynced",
        Date.now().toString(),
      );
      this.events.emit("txosSynced");
    }
    this.stores.blocks!.sync();
    this.stores.txns!.processQueue();
    this.stores.txos!.processQueue();
    await this.stores.txos!.syncTxLogs();
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(
      () => this.stores.txos!.syncTxLogs(),
      60 * 1000
    );
  }

  async search(
    lookup: TxoLookup,
    sort = TxoSort.DESC,
    limit = 100,
    from?: string,
  ): Promise<TxoResults> {
    return this.stores.txos!.search(lookup, sort, limit, from);
  }

  async getTxo(outpoint: Outpoint): Promise<Txo | undefined> {
    return this.stores.txos!.storage.get(outpoint);
  }

  async getTxos(outpoints: Outpoint[]): Promise<(Txo | undefined)[]> {
    return this.stores.txos!.storage.getMany(outpoints);
  }

  async getTxids(): Promise<string[]> {
    return this.stores.txns!.storage.getTxids();
  }

  async getTx(
    txid: string,
    fromRemote = false,
  ): Promise<Transaction | undefined> {
    return this.stores.txns!.loadTx(txid, fromRemote);
  }

  async getRecentTxs(): Promise<TxLog[]> {
    return this.stores.txos!.storage.getTxLogs(10);
  }
  async parseTx(tx: Transaction): Promise<IndexContext> {
    return this.stores.txos!.parse(tx, true);
  }

  async getSyncedBlock(): Promise<BlockHeader | undefined> {
    return this.stores.blocks!.storage.getSynced();
  }

  async getBlock(height: number): Promise<BlockHeader | undefined> {
    return this.stores.blocks!.storage.getByHeight(height);
  }

  async getAllBlocks(): Promise<BlockHeader[]> {
    return this.stores.blocks!.storage.getAll();
  }

  async getChaintip(): Promise<BlockHeader | undefined> {
    return this.services.blocks!.getChaintip();
  }
}
