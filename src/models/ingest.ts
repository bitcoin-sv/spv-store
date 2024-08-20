export enum IngestStatus {
  FAILED = -1,
  QUEUED = 0,
  DOWNLOADED = 1,
  INGESTED = 2,
  CONFIRMED = 3,
  IMMUTABLE = 4,
}

export class Ingest {
  status = IngestStatus.QUEUED;
  constructor(
    public txid: string,
    public height: number,
    public idx = 0,
    public isDep = false,
    public checkSpends = false,
    public downloadOnly = false,
  ) {
    if (!idx) {
      this.idx = 0;
    } else if (typeof idx == "string") {
      this.idx = parseInt(idx);
    }
  }
}
