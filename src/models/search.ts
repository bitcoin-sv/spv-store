import type { Txo } from "./txo";

export class TxoLookup {
  constructor(
    public indexer: string,
    // public spent = false,
    public id?: string,
    public value?: string,
    public owner?: string,
  ) {}

  toQueryKey(): string {
    return TxoLookup.buildQueryKey(this.indexer, this.id, this.value);
  }

  static buildQueryKey(tag: string, id?: string, value?: string): string {
    let key = tag;
    if (id) {
      key += `:${id}`;
      if (value) {
        key += `:${value}`;
      }
    }
    return key;
  }
}

export interface TxoResults {
  txos: Txo[];
  nextPage?: string;
}
