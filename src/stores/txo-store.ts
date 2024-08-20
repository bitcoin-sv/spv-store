import { MerklePath, Transaction } from "@bsv/sdk";
import type { Indexer } from "../models/indexer";
import type { IndexContext } from "../models/index-context";
import { Txo, TxoStatus } from "../models/txo";
import { Spend } from "../models/spend";
import { Ingest, IngestStatus } from "../models/ingest";
import { Block } from "../models/block";
import type { TxoStorage } from "../storage/txo-storage";
import { Outpoint } from "../models/outpoint";
import type { TxLog } from "../services/inv-service";
import type { Services, Stores } from "../case-mod-spv";
import type { EventEmitter } from "../lib/event-emitter";
import type { TxoLookup, TxoResults } from "../models";
import { TxnStatus } from "./txn-store";
import { BroadcastStatus } from "../services";

export class TxoStore {
  queueLength = 0;
  private syncInProgress = false;
  private stopSync = false;
  constructor(
    public storage: TxoStorage,
    public services: Services,
    public stores: Stores,
    public indexers: Indexer[],
    public owners: Set<string>,
    public events?: EventEmitter
  ) {}

  async destroy() {
    this.stopSync = true;
    await this.storage.destroy();
  }

  private async updateSpends(outpoints: Outpoint[]) {
    const spends = await this.services.spends.getSpends(outpoints);
    for (const [i, outpoint] of outpoints.entries()) {
      if (!spends[i]) continue;
      await this.storage.setSpend(outpoint, new Spend(spends[i]!, 0));
    }
  }

