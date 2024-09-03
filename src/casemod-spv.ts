import {
  isBroadcastResponse,
  MerklePath,
  Transaction,
  Utils,
  type BroadcastFailure,
  type BroadcastResponse,
} from "@bsv/sdk";
import type { TxoLookup, TxoResults } from "./models/search";
import {
  TxLog,
  type BlockHeaderService,
  type BroadcastService,
  type InventoryService,
  type SpendsService,
  type TxnService,
} from "./services";
import type { BlockStore, Txn, TxnStore, TxoStore } from "./stores";
import {
  Outpoint,
  Txo,
  TxoSort,
  type BlockHeader,
  type IndexContext,
  type Ingest,
} from "./models";
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
    startSync = false
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
      "The CaseModSPV instance has been destroyed!"
    );

    this.events.removeAllListeners();
  }

  async broadcast(
    tx: Transaction
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
    const tip = await this.getSyncedBlock();
    const isSynced = await this.stores.txos!.storage.getState("syncHeight");
    if (!isSynced) {
      const ingestQueue: { [txid: string]: Ingest } = {};
      for (const indexer of this.stores.txos!.indexers) {
        await indexer.sync(this.stores.txos!, ingestQueue);
      }
      this.stores.txos?.queue(Object.values(ingestQueue));
      for (const owner of this.stores.txos!.owners) {
        await this.stores.txos!.storage.setState(
          `sync-${owner}`,
          tip!.height.toString()
        );
      }
      await this.stores.txos!.storage.setState(
        "syncHeight",
        tip!.height.toString()
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
    from?: string
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
    fromRemote = false
  ): Promise<Transaction | undefined> {
    return this.stores.txns!.loadTx(txid, fromRemote);
  }

  async getRecentTxs(): Promise<TxLog[]> {
    return this.stores.txos!.storage.getRecentTxLogs(10);
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

  async getBackupTx(txid: string): Promise<number[] | undefined> {
    const txn = await this.stores.txns!.storage.get(txid);
    if (!txn) return;
    const writer = new Utils.Writer();
    writer.writeUInt32LE(4022206465);
    writer.writeVarIntNum(txn.proof ? 1 : 0);
    writer.write(txn.proof || []);
    writer.writeVarIntNum(txn.rawtx.length);
    writer.write(txn.rawtx);
    if (txn.proof) {
      writer.writeUInt8(1);
      writer.writeVarIntNum(0);
    } else {
      writer.writeUInt8(0);
    }
    return writer.toArray();
  }

  async restoreBlocks(headers: BlockHeader[]): Promise<void> {
    await this.stores.blocks!.storage.putMany(headers);
  }

  async restoreBackupTx(data: number[]): Promise<void> {
    const tx = Transaction.fromBEEF(data);
    await this.stores.txns!.saveTx(tx);
  }

  async getBackupLogs(): Promise<Ingest[]> {
    return this.stores.txos!.storage.getBackupLogs();
  }

  async restoreBackupLogs(logs: Ingest[]): Promise<void> {
    await this.stores.txos!.queue(logs);
    const lastHeight = logs.reduce((maxHeight, log) => {
      return Math.max(maxHeight, log.height);
    }, 0);
    for (const owner of this.stores.txos!.owners) {
      await this.stores.txos!.storage.setState(
        `sync-${owner}`,
        lastHeight.toString()
      );
    }

    await this.stores.txos!.storage.setState(
      "syncHeight",
      lastHeight.toString()
    );
  }
}
