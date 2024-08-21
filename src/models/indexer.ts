import type { TxoStore } from "../stores";
import type { IndexContext } from "./index-context";
import { IndexData } from "./index-data";
import { TxoStatus } from "./txo";

export abstract class Indexer {
  tag = "";

  constructor(
    public owners = new Set<string>(),
    public network = "mainnet",
    public syncMode = TxoStatus.TRUSTED,
  ) {}

  parse(ctx: IndexContext, vout: number): IndexData | undefined {
    return;
  }

  preSave(ctx: IndexContext): void {
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

  async sync(txoStore: TxoStore): Promise<number> {
    return 0;
  }
}
