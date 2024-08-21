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
}
