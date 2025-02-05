import { Transaction } from "@bsv/sdk";
import type { Indexer } from "../models/indexer";
import { type IndexContext } from "../models/index-context";
import { Txo, TxoStatus } from "../models/txo";
import { type Ingest, IngestStatus } from "../models/ingest";
import { Block } from "../models/block";
import type { TxoStorage } from "../storage/txo-storage";
import { Outpoint } from "../models/outpoint";
import type { Services, Stores } from "../spv-store";
import type { EventEmitter } from "../lib/event-emitter";
import { ParseMode, TxoSort, type TxoLookup, type TxoResults } from "../models";
import type { TxSyncLog } from "../services";

export class TxoStore {
  private syncRunning: Promise<void> | undefined;
  private stopSync = false;
  constructor(
    public storage: TxoStorage,
    public services: Services,
    public stores: Stores,
    public indexers: Indexer[],
    public owners: Set<string>,
    public events?: EventEmitter,
  ) { }


  /**
   * Asynchronously destroys the current instance by stopping synchronization and 
   * destroying the associated storage.
   * 
   * @returns {Promise<void>} A promise that resolves when the instance is destroyed.
   */
  async destroy() {
    this.stopSync = true;
    if (this.syncRunning) await this.syncRunning;
    await this.storage.destroy();
  }

  /**
   * Searches for transaction outputs (TXOs) based on the provided lookup criteria.
   *
   * @param lookup - The criteria used to search for TXOs.
   * @param sort - The sorting order of the results. Defaults to `TxoSort.DESC`.
   * @param limit - The maximum number of results to return. Defaults to 100. 0 means no limit.
   * @param from - An optional parameter to specify the starting point for the search. Use for pagination.
   * @returns A promise that resolves to the search results.
   */
  public async search(
    lookup: TxoLookup,
    sort = TxoSort.DESC,
    limit = 100,
    from?: string,
  ): Promise<TxoResults> {
    return this.storage.search(lookup, sort, limit, from);
  }

  /**
   * Ingests a new transaction into the store, building an index context for it.
   * 
   * @param tx - The transaction to ingest.
   * @param source - An optional string indicating the source of the transaction.
   * @param parseMode - The mode to parse the transaction, default is `ParseMode.Persist`.
   * @param resolveParents - Whether to resolve parent transactions, default is `false`.
   * @param outputs - Optional array of output indices to process.
   * @returns A promise that resolves to the index context of the ingested transaction.
   * @throws Will throw an error if an input is missing its source transaction.
   */
  async ingest(
    tx: Transaction,
    source: string = "",
    parseMode = ParseMode.Persist,
    resolveParents = false,
    outputs?: number[],
  ): Promise<IndexContext> {
    const ctx = await this.buildIndexContext(tx);
    for (const input of tx.inputs.values()) {
      if (!input.sourceTXID) {
        if (!input.sourceTransaction) {
          throw new Error("Input missing source transaction");
        }
        input.sourceTXID = input.sourceTransaction.id("hex") as string;
      }
      let spend: Txo | undefined;
      if (input.sourceTransaction && parseMode == ParseMode.Deep) {
        const sourceCtx = await this.ingest(
          input.sourceTransaction,
          "beef",
          parseMode,
          false,
        );
        spend = sourceCtx.txos[input.sourceOutputIndex];
      } else {
        spend = await this.storage.get(new Outpoint(input.sourceTXID, input.sourceOutputIndex));
        if ((!spend || spend.script.length == 0)) {
          if (resolveParents) {
            const sourceTx = await this.stores.txns!.loadTx(input.sourceTXID, true);
            if (!sourceTx) {
              throw new Error(`Failed to load source tx: ${input.sourceTXID}`);
            }
            const spendCtx = await this.ingest(sourceTx, "ancestor", ParseMode.Dependency, false, [input.sourceOutputIndex]);
            spend = spendCtx.txos[input.sourceOutputIndex]
          } else {
            spend = new Txo(
              new Outpoint(input.sourceTXID!, input.sourceOutputIndex),
              0n,
              [],
              TxoStatus.Dependency,
            );
          }
        }
      }
      spend.spend = ctx.txid;
      ctx.spends.push(spend);
    }

    const txos = await this.storage.getMany(
      tx.outputs.map((_, i) => new Outpoint(ctx.txid, i)),
    );
    for (const [vout, output] of tx.outputs.entries()) {
      let txo = txos[vout];
      if (!txo) {
        txo = new Txo(
          new Outpoint(ctx.txid, vout),
          0n,
          [],
          parseMode == ParseMode.Dependency || (outputs && !outputs.includes(vout)) ?
            TxoStatus.Dependency :
            TxoStatus.Validated,
        );
      }
      txo.satoshis = BigInt(output.satoshis!);
      txo.script = output.lockingScript.toBinary();
      ctx.txos.push(txo);
      for (const i of this.indexers) {
        try {
          const data = i.parse && (await i.parse(ctx, vout, parseMode));
          if (data) {
            txo.data[i.tag] = data;
          }
        } catch (e) {
          console.error("indexer error: continuing", i.tag, e);
        }
      }
    }

    for (const i of this.indexers) {
      i.preSave && await i.preSave(ctx)
    }

    if (parseMode == ParseMode.Preview) return ctx
    await this.storage.putMany(ctx.spends);
    ctx.txos.forEach((txo) => {
      txo.block = ctx.block;
    });

    await this.storage.putMany(ctx.txos);
    if (Object.keys(ctx.summary).length) {
      this.storage.putTxLog({
        txid: ctx.txid,
        height: ctx.block.height,
        idx: Number(ctx.block.idx),
        summary: ctx.summary,
        source,
      });
    }

    const toQueue = Object.entries(ctx.queue);
    if (toQueue.length) {
      await this.queue(toQueue.map(([txid, block]) => ({
        txid: txid,
        height: block.height,
        idx: Number(block.idx),
        source: "ancestor",
        parseMode: ParseMode.Dependency,
      })));
    }

    return ctx;
  }

