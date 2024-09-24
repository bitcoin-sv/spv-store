import type { Bsv21Status } from "./bsv21";
import type { File } from "./insc";

export interface RemoteBsv20 {
  txid: string;
  vout: number;
  height: number;
  idx: number;
  p: string;
  op: string;
  tick?: string;
  id?: string;
  sym?: string;
  dec: number;
  amt: string;
  status?: Bsv21Status;
  icon?: string;
  script: string;
  listing: boolean;
  price: number;
  payout: string;
}

export type Sigma = {
  algorithm: string;
  address: string;
  signature: string;
  vin: number;
};

export type Inscription = {
  file: File;
  fields?: {
    [key: string]: any;
  };
  parent?: string;
};

export type Listing = {
  price: number;
  payout: string;
};

export type Lock = {
  until: number;
};

export type OrdinalData = {
  types?: string[];
  insc?: Inscription;
  map?: {
    [key: string]: any;
  };
  b?: File;
  sigma?: Sigma[];
  list?: Listing;
  bsv20?: RemoteBsv20;
  lock?: Lock;
};

export type Ordinal = {
  txid: string;
  vout: number;
  outpoint: string;
  satoshis: number;
  owner?: string;
  script?: string;
  spend?: string;
  origin?: Origin;
  height: number;
  idx: number;
  data: OrdinalData;
};

export type Origin = {
  outpoint: string;
  nonce?: number;
  data?: OrdinalData;
  num?: string;
  map?: {
    [key: string]: any;
  };
};
