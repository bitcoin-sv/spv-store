export class TxLog {
  constructor(
    public owner: string,
    public txid: string,
    public height: number = 0,
    public idx: number = 0,
  ) { }
}


export interface InventoryService {
  pollTxLogs(owner: string, fromHeight: number): Promise<TxLog[]>
}