import { type Block } from "./block";
import { IndexData } from "./index-data";
import { Outpoint } from "./outpoint";

export enum TxoStatus {
  TRUSTED = 0,
  DEPENDENCY = 1,
  CONFIRMED = 2,
}

export class Txo {
  block: Block = { height: Date.now(), idx: 0n };
  spend?: string;
  data: { [tag: string]: IndexData } = {};
  events: string[] = [];
  owner?: string;
  tags: string[] = [];

  constructor(
    public outpoint: Outpoint,
    public satoshis: bigint,
    public script: number[],
    public status?: TxoStatus,
  ) {}

  buildIndex(isDepOnly = false) {
    this.tags = [];
    this.events = [];
    const blockStr = this.block.height.toString(10).padStart(7, "0");
    const idxStr = this.block.idx.toString(10).padStart(9, "0");
    const sort = `${blockStr}.${idxStr}`;
    if (!this.spend && !isDepOnly) {
      for (const [tag, data] of Object.entries(this.data)) {
        this.tags.push(`${tag}:${sort}`);
        for (const e of data.events) {
          this.events.push(`${tag}:${e.id}:${e.value}:${sort}`);
        }
      }
    }
  }

  static hydrate(obj: Txo) {
    const txo = new Txo(
      new Outpoint(obj.outpoint.txid, obj.outpoint.vout),
      BigInt(obj.satoshis),
      obj.script,
      obj.status,
    );
    Object.assign(txo, obj);
    return txo;
  }
}
