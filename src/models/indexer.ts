import type { Network } from "../spv-store";
import type { TxoStore } from "../stores";
import type { BlockHeader } from "./block-header";
import type { IndexContext, IndexSummary } from "./index-context";
import { type IndexData } from "./index-data";
import type { Ingest } from "./ingest";
import type { Outpoint } from "./outpoint";

// export const UnmetDependency = new Error('unmet-dependency');

export class UnmetDependency{
  constructor(
    public outpoint: Outpoint, 
    public parseMode = ParseMode.Dependency
  ) {}
}

/**
 * Enum representing the different modes of indexing.
 * 
 * @enum {number}
 */
export enum ParseMode {
  /** Parse outputs only. */
  OutputsOnly = -1,
  /** Parse for preview. Do not save. */
  Preview = 0,
  /** Parse as dependency. Supress events.*/
  Dependency = 1,
  /** Parse and queue all dependencies for ingestion. */
  Persist = 2,
  /** Process source transaction tree */
  PersistSummary = 3,
}


/**
 * Enum representing the different modes of indexing.
 * 
 * @enum {number}
 */
export enum IndexMode {
  /** Rely on an external indexer. */
  Trust = 1,
  /** Verify all data locally. This requires all dependent data to be indexed as well. */
  Verify = 2,
  /** Initially rely on an external indexer, but also load and verify all data locally. This will allow P2P transactions with other parties using VERIFY mode. */
  TrustAndVerify = 3,
}

/**
 * Abstract class representing an Indexer.
 * 
 * @property {string} tag - Unique identifier for this indexer.
 * @property {string} name - Human readable name for this indexer.
 */
export abstract class Indexer {
  tag = ""; // unique identifier for this indexer
  name = ""; // human readable name for this indexer

  /**
   * Creates an instance of the Indexer.
   * 
   * @param {Set<string>} owners - A set of owners that this indexer is interested in. 
   *                 An owner can be an address or any other data the indexer 
   *                 wants to use to identify which transactions to include in the index.
   * @param {IndexMode} indexMode - The mode of the indexer.
   * @param {Network} [network="mainnet"] - The network the indexer is operating on. Defaults to "mainnet".
   */
  constructor(
    public owners = new Set<string>(),
    public network: Network = "mainnet",
  ) { }

  /**
   * Parses an output and returns the index data if it is relevant to this indexer.
   * If the output is not relevant, it returns undefined.
   *
   * @param {IndexContext} ctx - The context for the index operation.
   * @param {number} vout - The output number to be parsed.
   * @param {boolean} [previewOnly=false] - A flag indicating whether to perform a preview-only parse.
   * @returns {Promise<IndexData | undefined>} A promise that resolves to the index data if relevant, or undefined if not.
   */
  async parse(ctx: IndexContext, vout: number, parseMode = ParseMode.Persist): Promise<IndexData | undefined> {
    return;
  }

  /**
   * Pre-save hook that evaluates the index data for the entire transaction before it is persisted.
   *
   * @param {IndexContext} ctx - The context of the index operation.
   * @returns {Promise<void>} A promise that resolves when the pre-save evaluation is complete.
   */
  async summerize(ctx: IndexContext, parseMode = ParseMode.Persist): Promise<IndexSummary | undefined> {
    return;
  }

  /**
   * Synchronize txo data for indexer from a remote source.
   *
   * @param {TxoStore} txoStore - The store containing transaction outputs.
   * @param {{[txid: string]: Ingest}} ingestQueue - A queue of transactions to be ingested, keyed by transaction ID.
   * @returns {Promise<number>} A promise that resolves when the synchronization is complete.
   */
  async sync(txoStore: TxoStore, ingestQueue: { [txid: string]: Ingest }, parseMode?: ParseMode, ): Promise<number> {
    return 0;
  }

  /**
   * Resolve asynchronous validations on new block
   *
   * @returns {Promise<void>} A promise that resolves when the indexer is resolved.
   */
  async resolve(txoStore: TxoStore, block: BlockHeader): Promise<void> {
    return;
  }
}
