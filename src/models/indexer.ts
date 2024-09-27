import type { SPVStore, Network } from "../spv-store";
import type { TxoStore } from "../stores";
import type { IndexContext } from "./index-context";
import { IndexData } from "./index-data";
import type { Ingest } from "./ingest";

export enum IndexMode {
  Trust = 1,
  Verify = 2,
  TrustAndVerify = 3,
}

export abstract class Indexer {
  tag = "";
  name = ""

  constructor(
    public owners = new Set<string>(),
    public mode: IndexMode,
    public network: Network = "mainnet",
  ) { }

  async parse(
    ctx: IndexContext,
    vout: number,
    previewOnly = false,
  ): Promise<IndexData | undefined> {
    return;
  }

  async preSave(ctx: IndexContext): Promise<void> {
    return;
  }

  static parseEvent(event: string) {
    const [tag, id, value, spent, sort, idx, vout, satoshis] = event.split(":");
    return {
      tag,
      id,
      value,
      spent: spent === "1",
      sort: parseInt(sort, 16),
      idx: parseInt(idx),
      vout: parseInt(vout),
      satoshis: BigInt(satoshis),
    };
  }

  async sync(txoStore: TxoStore, ingestQueue: {[txid: string]: Ingest}): Promise<void> { }
}
