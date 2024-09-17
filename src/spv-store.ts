import {
  isBroadcastResponse,
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
  blockHeaderFromReader,
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

export class SPVStore {
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
      "The SPVStore instance has been destroyed!"
    );

    this.events.removeAllListeners();
  }

  async broadcast(
    tx: Transaction,
    source = ""
  ): Promise<BroadcastResponse | BroadcastFailure> {
    const resp = await this.stores.txns!.broadcast(tx);
    if (isBroadcastResponse(resp)) {
      await this.stores.txos!.ingest(tx, source);
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

  async getChaintip(): Promise<BlockHeader | undefined> {
    return this.services.blocks!.getChaintip();
  }

  async getBackupTx(txid: string): Promise<number[] | undefined> {
    const txn = await this.stores.txns!.storage.get(txid);
    if (!txn) return;
    const writer = new Utils.Writer();
    writer.writeInt8(Number(txn.status));
    writer.writeUInt32LE(txn.block.height);
    writer.writeUInt64LE(Number(txn.block.idx));
    writer.writeVarIntNum(txn.rawtx.length);
    writer.write(txn.rawtx);
    writer.writeVarIntNum(txn.proof?.length || 0);
    if (txn.proof) {
      writer.write(txn.proof);
    }
    return writer.toArray();
  }

  async getBlocksBackup(): Promise<number[][]> {
    return await this.stores.blocks!.storage.getBackup();
  }

  async restoreBlocks(data: number[]): Promise<void> {
    const reader = new Utils.Reader(data);
    let headers: BlockHeader[] = [];
    while (reader.pos < data.length) {
      headers.push(blockHeaderFromReader(reader));
    }
    await this.stores.blocks!.storage.putMany(headers);
  }

  async restoreBackupTx(txid: string, data: number[]): Promise<void> {
    const reader = new Utils.Reader(data);
    const status = reader.readInt8();
    const height = reader.readUInt32LE();
    const idx = reader.readUInt64LEBn();
    let len = reader.readVarIntNum();
    const txn: Txn = {
      txid,
      status: status as any,
      block: { height, idx: BigInt(idx.toNumber()) },
      rawtx: reader.read(len),
    };
    len = reader.readVarIntNum();
    if (len) txn.proof = reader.read(len);
    await this.stores.txns!.storage.put(txn);
  }

  async getBackupLogs(): Promise<Ingest[]> {
    return this.stores.txos!.storage.getBackupLogs();
  }

  async restoreBackupLogs(logs: Ingest[]): Promise<void> {
    await this.stores.txos!.queue(logs);
    let lastHeight = 0;
    for (const log of logs) {
      if (log.height > lastHeight && log.height < 50000000) {
        lastHeight = log.height;
      }
    }
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