  public async search(
    lookup: TxoLookup,
    limit = 100,
    from?: string
  ): Promise<TxoResults> {
    const results = await this.storage.search(lookup, limit, from);
    return {
      txos: results.txos.map((t) => Txo.fromObject(t, this.indexers)),
      nextPage: results.nextPage,
    };
  }
  async ingest(
    tx: Transaction,
    fromRemote = false,
    status = TxoStatus.CONFIRMED,
    checkSpends = false
  ): Promise<IndexContext> {
    const txid = tx.id("hex") as string;
    console.log("Ingesting", txid);
    const block = new Block();
    if (tx.merklePath) {
      block.height = tx.merklePath.blockHeight;
      block.idx = BigInt(
        tx.merklePath.path[0].find((p) => p.hash == txid)?.offset || 0
      );
    }

    const ctx: IndexContext = {
      txid,
      tx,
      block,
      spends: [],
      txos: [],
    };

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
          fromRemote
        );
        if (!input.sourceTransaction)
          throw new Error(`Failed to get source tx ${input.sourceTXID}`);
      }
    }

    const spends = await this.storage.getMany(
      tx.inputs.map(
        (i) => new Outpoint(`${i.sourceTXID}_${i.sourceOutputIndex}`)
      )
    );
    for (let [vin, spend] of spends.entries()) {
      if (spend) {
        spend = Txo.fromObject(spend, this.indexers);
      } else {
        const input = tx.inputs[vin];
        const spentOutput =
          input.sourceTransaction!.outputs[input.sourceOutputIndex];
        spend = new Txo(
          new Outpoint(input.sourceTXID!, input.sourceOutputIndex),
          BigInt(spentOutput.satoshis!),
          spentOutput.lockingScript.toBinary(),
          status
        );
      }
      spend.spend = new Spend(txid, vin, block);
      ctx.spends.push(spend.toObject());
    }
    await this.storage.putMany(ctx.spends);

    const txos = await this.storage.getMany(
      tx.outputs.map((_, i) => new Outpoint(txid, i))
    );
    const sort = ctx.block.height.toString(16).padStart(8, "0");
    for (let [vout, txo] of txos.entries()) {
      if (txo) {
        txo = Txo.fromObject(txo, this.indexers);
        if (status > txo.status) {
          txo.status = status;
        }
      } else {
        txo = new Txo(
          new Outpoint(txid, vout),
          BigInt(tx.outputs[vout].satoshis!),
          tx.outputs[vout].lockingScript.toBinary(),
          status
        );
      }
      txo.status = status;
      txo.block = block;
      txo.events = [];
      txo.tags = [];
      ctx.txos.push(txo);
      for (const i of this.indexers) {
        try {
          const data = i.parse && i.parse(ctx, vout);
          if (data) {
            txo.data[i.tag] = data;
          }
        } catch (e) {
          console.error("indexer error: continuing", i.tag, e);
        }
        if (txo.owner && this.owners.has(txo.owner)) {
          txo.tags.push(
            `${i.tag}:${sort}:${ctx.block?.idx}:${txo.outpoint.vout}`
          );
        }
      }
      txo = txo.toObject();
    }

    this.indexers.forEach((i) => i.preSave && i.preSave(ctx));
    await this.storage.putMany(ctx.txos);
    await this.stores.txns!.saveTx(tx);
    if (fromRemote && checkSpends) {
      await this.updateSpends(ctx.txos.map((t) => t.outpoint));
    }
    for (const txo of ctx.txos) {
      for (const [tag, idxData] of Object.entries(txo.data)) {
        for (const e of idxData.events) {
          this.events?.emit(
            `evt:${tag}:${e.id}`,
            e.value,
            txo.outpoint.toString()
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
  async queue(ingests: Ingest[]) {
    await this.storage.putIngests(ingests);
  }

  async processQueue() {
    if (this.syncInProgress) return;
    await this.updateQueueStats();
    this.processDownloads();
    this.processIngests();
    this.processConfirms();
    this.processImmutable();
    this.syncInProgress = true;
  }

  async processDownloads(returnOnDone = false) {
    try {
      const ingests = await this.storage.getIngests(IngestStatus.QUEUED, 25);
      if (ingests.length) {
        await this.stores.txns!.ensureTxns(ingests.map((i) => i.txid));
        ingests.forEach((i) => {
          i.status = i.downloadOnly
            ? IngestStatus.INGESTED
            : IngestStatus.DOWNLOADED;
        });
        await this.storage.putIngests(ingests);
        await this.updateQueueStats();
      } else if (!returnOnDone) {
        await new Promise((r) => setTimeout(r, 1000));
      } else return;
    } catch (e) {
      console.error("Failed to ingest txs", e);
      await new Promise((r) => setTimeout(r, 1000));
    }
    if (this.stopSync) {
      return;
    }
    this.processDownloads();
  }

  async processIngests() {
    const ingests = await this.storage.getIngests(IngestStatus.DOWNLOADED, 25);
    if (ingests.length) {
      try {
        console.log("Ingesting", ingests.length, "txs");
        for await (const ingest of ingests) {
          const tx = await this.stores.txns!.loadTx(ingest.txid);
          if (!tx) {
            console.error("Failed to get tx", ingest.txid);
            continue;
          }
          await this.ingest(
            tx,
            true,
            ingest.isDep ? TxoStatus.DEPENDENCY : TxoStatus.CONFIRMED,
            ingest.checkSpends
          );
          ingest.status = IngestStatus.INGESTED;
          await this.storage.putIngest(ingest);
          await this.updateQueueStats();
        }
      } catch (e) {
        console.error("Failed to ingest txs", e);
        await new Promise((r) => setTimeout(r, 1000));
      }
    } else {
      await new Promise((r) => setTimeout(r, 1000));
    }
    if (this.stopSync) {
      return;
    }
    this.processIngests();
  }

  async processConfirms(returnOnDone = false) {
    try {
      const ingests = await this.storage.getIngests(
        IngestStatus.INGESTED,
        25,
        0,
        Date.now() - 15000
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
            const ctx = await this.ingest(
              tx,
              true,
              ingest.isDep ? TxoStatus.DEPENDENCY : TxoStatus.CONFIRMED
            );
            ingest.status = IngestStatus.CONFIRMED;
            ingest.height = ctx.block.height;
            ingest.idx = Number(ctx.block.idx);
          }
          await this.storage.putIngest(ingest);
        }
      } else if (!returnOnDone) {
        await new Promise((r) => setTimeout(r, 1000));
      } else return;
    } catch (e) {
      console.error("Failed to ingest txs", e);
      await new Promise((r) => setTimeout(r, 1000));
    }
    if (this.stopSync) {
      return;
    }
    this.processConfirms();
  }

  async processImmutable(returnOnDone = false) {
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
        chaintip?.height - 6
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
      } else if (!returnOnDone) {
        await new Promise((r) => setTimeout(r, 1000));
      } else return;
    } catch (e) {
      console.error("Failed to ingest txs", e);
      await new Promise((r) => setTimeout(r, 1000));
    }
    if (this.stopSync) {
      return;
    }
    this.processImmutable();
  }

  async syncTxLogs() {
    for (const owner of this.owners) {
      const latestLog = await this.storage.getSynced(owner);
      const newLogs = await this.services.inv.pollTxLogs(
        owner,
        latestLog?.height || 0
      );
      const oldLogs = await this.storage.getInvs(
        owner,
        newLogs.map((log) => log.txid)
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
      await this.storage.putIngests(
        puts.map(
          (log) => new Ingest(log.txid, log.height, Number(log.idx), false)
        )
      );
      if (puts.length) {
        await this.storage.putInvs(puts);
      }
    }
  }
}
