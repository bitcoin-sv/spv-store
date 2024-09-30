import type { Transaction } from "@bsv/sdk";
import type { Txo } from "./txo";
import { Block } from "./block";

export type IndexQueue = { [txid: string]: Block };

/**
 * Represents a summary of indices with associated metadata.
 * 
 * @typedef {Object} IndexSummary
 * @property {Object.<string, {id?: string, amount?: bigint, icon?: string}>} [tag] - A mapping of tags to their respective metadata.
 * @property {string} [tag.id] - An optional identifier for the tag.
 * @property {bigint} [tag.amount] - An optional amount associated with the tag.
 * @property {string} [tag.icon] - Outpoint of optional icon associated with the tag. Can be ordinal or B protocol
 */
export type IndexSummary = {
  [tag: string]: {
    id?: string;
    amount?: bigint;
    icon?: string;
  }
};


/**
 * Represents the context for indexing a transaction.
 * 
 * @remarks
 * This class holds the necessary information for indexing a transaction,
 * including its transaction ID, spent transaction outputs, transaction outputs,
 * dependency transactions to be ingested, and a summary of the transaction after indexing.
 * 
 * @param tx - The transaction to be indexed.
 * @param block - The transaction block. Defaults to a new Block instance.
 * 
 * @property txid - The transaction ID in hexadecimal format.
 * @property spends - An array of spent transaction outputs (inputs).
 * @property txos - An array of transaction outputs.
 * @property queue - Dependency transactions to be ingested.
 * @property summary - Summary of the transaction after indexing.
 */
export class IndexContext {
  txid: string;
  spends: Txo[] = []; //spent transaction outputs (inputs)
  txos: Txo[] = []; //transaction outputs
  queue: IndexQueue = {}; // dependency transactions to be ingested
  summary: IndexSummary = {} // Summary of the transaction after indexing
  constructor(
    public tx: Transaction, // transaction to be indexed
    public block = new Block() // transaction block
  ) {
    this.txid = tx.id('hex');
  }
}
