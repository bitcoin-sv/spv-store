import type { IndexSummary } from "../models";

export class TxLog {
  // owner?: string
  summary?: IndexSummary
  source?: string
  constructor(
    public txid: string,
    public height: number = 0,
    public idx = 0,
    public owner?: string,
  ) { }
}

export interface InventoryService {
  pollTxLogs(owner: string, fromHeight: number): Promise<TxLog[]>;
}
