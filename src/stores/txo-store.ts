import { Transaction } from "@bsv/sdk";
import type { Indexer } from "../models/indexer";
import { IndexContext } from "../models/index-context";
import { Txo, TxoStatus } from "../models/txo";
import { type Ingest, IngestStatus } from "../models/ingest";
import type { Block } from "../models/block";
import type { TxoStorage } from "../storage/txo-storage";
import { Outpoint } from "../models/outpoint";
import type { TxLog } from "../services/inv-service";
import type { Services, Stores } from "../spv-store";
import type { EventEmitter } from "../lib/event-emitter";
import { TxoSort, type TxoLookup, type TxoResults } from "../models";

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
   * @async
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
   * Parses a transaction and returns an IndexContext.
   * 
   * @param tx - The transaction to parse.
   * @param previewOnly - If true, only a preview of the transaction is parsed. Defaults to true.
   * @param outputs - An optional array of output indices to include in the parsing.
   * @param fromRemote - If true, the transaction is loaded from a remote source. Defaults to false.
   * @param resolveInputs - If true, the inputs of the transaction are resolved. Defaults to false.
   * @returns A promise that resolves to an IndexContext.
   * @throws Will throw an error if the merkle path verification fails or if an input is missing a source transaction.
   */
  async parse(
    tx: Transaction,
    previewOnly = true,
    outputs?: number[],
    fromRemote = false,
    resolveInputs = false
  ): Promise<IndexContext> {
    const ctx = new IndexContext(tx)
    if (tx.merklePath) {
      if (!tx.merklePath.verify(ctx.txid, this.stores.blocks!)) {
        throw new Error("Failed to verify merkle path");
      }
      ctx.block.height = tx.merklePath.blockHeight;
      ctx.block.idx = BigInt(tx.merklePath.path[0].find((p) => p.hash == ctx.txid)!.offset)
    }
    for (const [vin, input] of tx.inputs.entries()) {
      if (!input.sourceTXID) {
        if (!input.sourceTransaction) {
          throw new Error("Input missing source transaction");
        }
        input.sourceTXID = input.sourceTransaction.id("hex") as string;
      }
      if (!input.sourceTransaction) {
        input.sourceTransaction = await this.stores.txns!.loadTx(
          input.sourceTXID,
          fromRemote,
        );
      }
      let spend: Txo | undefined;
      if (input.sourceTransaction && resolveInputs) {
        const inCtx = await this.parse(input.sourceTransaction!, previewOnly, undefined, fromRemote, false);
        spend = inCtx.txos[input.sourceOutputIndex];
      } else {
        spend = await this.storage.get(new Outpoint(input.sourceTXID, input.sourceOutputIndex));
        if (!spend) {
          spend = new Txo(
            new Outpoint(input.sourceTXID!, input.sourceOutputIndex),
            BigInt(
              input.sourceTransaction?.outputs[input.sourceOutputIndex].satoshis || 0,
            ),
            input.sourceTransaction?.outputs[input.sourceOutputIndex]?.lockingScript.toBinary() || [],
            TxoStatus.Unindexed,
          )
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
          TxoStatus.Unindexed,
        );
      }
      txo.satoshis = BigInt(output.satoshis!);
      txo.script = output.lockingScript.toBinary();
      ctx.txos.push(txo);
      if (outputs && !outputs.includes(vout)) {
        continue;
      }
      for (const i of this.indexers) {
        try {
          const data = i.parse && (await i.parse(ctx, vout, previewOnly));
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
    return ctx;
  }

  /**
   * Ingests a transaction into the store, optionally ingesting its parent transactions.
   *
   * @param tx - The transaction to ingest.
   * @param source - An optional string indicating the source of the transaction.
   * @param fromRemote - A boolean indicating if the transaction is from a remote source.
   * @param isDep - A boolean indicating if the transaction is a dependency.
   * @param ingestParents - A boolean indicating if parent transactions should be ingested.
   * @param outputs - An optional array of output indices to be ingested.
   * @returns A promise that resolves to an IndexContext object.
   */
  async ingest(
    tx: Transaction,
    source: string = "",
    fromRemote = false,
    isDep = false,
    ingestParents = true,
    outputs?: number[],
  ): Promise<IndexContext> {
    this.stores.txns!.saveTx(tx);
    if (ingestParents) {
      for (const input of tx.inputs) {
        if (input.sourceTransaction) {
          await this.ingest(input.sourceTransaction, "beef", fromRemote, true, ingestParents);
        }
      }
    }

    const ctx = await this.parse(tx, false, outputs, fromRemote);
    console.log("Ingesting", ctx.txid);
    const block: Block = { height: Date.now(), idx: 0n };
    if (tx.merklePath) {
      block.height = tx.merklePath.blockHeight;
      block.idx = BigInt(
        tx.merklePath.path[0].find((p) => p.hash == ctx.txid)?.offset || 0,
      );
    }

    ctx.txos.forEach((txo) => {
      txo.block = block;
      if (
        txo.status == TxoStatus.Unindexed ||
        txo.status == TxoStatus.Dependency
      ) {
        txo.status = isDep ? TxoStatus.Dependency : TxoStatus.Validated;
      }
    });
    await this.storage.putMany(ctx.spends);
    if (outputs) {
      await this.storage.putMany(outputs.map((i) => ctx.txos[i]));
    } else {
      await this.storage.putMany(ctx.txos);
    }
    if (!isDep) {
      this.storage.putTxLog({
        txid: ctx.txid,
        height: block.height,
        idx: Number(block.idx),
        summary: ctx.summary,
        source,
      });
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
        await this.stores.txns!.ensureTxns(ingests.map((i) => i.txid));

        const dels: string[] = []
        const updates: Ingest[] = []
        for (const ingest of ingests) {
          if (ingest.downloadOnly) {
            dels.push(ingest.txid)
          } else {
            ingest.status = IngestStatus.DOWNLOADED;
            updates.push(ingest)
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
          const tx = await this.stores.txns!.loadTx(ingest.txid);
          if (!tx) {
            console.error("Failed to get tx", ingest.txid);
            continue;
          }
          await this.ingest(tx, ingest.source, ingest.validateInputs, ingest.isDep, false, ingest.outputs);
          ingest.status = IngestStatus.INGESTED;
          await this.storage.putIngest(ingest);
          await this.updateQueueStats();
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
            const ctx = await this.ingest(tx, ingest.source, false, ingest.isDep, false, ingest.outputs);
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
          // ingest.status = IngestStatus.IMMUTABLE;
          // await this.storage.putIngest(ingest);
          await this.storage.delIngest(ingest.txid);
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
    let syncedState = await this.storage.getState("syncHeight");
    if (!syncedState) return
    for (const owner of this.owners) {
      syncedState = await this.storage.getState(`sync-${owner}`);
      let syncHeight = Number(syncedState);
      console.log("Syncing logs for", owner, syncHeight);
      const newLogs = await this.services.inv.pollTxLogs(
        owner,
        syncHeight,
      );
      const oldLogs = await this.storage.getTxLogs(
        newLogs.map((log) => log.txid),
      );
      const puts = newLogs.reduce((puts, log, i) => {
        if (!oldLogs[i] || oldLogs[i]!.height != log.height ||
          (log.height < 50000000 && log.idx && oldLogs[i]?.idx != log.idx)
        ) {
          puts.push(log);
          syncHeight = Math.max(syncHeight, log.height);
        }
        return puts;
      }, [] as TxLog[]);
      console.log("Queueing new logs for", owner, puts);
      await this.queue(puts.map((p) => ({
        txid: p.txid,
        height: Number(p.height),
        idx: Number(p.idx || 0),
        source: "sync"
      })));
    }
  }
}
