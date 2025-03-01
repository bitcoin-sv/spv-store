import type { ParseMode } from "./indexer";

export enum IngestStatus {
  FAILED = -1,
  QUEUED = 0,
  // DOWNLOADED = 1,
  INGESTED = 2,
  CONFIRMED = 3,
  IMMUTABLE = 4,
}

export interface Ingest {
  txid: string;
  height: number;
  idx: number;
  source?: string;
  parseMode: ParseMode;
  downloadOnly?: boolean;
  outputs?: number[];
  status?: IngestStatus;
}
