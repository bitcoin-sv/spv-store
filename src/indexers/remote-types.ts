import type { Bsv20Status } from "./bsv20";
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
  status?: Bsv20Status;
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
  status: number;
};

export type Lock = {
  until: number;
};

export type OrdinalData = {
  origin?: Origin;
  types?: string[];
  insc?: Inscription;
  map?: {
    [key: string]: any;
  };
  b?: File;
  sigma?: Sigma[];
  ordlock?: Listing;
  bsv20?: RemoteBsv20;
  lock?: Lock;
};

export type Ordinal = {
  outpoint: string;
  satoshis: number;
  owners?: string[];
  script?: string;
  spend?: string;
  height: number;
  idx: number;
  data: OrdinalData;
};

export type Origin = {
  outpoint: string;
  nonce?: number;
  map?: {
    [key: string]: any;
  };
  type?: string;
};
