import type { IndexSummary } from "../models";

export class TxLog {
  summary?: IndexSummary
  source?: string
  constructor(
    public txid: string,
    public height: number = 0,
    public idx = 0,
  ) { }
}

export interface InventoryService {
  pollTxLogs(owner: string, fromHeight: number): Promise<TxLog[]>;
}
