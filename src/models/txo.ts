import { Utils } from "@bsv/sdk";
import { Block } from "./block";
import { type IndexData } from "./index-data";
import type { Indexer } from "./indexer";
import { Outpoint } from "./outpoint";

/**
 * Enumeration representing the status of a transaction output (Txo).
 * 
 * @enum {number}
 * @property {number} Unindexed - The transaction output is not indexed.
 * @property {number} Trusted - The transaction output is trusted.
 * @property {number} Dependency - The transaction output is a dependency.
 * @property {number} Validated - The transaction output is validated.
 */
export enum TxoStatus {
  Unindexed = -1,
  Trusted = 0,
  Dependency = 1,
  Validated = 2,
}

/**
 * Represents a transaction output (Txo).
 */
export class Txo {
  /**
   * The txid in which the output was spent, or and empty string if unspent.
   */
  spend: string = '';

  /**
   * A dictionary containing index data associated with each indexer tag.
   */
  data: { [tag: string]: IndexData } = {};

  /**
   * The owner of the transaction output. 
   * This is typically and address, but can be populated with any string. 
   * An indexer should not overwrite this field if it is already populated.
   */
  owner?: string;

  /**
   * A list of events associated with the transaction output.
   */
  events: string[] = [];

  /**
   * A list of events associated with the transaction output.
   */
  logs: string[] = [];

  /**
   * A list of tags associated with the transaction output. 
   */
  tags: string[] = [];

  /**
   * A list of dependencies associated with the transaction output.
   */
  deps: string[] = [];

  /**
   * A flag indicating whether the transaction output has events.
   */
  hasEvents = 0;

  /**
   * Creates an instance of Txo.
   * @param outpoint - The outpoint of the transaction output.
   * @param satoshis - The amount of satoshis in the transaction output.
   * @param script - The script associated with the transaction output.
   * @param status - The status of the transaction output.
   * @param block - The block containing the transaction output.
   */
  constructor(
    public outpoint: Outpoint,
    public satoshis: bigint,
    public script: number[],
    public status: TxoStatus,
    public block = new Block(),
  ) { }

  isPopulated(): boolean {
    return this.script.length > 0;
  }

  serialize(indexers: Indexer[]): any {
    const obj = { 
      ...this,
      script: Utils.toBase64(this.script),
      satoshis: Number(this.satoshis),
      block: {
        height: this.block.height,
        idx: Number(this.block.idx),
      },
      data: {} as {[tag: string]: any},
    };
    const data: {[tag: string]: any} = {};
    for(const i of indexers) {
      const tagData = this.data[i.tag]
      if(tagData) {
        data[i.tag] = {
          data: i.serialize(this.data[i.tag].data),
          events: tagData.events,
          deps: tagData.deps,
        }
      }
    }
    obj.data = data;
    return obj;
  }

  static deserialize(obj: any, indexers: Indexer[]): Txo {
    const txo = new Txo(
      new Outpoint(obj.outpoint),
      BigInt(obj.satoshis),
      Utils.toArray(obj.script, 'base64'),
      obj.status,
      {
        height: obj.block.height,
        idx: BigInt(obj.block.idx),
      },
    );
    txo.spend = obj.spend;
    txo.owner = obj.owner;
    txo.events = obj.events;
    txo.logs = obj.logs;
    txo.tags = obj.tags;
    txo.deps = obj.deps;
    txo.hasEvents = obj.hasEvents;

    for(const i of indexers) {
      const data = obj.data[i.tag]
      if(data) {
        txo.data[i.tag] = {
          data: i.deserialize(data.data),
          events: data.events,
          deps: data.deps,
        }
      }
    }
    return txo;
  }
}
