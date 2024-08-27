import type { Transaction } from "@bsv/sdk";
import type { Txo } from "./txo";
import { Block } from "./block";

export type IndexQueue = { [txid: string]: Block };

export type IndexSummary = { [tag: string]: {
  id?: string;
  amount?: bigint;
  icon?: string;
} };
export class IndexContext {
  txid: string;
  spends: Txo[] = [];
  txos: Txo[] = [];
  queue: IndexQueue = {};
  summary: IndexSummary = {}
  constructor(public tx: Transaction, public block = new Block()) {
    this.txid = tx.id('hex')
  }
}
