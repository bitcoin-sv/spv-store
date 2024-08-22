import type { Transaction } from "@bsv/sdk";
import type { Txo } from "./txo";
import { Block } from "./block";

type Queue = { [txid : string] : Block };
type Summary = { [tag : string] : string };
export class IndexContext {
  txid : string;
  spends : Txo[] = [];
  txos : Txo[] = [];
  queue : Queue = {};
  summary : Summary = {}
  constructor(public tx : Transaction, public block = new Block()) {
    this.txid = tx.id('hex')
  }
}
