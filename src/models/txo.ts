import { Block } from "./block";
import { IndexData } from "./index-data";
import { Outpoint } from "./outpoint";

export enum TxoStatus {
  Unindexed = -1,
  Trusted = 0,
  Dependency = 1,
  Confirmed = 2,
}

export class Txo {
  spend: string = '';
  data: { [tag: string]: IndexData } = {};
  owner?: string;
  events: string[] = [];
  tags: string[] = [];
  deps: string[] = [];
  hasEvents = 0;

  constructor(
    public outpoint: Outpoint,
    public satoshis: bigint,
    public script: number[],
    public status: TxoStatus,
    public block = new Block(),
  ) { }
}
