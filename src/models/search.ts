import type { Txo } from "./txo";

export enum TxoSort {
  ASC = 'asc',
  DESC = 'desc',
}

export class TxoLookup {
  constructor(
    public tag: string,
    public id?: string,
    public value?: string,
    public owner?: string,
  ) { }

  toQueryKey(): string {
    return TxoLookup.buildQueryKey(this.tag, this.id, this.value);
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
