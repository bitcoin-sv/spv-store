import type { IndexContext } from "../models/index-context";
import {
  Indexer,
  IndexData,
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
        // if (cosign.address && this.owners.has(cosign.address)) {
        // }
        return new IndexData(cosign);
      }
    }

    // const address = parseAddress(script, 0, this.network);
    // if (txo.satoshis < 2n) return;
    // const events: Event[] = [];
    // if (address && this.owners.has(address)) {
    //   txo.owner = address;
    //   events.push({ id: "address", value: address });
      
    // }
  }

  // async preSave(ctx: IndexContext): Promise<void> {
  //   let satsOut = ctx.spends.reduce((acc, spends) => {
  //     if (!spends.data[this.tag]) return acc;
  //     return acc + (spends.owner && this.owners.has(spends.owner) ?
  //       spends.satoshis :
  //       0n);
  //   }, 0n);
  //   let satsIn = ctx.txos.reduce((acc, txo) => {
  //     if (!txo.data[this.tag]) return acc;
  //     return acc + (txo.owner && this.owners.has(txo.owner) ?
  //       txo.satoshis :
  //       0n);
  //   }, 0n);
  //   const balance = Number(satsIn - satsOut);
  //   if (balance) {
  //     ctx.summary[this.tag] = {
  //       amount: balance,
  //     };
  //   }
  // }
}
