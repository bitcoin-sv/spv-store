import { Hash, OP, Utils } from "@bsv/sdk";
import type { IndexContext } from "../models/index-context";

import {
  IndexData,
  Indexer,
  Outpoint,
  parseAddress,
  type Event,
} from "../models";

export interface File {
  hash: string;
  size: number;
  type: string;
  text?: string;
  json?: { [key: string]: any };
}

export interface Inscription {
  file?: File;
  fields?: { [key: string]: any };
  parent?: string;
}

export class InscriptionIndexer extends Indexer {
  tag = "insc";

  async parse(
    ctx: IndexContext,
    vout: number,
    previewOnly = false,
  ): Promise<IndexData | undefined> {
    const txo = ctx.txos[vout];
    if (txo.satoshis != 1n) return;
    const script = ctx.tx.outputs[vout].lockingScript;
    let fromPos: number | undefined;
    for (let i = 0; i < script.chunks.length; i++) {
      const chunk = script.chunks[i];
      if (
        i >= 2 &&
        chunk.data?.length === 3 &&
        Utils.toUTF8(chunk.data) == "ord" &&
        script.chunks[i - 1].op == OP.OP_IF &&
        script.chunks[i - 2].op == OP.OP_FALSE
      ) {
        fromPos = i + 1;
      }
    }
    if (fromPos === undefined) return;

    if (!txo.owner) txo.owner = parseAddress(script, 0);
    const insc = {
      file: { hash: "", size: 0, type: "" },
      fields: {},
    } as Inscription;

    for (let i = fromPos; i < script.chunks.length; i += 2) {
      const field = script.chunks[i];
      if (field.op == OP.OP_ENDIF) {
        if (!txo.owner) txo.owner = parseAddress(script, i + 1);
        if (!txo.owner && script.chunks[i + 1]?.op == OP.OP_CODESEPARATOR) {
          txo.owner = parseAddress(script, i + 2);
        }
        break;
      }
      if (field.op > OP.OP_16) return;
      const value = script.chunks[i + 1];
      if (value.op > OP.OP_PUSHDATA4) return;

      if (field.data?.length || 0 > 1) {
        if (!insc.fields) insc.fields = {};
        insc.fields[Buffer.from(field.data!).toString()] = value.data;
        continue;
      }
      // TODO: handle MAP

      let fieldNo = 0;
      if (field.op > OP.OP_PUSHDATA4 && field.op <= OP.OP_16) {
        fieldNo = field.op - 80;
      } else if (field.data?.length) {
        fieldNo = field.data[0];
      }
      switch (fieldNo) {
        case 0:
          insc.file!.size = value.data?.length || 0;
          if (!value.data?.length) break;
          insc.file!.hash = Utils.toHex(Hash.sha256(value.data));
          if (value.data?.length <= 1024) {
            try {
              insc.file!.text = new TextDecoder("utf8", {
                fatal: true,
              }).decode(Buffer.from(value.data));
              insc.file!.json = JSON.parse(insc.file!.text);
            } catch {
              console.log("Error parsing text");
            }
          }
          break;
        case 1:
          insc.file!.type = Buffer.from(value.data || []).toString();
          break;
        case 3:
          if (!value.data || value.data.length != 36) break;
          try {
            const parent = new Outpoint(value.data);
            if (
              !ctx.spends.find(
                (s) => s.outpoint.toString() == parent.toString(),
              )
            )
              continue;
            insc.parent = parent.toString();
          } catch {
            console.log("Error parsing parent outpoint");
          }
          break;
        default:
          if (!insc.fields) insc.fields = {};
          insc.fields[fieldNo.toString()] =
            value.data && Buffer.from(value.data).toString("base64");
      }
    }

    const events: Event[] = [];
    if (!previewOnly && txo.owner && this.owners.has(txo.owner)) {
      events.push({ id: "address", value: txo.owner });
    }
    return new IndexData(insc, events);
  }
}
