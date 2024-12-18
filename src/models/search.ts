import type { Txo } from "./txo";

export enum TxoSort {
  ASC = 'asc',
  DESC = 'desc',
}

export class TxoLookup {
  /**
   * Constructs a new instance of the search model.
   * 
   * @param tag - Tag of the indexer to be searched.
   * @param id - Optional ID of the field to be searched. Required if value populated.
   * @param value - Optional value of the field to be searched.
   * @param owner - Optional owner of the transaction output.
   */
  constructor(
    public tag: string,
    public id?: string,
    public value?: string,
    public owner?: string,
    public includeSpent?: boolean,
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
