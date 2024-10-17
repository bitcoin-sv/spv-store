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
 * Represents a log of indexed transactions.
 * 
 * @class TxLog
 * 
 * @property {IndexSummary} [summary] - The summary of the indexed transaction.
 * @property {string} [source] - The source of the indexed transaction.
 * @property {string} txid - The unique identifier of the transaction.
 * @property {number} [height] - The height of the block containing the transaction.
 * @property {number} [idx] - The index of the transaction in the block.
 */
export class TxLog {
  summary?: IndexSummary
  source?: string
  constructor(
    public txid: string,
    public height: number = 0,
    public idx = 0,
  ) { }
}



/**
 * Represents the context of an index operation.
 * 
 * @interface IndexContext
 * 
 * @property {Transaction} tx - The transaction being indexed.
 * @property {string} txid - The unique identifier of the transaction.
 * @property {Block} block - The block containing the transaction.
 * @property {Txo[]} spends - The spent transaction outputs (inputs).
 * @property {Txo[]} txos - The transaction outputs.
 * @property {IndexQueue} queue - The dependency transactions to be ingested.
 * @property {IndexSummary} summary - The summary of the transaction after indexing.
 */
export interface IndexContext {
  tx: Transaction;
  txid: string;
  block: Block;
  spends: Txo[]; //spent transaction outputs (inputs)
  txos: Txo[]; //transaction outputs
  queue: IndexQueue; // dependency transactions to be ingested
  summary: IndexSummary // Summary of the transaction after indexing
}
