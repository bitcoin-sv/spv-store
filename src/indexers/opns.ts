import type { IndexContext } from "../models/index-context";
import { Indexer } from "../models/indexer";
import { IndexData } from "../models/index-data";
import type { Inscription } from "./insc";

export class OpNSIndexer extends Indexer {
  tag = "opns";
  name = "OpNS";
  async parse(ctx: IndexContext, vout: number): Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    const insc = txo.data.insc?.data as Inscription;
    if (insc?.file?.type !== "application/op-ns") return;

    const data = new IndexData(insc);
    return data;
  }
}