  async updateQueueStats() {
    const queueLength = await this.storage.getQueueLength();
    this.events?.emit("queueStats", { length: queueLength });
  }

  async queue(ingests: Ingest[]) {
    ingests.forEach((i) => (i.status = i.status || IngestStatus.QUEUED));
    await this.storage.putIngests(ingests);
  }

  async processQueue() {
    if (this.syncRunning) return;

    await this.updateQueueStats();
    this.syncRunning = Promise.all([
      this.processDownloads(),
      this.processIngests(),
      this.processConfirms(),
      this.processImmutable(),
    ]).then(() => { });
  }

  async processDownloads(): Promise<void> {
    try {
      const ingests = await this.storage.getIngests(IngestStatus.QUEUED, 25);
      if (ingests.length) {
        const dels: string[] = []
        const updates: Ingest[] = []
        for (const ingest of ingests) {
          try {
            await this.stores.txns!.loadTx(ingest.txid, true);
            if (ingest.downloadOnly) {
              dels.push(ingest.txid)
            } else {
              ingest.status = IngestStatus.DOWNLOADED;
              updates.push(ingest)
            }
          } catch (e) {
            console.error("Failed to download tx", ingest.txid, e);
          }
        }
        if (dels.length) {
          await this.storage.delIngests(dels)
        }
        if (updates.length) {
          await this.storage.putIngests(updates);
        }
        await this.updateQueueStats();
      } else {
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (e) {
      console.error("Failed to ingest txs", e);
      await new Promise((r) => setTimeout(r, 15000));
    }
    if (this.stopSync) {
      return;
    }
    return this.processDownloads();
  }

  async processIngests(): Promise<void> {
    try {
      const ingests = await this.storage.getIngests(
        IngestStatus.DOWNLOADED,
        25,
      );
      if (ingests.length) {
        console.log("Ingesting", ingests.length, "txs");
        for await (const ingest of ingests) {
          try {
            const tx = await this.stores.txns!.loadTx(ingest.txid);
            if (!tx) {
              console.error("Failed to get tx", ingest.txid);
              continue;
            }
            await this.ingest(tx, ingest.source, ingest.parseMode, true, ingest.outputs);
            ingest.status = IngestStatus.INGESTED;
            await this.storage.putIngest(ingest);
            await this.updateQueueStats();
          } catch (e) {
            console.error("Failed to ingest tx", ingest.txid, e);
          }
        }
      } else {
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (e) {
      console.error("Failed to ingest txs", e);
      await new Promise((r) => setTimeout(r, 1000));
    }
    if (this.stopSync) {
      return;
    }
    return this.processIngests();
  }

  async processConfirms(): Promise<void> {
    try {
      const ingests = await this.storage.getIngests(
        IngestStatus.INGESTED,
        25,
        0,
        Date.now() - 15000,
      );
      if (ingests.length) {
        for await (const ingest of ingests) {
          const tx = await this.stores.txns!.loadTx(ingest.txid, true);
          if (!tx) {
            console.error("Failed to get tx", ingest.txid);
            continue;
          }
          if (!tx.merklePath) {
            ingest.height = Date.now();
          } else {
            const ctx = await this.ingest(tx, ingest.source, ingest.parseMode, true, ingest.outputs);
            ingest.status = IngestStatus.CONFIRMED;
            ingest.height = ctx.block.height;
            ingest.idx = Number(ctx.block.idx);
          }
          await this.storage.putIngest(ingest);
        }
      } else {
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (e) {
      console.error("Failed to ingest txs", e);
      await new Promise((r) => setTimeout(r, 1000));
    }
    if (this.stopSync) {
      return;
    }
    return this.processConfirms();
  }

  async processImmutable(): Promise<void> {
    try {
      const chaintip = await this.stores.blocks!.storage.getSynced();
      if (!chaintip) {
        await new Promise((r) => setTimeout(r, 10000));
        this.processImmutable();
        return;
      }
      const ingests = await this.storage.getIngests(
        IngestStatus.CONFIRMED,
        25,
        0,
        chaintip?.height - 6,
      );
      if (ingests.length) {
        for await (const ingest of ingests) {
          const tx = await this.stores.txns!.loadTx(ingest.txid, true);
          if (!tx || !tx.merklePath) {
            // TODO: We have a problem and need to clean it up
            console.error("Failed to get tx", ingest.txid);
            continue;
          }
          if (!tx.merklePath.verify(ingest.txid, this.stores.blocks!)) {
            continue;
          }
          ingest.status = IngestStatus.IMMUTABLE;
          await this.storage.putIngest(ingest);
        }
      } else {
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (e) {
      console.error("Failed to ingest txs", e);
      await new Promise((r) => setTimeout(r, 1000));
    }
    if (this.stopSync) {
      return;
    }
    return this.processImmutable();
  }

  async syncTxLogs() {
    if (!this.services.account) return
    let syncedState = await this.storage.getState("lastSync");
    if (!syncedState) {
      console.log("No initial sync. Skipping sync for", this.services.account.accountId);
      return;
    };
    let lastSync = Number(syncedState || 0);
    console.log("Syncing logs from", lastSync, "for", this.services.account.accountId);
    const txSyncs = await this.services.account?.syncTxLogs(lastSync) || [];
    const oldLogs = await this.storage.getTxLogs(
      txSyncs.map((log) => log.txid),
    );
    const puts: TxSyncLog[] = [];
    for (const [i, txLog] of txSyncs.entries()) {
      if (!oldLogs[i]) {
        puts.push(txLog);
        if (txLog.score) {
          lastSync = Math.max(lastSync, txLog.score);
        }
      }
    }
    console.log("Queueing new logs:", puts);
    const ingestsByTxid = new Map<string, Ingest>();
    for (const put of puts) {
      const ingest = ingestsByTxid.get(put.txid)
      if (ingest) {
        ingest.outputs!.push(put.idx);
      } else {
        ingestsByTxid.set(put.txid, {
          txid: put.txid,
          height: put.height,
          idx: 0,
          source: "sync",
          parseMode: ParseMode.Persist,
        });
      }
    }
    await this.queue(puts.map((p) => ({
      txid: p.txid,
      height: Number(p.height),
      idx: Number(p.idx || 0),
      outputs: p.outs,
      source: "sync",
      parseMode: ParseMode.Persist,
    })));
    if (puts.length) {
      this.events?.emit("newTxs", puts.length)
    }
    await this.storage.setState("lastSync", lastSync.toString());
  }

  async buildIndexContext(tx: Transaction): Promise<IndexContext> {
    const ctx: IndexContext = {
      tx,
      txid: tx.id("hex"),
      block: new Block(),
      txos: [],
      spends: [],
      queue: {},
      summary: {},
    };
    if (tx.merklePath) {
      if (await tx.merklePath.verify(ctx.txid, this.stores.blocks!)) {
        ctx.block.height = tx.merklePath.blockHeight;
        ctx.block.idx = BigInt(tx.merklePath.path[0].find((p) => p.hash == ctx.txid)!.offset || 0);
      }
    }
    return ctx
  }

  async resolveBlock() {
    const chaintip = await this.services.blocks.getChaintip();
    if (!chaintip) return;
    for (const indexer of this.stores.txos!.indexers) {
      await indexer.resolve(this.stores.txos!, chaintip);
    }
  }

  async refreshSpends() {
    if (!this.services.account) return;
    const utxos = await this.storage.getUtxos();
    for (let i = 0; i < utxos.length; i += 50) {

      const outpoints = utxos.slice(i, i + 50).map((txo) => txo.outpoint.toString())
      const spends = await this.services.account.spends(outpoints)
      for (const [j, spend] of spends.entries()) {
        const txo = utxos[i + j];
        if (spend) {
          txo.spend = spend;
          await this.storage.put(txo)
        }
      }
    }
  }
}
