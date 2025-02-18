import type { IndexContext } from "../models/index-context";
import {
  Indexer,
  type IndexData,
} from "../models";
import { OP, Utils } from "@bsv/sdk"

export interface Cosign {
  address: string;
  cosigner: string;
}

export class CosignIndexer extends Indexer {
  tag = "cosign";
  name = "Cosign";

  async parse(ctx: IndexContext, vout: number): Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    const script = ctx.tx.outputs[vout].lockingScript;
    const chunks = script.chunks;
    for (let i = 0; i <= chunks.length - 6; i++) {
      if (
        chunks[0 + i].op === OP.OP_DUP &&
        chunks[1 + i].op === OP.OP_HASH160 &&
        chunks[2 + i].data?.length === 20 &&
        chunks[3 + i].op === OP.OP_EQUALVERIFY &&
        chunks[4 + i].op === OP.OP_CHECKSIGVERIFY &&
        chunks[5 + i].data?.length === 33 &&
        chunks[6 + i].op === OP.OP_CHECKSIG
      ) {
        const cosign: Cosign = {
          cosigner: Utils.toHex(chunks[5 + i].data || []),
          address: Utils.toBase58Check(chunks[2 + i].data || [], this.network == 'mainnet' ? [0] : [111]),
        };
        txo.owner = cosign.address;
        return { data: cosign };
      }
    }
  }
}
