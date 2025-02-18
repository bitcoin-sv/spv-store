import type { Transaction } from "@bsv/sdk";
import type { Txo } from "./txo";
import { Block } from "./block";
import type { TxoStore } from "../stores";

export type IndexQueue = { [txid: string]: Block };

/**
 * Represents a summary of indices with associated metadata.
 * 
 * @typedef {Object} IndexSummary
 * @property {string} [id] - An optional identifier for the tag.
 * @property {number} [amount] - An optional amount associated with the tag.
 * @property {string} [icon] - Outpoint of optional icon associated with the tag. Can be ordinal or B protocol
 * @property {any} [data] - Optional data associated with the tag.
 */
export type IndexSummary = {
  id?: string;
  amount?: number;
  icon?: string;
  data?: any;
};

/**
 * Represents a log of indexed transactions.
 * 
 * @class TxLog
 * 
 * @property {{[tag: string]: IndexSummary}} [summary] - The summary of the indexed transaction.
 * @property {string} [source] - The source of the indexed transaction.
 * @property {string} txid - The unique identifier of the transaction.
 * @property {number} [height] - The height of the block containing the transaction.
 * @property {number} [idx] - The index of the transaction in the block.
 */
export class TxLog {
  summary?: {[tag: string]: IndexSummary}
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
 * @property {IndexSummary} summary - The summary of the transaction after indexing.
 */
export interface IndexContext {
  tx: Transaction;
  txid: string;
  block: Block;
  spends: Txo[]; //spent transaction outputs (inputs)
  txos: Txo[]; //transaction outputs
  summary: {[tag: string]: IndexSummary} // Summary of the transaction after indexing
  store: TxoStore
}
