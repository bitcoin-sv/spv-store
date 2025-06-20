import { Hash, OP, Script, Utils } from "@bsv/sdk";
import type { IndexContext } from "../models/index-context";

import {
  type IndexData,
  Indexer,
  Outpoint,
  parseAddress,
  type Event,
} from "../models";
import { MAP_PROTO, MapIndexer } from "./map";

export interface File {
  hash: string;
  size: number;
  type: string;
  content: number[];
}

export interface Inscription {
  file?: File;
  fields?: { [key: string]: any };
  parent?: string;
}

export class InscriptionIndexer extends Indexer {
  tag = "insc";
  name = "Inscriptions";

  async parse(
    ctx: IndexContext,
    vout: number,
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
        break;
      }
    }
    if (fromPos === undefined) return;

    if (!txo.owner) txo.owner = parseAddress(script, 0, this.network);
    const insc = {
      file: { hash: "", size: 0, type: "" },
      fields: {},
    } as Inscription;

    for (let i = fromPos; i < script.chunks.length; i += 2) {
      const field = script.chunks[i];
      if (field.op == OP.OP_ENDIF) {
        if (!txo.owner) txo.owner = parseAddress(script, i + 1, this.network);
        if (!txo.owner && script.chunks[i + 1]?.op == OP.OP_CODESEPARATOR) {
          txo.owner = parseAddress(script, i + 2);
        }
        break;
      }
      if (field.op > OP.OP_16) return;
      const value = script.chunks[i + 1];
      if (value.op > OP.OP_PUSHDATA4) return;

      if (field.data?.length && Utils.toUTF8(field.data) == MAP_PROTO) {
        const map = MapIndexer.parseMap(Script.fromBinary(value.data || []), 0);
        if (map) {
          txo.data["map"] = { data: map };
        }
        continue;
      }

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
          insc.file!.hash = Utils.toBase64(Hash.sha256(value.data));
          insc.file!.content = value.data;
          break;
        case 1:
          insc.file!.type = Buffer.from(value.data || []).toString();
          break;
        case 3:
          if (!value.data || value.data.length != 36) break;
          try {
            const parent = new Outpoint(value.data);
            // TODO: Not sure this is correct
            if (!ctx.spends.find((s) => s.outpoint.toString() == parent.toString())) break;
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
    if (txo.owner && this.owners.has(txo.owner)) {
      events.push({ id: "address", value: txo.owner });
    }
    return {
      data: insc,
      events,
    }
  }

  static serialize(insc: Inscription): string {
    return JSON.stringify({
      file: insc.file && {
        hash: insc.file.hash,
        size: insc.file.size,
        type: insc.file.type,
        content: Utils.toBase64(insc.file.content),
      },
      fields: insc.fields,
      parent: insc.parent,
    })
  }

  serialize(obj: any): string {
    return InscriptionIndexer.serialize(obj);
  }

  static deserialize(str: string): Inscription {
    const insc = JSON.parse(str);
    if (insc.file) {
      insc.file.content = Utils.toArray(insc.file.content, 'base64');
    }
    return insc as Inscription;
  }

  deserialize(str: string): any {
    return InscriptionIndexer.deserialize(str);
  }
}
