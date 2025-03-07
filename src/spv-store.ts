import {
  isBroadcastResponse,
  Transaction,
  Utils,
  type BroadcastFailure,
  type BroadcastResponse,
} from "@bsv/sdk";
import type { TxoLookup, TxoResults } from "./models/search";
import {
  type AccountService,
  type BlockHeaderService,
  type BroadcastService,
  type TxnService,
  type TxSyncLog,
} from "./services";
import type { BlockStore, Txn, TxnStore, TxoStore } from "./stores";
import {
  Outpoint,
  ParseMode,
  TxLog,
  Txo,
  TxoSort,
  type BlockHeader,
  type IndexContext,
  type Ingest,
} from "./models";
import { EventEmitter } from "./lib/event-emitter";
import type { TxnBackup, TxoBackup } from "./storage";

export type Network = "mainnet" | "testnet";

export interface Services {
  account?: AccountService;
  blocks: BlockHeaderService;
  txns?: TxnService;
  broadcast: BroadcastService;
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
    startSync = false,
    public syncTags?: Set<string>,
    public parseMode?: ParseMode,
    public subscribe = false,
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
    source = "",
  ): Promise<BroadcastResponse | BroadcastFailure> {
    let resp: BroadcastResponse | BroadcastFailure;
    if (!tx.merklePath) {
      await this.stores.txns!.populateTx(tx, true);
      resp = await this.stores.txns!.broadcast(tx);
    } else {
      resp = {
        status: 'success',
        txid: tx.id('hex'),
        message: ''
      }
    }
    if (isBroadcastResponse(resp)) {
      await this.stores.txos!.ingest(tx, source, ParseMode.Persist);
    }
    return resp;
  }

  async ingestTxs(txs: Transaction[]): Promise<void> {
    const ingests: Ingest[] = []
    for (const tx of txs) {
      await this.stores.txns?.saveTx(tx);
      const txid = tx.id("hex");

      ingests.push({
        txid,
        height: tx.merklePath?.blockHeight || Date.now(),
        idx: tx.merklePath?.path[0].find((p) => p.hash == txid)?.offset || 0,
        source: "sync",
        parseMode: ParseMode.Persist,
      });
    }
  }

  async ingestIfNew(ingests: Ingest[]): Promise<void> {
    for (const ingest of ingests) {
      let existing = await this.stores.txos!.storage.getIngest(ingest.txid);
      if(!existing) {
        await this.stores.txos!.queue([ingest]);
      }
    }
  }

  async ingest(ingests: Ingest[]): Promise<void> {
    await this.stores.txos?.queue(ingests);
  }

  async refreshSpends(): Promise<void> {
    return this.stores.txos!.refreshSpends();
  }

  async sync(resync = false, parseMode = this.parseMode): Promise<void> {
    await this.stores.blocks!.sync(true);
    this.events.emit("blocksSynced");
    await this.services.account?.register([...this.stores.txos?.owners || []]);
    const isSynced = await this.stores.txos!.storage.getState("lastSync");

    console.log("Syncing wallet", isSynced);
    if (!isSynced || resync) {
      const ingestQueue: { [txid: string]: Ingest } = {};
      let lastSync = 1;

      for (const indexer of this.stores.txos!.indexers) {
        if (this.syncTags && !this.syncTags.has(indexer.tag)) continue;
        this.events.emit("importing", { tag: indexer.tag, name: indexer.name });
        const score = await indexer.sync(this.stores.txos!, ingestQueue, parseMode);
        lastSync = Math.max(lastSync, score);
      }
      await this.stores.txos?.queue(Object.values(ingestQueue));
      await this.stores.txos!.storage.setState("lastSync", lastSync.toString());
      this.events.emit("txosSynced");
    }

    // This does not work in a service worker and should be disabled
    if (!resync) {
      if (this.subscribe) {
        this.services.account?.subscribe(async (topic, data: string) => {
          switch (topic) {
            case "tx":
              const txSyncLog = JSON.parse(data) as TxSyncLog;
              this.stores.txos!.queue([{
                txid: txSyncLog.txid,
                height: Number(txSyncLog.height),
                idx: Number(txSyncLog.idx || 0),
                outputs: txSyncLog.outs,
                source: "sync",
                parseMode: ParseMode.Persist,
              }])
              break;
            case "block":
              this.stores.blocks!.sync(true);
              break;
          }
        });
      }

      this.stores.blocks!.sync(false);
      this.stores.txns!.processQueue();
      this.stores.txos!.processQueue();
      await this.stores.txos!.syncTxLogs();
      if (this.interval) clearInterval(this.interval);
      this.interval = setInterval(
        () => this.stores.txos!.syncTxLogs(),
        60 * 1000
      );
      this.stores.txos!.resolveBlock();
      this.events.on("syncedBlockHeight", async () => {
        this.stores.txos!.resolveBlock();
      });
    }
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

  async getTx(
    txid: string,
  ): Promise<Transaction | undefined> {
    return this.stores.txns!.loadTx(txid, false);
  }

  async getRecentTxs(limit = 100): Promise<TxLog[]> {
    return this.stores.txos!.storage.getRecentTxLogs(limit);
  }

  async parseTx(tx: Transaction): Promise<IndexContext> {
    await this.stores.txns!.populateTx(tx, false);
    return this.stores.txos!.ingest(tx, "", ParseMode.Preview)
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

  async backupTxos(limit = 1000, from?: any): Promise<TxoBackup> {
    return this.stores.txos!.backup(limit, from);
    
  }
  
  async restoreTxos(txos: any[]): Promise<void> {
    await this.stores.txos!.restore(txos);
  }

  async backupTxns(limit = 1000, from?: any): Promise<TxnBackup> {
    return this.stores.txns!.storage.backup(limit, from);
  }

  async restoreTxns(data: number[]): Promise<void> {
    await this.stores.txns!.storage.restore(data);
  }
}
