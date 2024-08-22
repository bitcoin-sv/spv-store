import { MerklePath, Transaction } from "@bsv/sdk";
import type { Indexer } from "../models/indexer";
import { IndexContext } from "../models/index-context";
import { Txo, TxoStatus } from "../models/txo";
import { type Ingest, IngestStatus } from "../models/ingest";
import type { Block } from "../models/block";
import type { TxoStorage } from "../storage/txo-storage";
import { Outpoint } from "../models/outpoint";
import type { TxLog } from "../services/inv-service";
import type { Services, Stores } from "../casemod-spv";
import type { EventEmitter } from "../lib/event-emitter";
import type { TxoLookup, TxoResults } from "../models";
import { BroadcastStatus } from "../services";

export class TxoStore {
  queueLength = 0;
  private syncRunning : Promise<void> | undefined;
  private stopSync = false;
  constructor(
    public storage : TxoStorage,
    public services : Services,
    public stores : Stores,
    public indexers : Indexer[],
    public owners : Set<string>,
    public events ?: EventEmitter,
  ) { }

  async destroy() {
    this.stopSync = true;
    if (this.syncRunning) await this.syncRunning;
    await this.storage.destroy();
  }

  private async updateSpends(outpoints : Outpoint[]) {
    const spends = await this.services.spends.getSpends(outpoints);
    for (const [i, outpoint] of outpoints.entries()) {
      if (!spends[i]) continue;
      await this.storage.setSpend(outpoint, spends[i]);
    }
  }

  public async search(
    lookup : TxoLookup,
    limit = 100,
    from ?: string,
  ) : Promise<TxoResults> {
    return this.storage.search(lookup, limit, from);
  }

  async parse(
    tx : Transaction,
    previewOnly = true,
    fromRemote = false,
  ) : Promise<IndexContext> {
    const ctx = new IndexContext(tx)
    console.log("Ingesting", ctx.txid);

    for (const input of tx.inputs) {
      if (!input.sourceTXID) {
        if (!input.sourceTransaction) {
          throw new Error("Input missing source transaction");
        }
        input.sourceTXID = input.sourceTransaction.id("hex") as string;
      }
      if (input.sourceTransaction) {
        await this.ingest(input.sourceTransaction);
      } else {
        input.sourceTransaction = await this.stores.txns!.loadTx(
          input.sourceTXID,
          fromRemote,
        );
        if (!input.sourceTransaction)
          throw new Error(`Failed to get source tx ${input.sourceTXID}`);
      }
    }

    const spends = await this.storage.getMany(
      tx.inputs.map((i) => new Outpoint(i.sourceTXID!, i.sourceOutputIndex)),
    );
    for (const [vin, input] of tx.inputs.entries()) {
      let spend = spends[vin];
      if (!spend) {
        spend = new Txo(
          new Outpoint(input.sourceTXID!, input.sourceOutputIndex),
          BigInt(
            input.sourceTransaction!.outputs[input.sourceOutputIndex].satoshis!,
          ),
          input.sourceTransaction!.outputs[
            input.sourceOutputIndex
          ].lockingScript.toBinary(),
          TxoStatus.Unindexed,
        );
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
          BigInt(output.satoshis!),
          output.lockingScript.toBinary(),
          TxoStatus.Unindexed,
        );
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

    this.indexers.forEach((i) => i.preSave && i.preSave(ctx));
    return ctx;
  }

  async ingest(
    tx : Transaction,
    fromRemote = false,
    isDepOnly = false,
    checkSpends = false,
  ) : Promise<IndexContext> {
    const txid = tx.id("hex") as string;
    console.log("Ingesting", txid);
    const block : Block = { height: Date.now(), idx: 0n };
    if (tx.merklePath) {
      block.height = tx.merklePath.blockHeight;
      block.idx = BigInt(
        tx.merklePath.path[0].find((p) => p.hash == txid)?.offset || 0,
      );
    }

    const ctx = await this.parse(tx, false, fromRemote);

    ctx.txos.forEach((txo) => {
      txo.block = block;
      if (
        txo.status == TxoStatus.Unindexed ||
        txo.status == TxoStatus.Dependency
      ) {
        txo.status = isDepOnly ? TxoStatus.Dependency : TxoStatus.Confirmed;
      }
    });
    await this.storage.putMany(ctx.spends);
    await this.storage.putMany(ctx.txos);
    // await this.stores.txns!.saveTx(tx);
    if (checkSpends) {
      await this.updateSpends(ctx.txos.map((t) => t.outpoint));
    }
    for (const txo of ctx.txos) {
      for (const [tag, idxData] of Object.entries(txo.data)) {
        for (const e of idxData.events) {
          this.events?.emit(
            `evt:${tag}:${e.id}`,
            e.value,
            txo.outpoint.toString(),
          );
        }
      }
    }
    return ctx;
  }

  async updateQueueStats() {
    const queueLength = await this.storage.getQueueLength();
    this.events?.emit("queueStats", { length: queueLength });
  }
  async queue(ingests : Ingest[]) {
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

  async processDownloads() : Promise<void> {
    try {
      const ingests = await this.storage.getIngests(IngestStatus.QUEUED, 25);
      if (ingests.length) {
        await this.stores.txns!.ensureTxns(ingests.map((i) => i.txid));
        ingests.forEach((i) => {
          i.status = i.downloadOnly
            ? IngestStatus.CONFIRMED
            : IngestStatus.DOWNLOADED;
        });
        await this.storage.putIngests(ingests);
        await this.updateQueueStats();
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
    return this.processDownloads();
  }

  async processIngests() : Promise<void> {
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
          await this.ingest(tx, true, ingest.isDepOnly, ingest.checkSpends);
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

  async processConfirms() : Promise<void> {
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
            const status = await this.services.broadcast.status(ingest.txid);
            if (
              !status ||
              status.status == BroadcastStatus.MEMPOOL ||
              !status.proof
            ) {
              ingest.height = Date.now();
            } else {
              tx.merklePath = MerklePath.fromBinary(status.proof);
            }
          }
          if (tx.merklePath) {
            const ctx = await this.ingest(tx, true, ingest.isDepOnly);
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

  async processImmutable() : Promise<void> {
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
            // TODO: Refresh merkle path in case of reorg
            // ingest.height = ctx.block.height;
            // ingest.idx = ctx.block.idx;
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
    for (const owner of this.owners) {
      const latestLog = await this.storage.getSynced(owner);
      const newLogs = await this.services.inv.pollTxLogs(
        owner,
        latestLog?.height || 0,
      );
      const oldLogs = await this.storage.getInvs(
        owner,
        newLogs.map((log) => log.txid),
      );
      const puts = newLogs.reduce((puts, log, i) => {
        if (
          !oldLogs[i] ||
          oldLogs[i]!.height != log.height ||
          (log.idx && oldLogs[i]?.idx != log.idx)
        ) {
          log.owner = owner;
          puts.push(log);
        }
        return puts;
      }, [] as TxLog[]);
      await this.queue(
        puts.map((p) => ({
          txid: p.txid,
          height: Number(p.height),
          idx: Number(p.idx || 0),
        })),
      );
    }
  }
}
