import { Beef, Transaction } from "@bsv/sdk";
import type { Indexer } from "../models/indexer";
import { type IndexContext } from "../models/index-context";
import { Txo, TxoStatus } from "../models/txo";
import { type Ingest, IngestStatus } from "../models/ingest";
import { Block } from "../models/block";
import type { TxoStorage } from "../storage/txo-storage";
import { Outpoint } from "../models/outpoint";
import type { Services, Stores } from "../spv-store";
import type { EventEmitter } from "../lib/event-emitter";
import { ParseMode, TxoSort, UnmetDependency, type TxoLookup, type TxoResults } from "../models";

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
  async search(
    lookup: TxoLookup,
    sort = TxoSort.DESC,
    limit = 100,
    from?: string,
  ): Promise<TxoResults> {
    return this.storage.search(lookup, sort, limit, from);
  }

  async loadTx(txid: string): Promise<Transaction> {
    return this.stores.txns!.loadTx(txid);
  }


  async populateTx(tx: Transaction): Promise<void> {
    const txid = tx.id("hex");
    if (!tx.merklePath || (await tx.merklePath.verify(txid, this.stores.blocks!))) {
      tx.merklePath = await this.services.txns!.fetchProof(tx.id("hex"));
    }
    if (tx.merklePath) {
      if ((await tx.merklePath.verify(txid, this.stores.blocks!))) {
        return;
      } else {
        throw new Error("Invalid merkle proof");
      }
    } else {
      for (const input of tx.inputs) {
        if (input.sourceTXID) {
          input.sourceTransaction = await this.loadTx(input.sourceTXID)
        }
      }
    }
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
    outputs?: Set<number>,
  ): Promise<IndexContext> {
    const beef = Beef.fromBinary(tx.toAtomicBEEF());
    if (!await beef.verify(this.stores.blocks!)) {
      throw new Error("Invalid transaction proof");
    }
    const ctx = await this.buildIndexContext(tx);
    for (const input of tx.inputs.values()) {
      if (!input.sourceTXID) {
        if (!input.sourceTransaction) {
          throw new Error("Input missing source transaction");
        }
        input.sourceTXID = input.sourceTransaction.id("hex") as string;
      }

      const outpoint = new Outpoint(input.sourceTXID, input.sourceOutputIndex)
      let spend = await this.storage.get(outpoint);
      if (!spend) {
        if (input.sourceTransaction) {
          const context = await this.ingest(
            input.sourceTransaction, "beef",
            parseMode == ParseMode.PersistSummary ? ParseMode.Persist : parseMode,
            new Set([input.sourceOutputIndex])
          );
          spend = context.txos[input.sourceOutputIndex];
        } else {
          spend = new Txo(
            new Outpoint(input.sourceTXID, input.sourceOutputIndex),
            0n,
            [],
            TxoStatus.Dependency,
          );
        }
      }

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
          TxoStatus.Dependency,
        );
      }
      txo.satoshis = BigInt(output.satoshis!);
      txo.script = output.lockingScript.toBinary();
      txo.status = parseMode == ParseMode.Dependency || (outputs && !outputs.has(vout)) ?
        TxoStatus.Dependency :
        TxoStatus.Validated;
      ctx.txos.push(txo);
      let outputParseMode = parseMode;
      if (outputs && !outputs.has(vout)) {
        // TODO: Should this include Preview?
        if (parseMode == ParseMode.PersistSummary) {
          outputParseMode = ParseMode.Dependency
        } else {
          continue;
        }
      }
      for (const i of this.indexers) {
        const data = i.parse && (await i.parse(ctx, vout, outputParseMode));
        if (data) {
          txo.data[i.tag] = data;
        }
      }
    }

    for (let [vin, spend] of ctx.spends.entries()) {
      spend.spend = ctx.txid;
      if (!spend.script.length) {
        if ([ParseMode.Preview, ParseMode.PersistSummary].includes(parseMode)) {
          ctx.spends[vin] = await this.resolveOutput(spend.outpoint, ParseMode.OutputsOnly)
        }
      }
    };

    for (const i of this.indexers) {
      const summery = await i.summerize(ctx, parseMode);
      if (summery) {
        ctx.summary[i.tag] = summery;
      }
    }

    if ([ParseMode.OutputsOnly, ParseMode.Preview].includes(parseMode)) return ctx
    await this.storage.putMany(ctx.spends);
    ctx.txos.forEach((txo) => txo.block = ctx.block);

    await this.storage.putMany(
      ctx.txos.filter(t => parseMode == ParseMode.PersistSummary || !outputs || outputs.has(t.outpoint.vout))
    );

    if ([ParseMode.Persist, ParseMode.PersistSummary].includes(parseMode) && Object.keys(ctx.summary).length) {
      this.storage.putTxLog({
        txid: ctx.txid,
        height: ctx.block.height,
        idx: Number(ctx.block.idx),
        summary: ctx.summary,
        source,
      });
    }

    this.stores.txns!.saveTx(tx);
    return ctx;
  }

  async queueDependency(outpoint: Outpoint, parseMode = ParseMode.Dependency) {
    const tx = await this.loadTx(outpoint.txid);
    const block = new Block();
    if (tx?.merklePath) {
      block.height = tx.merklePath.blockHeight;
      block.idx = BigInt(tx.merklePath.path[0].find((p) => p.hash == outpoint.txid)?.offset || 0);
    }
    await this.queue([{
      txid: outpoint.txid,
      height: block.height,
      idx: Number(block.idx),
      parseMode,
      source: 'dependency',
      outputs: [outpoint.vout],
      status: IngestStatus.QUEUED,
    }])
  }

  async resolveOutput(outpoint: Outpoint, parseMode: ParseMode = ParseMode.Dependency): Promise<Txo> {
    const tx = await this.stores.txns!.loadTx(outpoint.txid);
    if (!tx) throw new Error(`missing-tx-${outpoint.txid}`);
    this.events?.emit("resolvingParent", { txid: outpoint.txid });
    const context = await this.ingest(tx, "input", parseMode, new Set([outpoint.vout]));
    return context.txos[outpoint.vout];
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
      this.processIngests(),
      this.processConfirms(),
      this.processImmutable(),
    ]).then(() => { });
  }

  async processIngests(): Promise<void> {
    try {
      const ingests = await this.storage.getIngests(
        IngestStatus.QUEUED,
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
            await this.ingest(tx, ingest.source, ingest.parseMode, ingest.outputs && new Set(ingest.outputs));
            ingest.status = IngestStatus.INGESTED;
            await this.storage.putIngest(ingest);
            await this.updateQueueStats();
          } catch (e) {
            if (e instanceof UnmetDependency) {
              await this.queueDependency(e.outpoint, e.parseMode);
              if (!ingest.height || ingest.height > 50000000) {
                ingest.height = Date.now();
                await this.storage.putIngest(ingest);
              }
              await this.updateQueueStats();
              // console.log("Processing dependency", ingest.txid)
              return this.processIngests();
            } else {
              console.error("Failed to ingest tx", ingest.txid, e);
            }
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
          const tx = await this.stores.txns!.loadTx(ingest.txid);
          if (!tx) {
            console.error("Failed to get tx", ingest.txid);
            continue;
          }
          if (!tx.merklePath) {
            ingest.height = Date.now();
          } else {
            const ctx = await this.ingest(tx, ingest.source, ingest.parseMode, ingest.outputs && new Set(ingest.outputs));
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
          const tx = await this.stores.txns!.loadTx(ingest.txid);
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

  async syncTxLogs(parseMode = ParseMode.Persist) {
    if (!this.services.account) return
    let syncedState = await this.storage.getState("lastSync");
    if (!syncedState) {
      await new Promise((r) => setTimeout(r, 1000));
      this.events?.emit("importing", { tag: "wallet", name: "Wallet" });
      console.log("No initial sync. Skipping sync for", this.services.account.accountId);
      return;
    };
    let lastSync = Number(syncedState || 0);
    console.log("Syncing logs from", lastSync, "for", this.services.account.accountId);
    const txSyncs = await this.services.account?.syncTxLogs(lastSync) || [];
    const oldLogs = await this.storage.getTxLogs(
      txSyncs.map((log) => log.txid),
    );
    const logs = new Set<string>();
    for (const log of oldLogs) {
      if(log) logs.add(log.txid);
    }
    
    const ingests: Ingest[] = [];
    for (const txLog of txSyncs) {
      if (!logs.has(txLog.txid)) {
        ingests.push({
          txid: txLog.txid,
          height: txLog.height,
          idx: txLog.idx || 0,
          source: "sync",
          parseMode: ParseMode.PersistSummary,
        })
        if (txLog.score) {
          lastSync = Math.max(lastSync, txLog.score);
        }
      }
    }
    console.log("Queueing new logs:", ingests);
    await this.queue(ingests);
    if (ingests.length) {
      this.events?.emit("newTxs", ingests.length)
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
      // queue: {},
      summary: {},
      store: this,
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
