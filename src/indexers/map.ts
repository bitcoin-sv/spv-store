import type { IndexContext } from "../models/index-context";
import { OP, Utils } from "@bsv/sdk";
import {
  Indexer,
  IndexData,
} from "../models";

const MAP = "1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5"
export class MapIndexer extends Indexer {
  tag = "map";

  async parse(ctx: IndexContext, vout: number): Promise<IndexData | undefined> {
    const script = ctx.tx.outputs[vout].lockingScript;

    let retPos = 0
    const map: { [key: string]: any } = {};
    let mapPos = 0;
    for (let i = retPos + 1; i < script.chunks.length; i++) {
      const chunk = script.chunks[i];
      if (!retPos || chunk.op === OP.OP_RETURN) {
        retPos = i;
      } else if (!retPos || chunk.data?.length !== 1 || chunk.data[0] !== 0x7c) {
        continue;
      }

      if (Utils.toUTF8(script.chunks[++i]?.data || []) !== MAP) {
        continue;
      } else if (Utils.toUTF8(script.chunks[++i]?.data || []) !== "SET") {
        continue;
      }
      mapPos = ++i;
      break;
    }
    if (!mapPos) return;
    for (let i = mapPos; i < script.chunks.length; i += 2) {
      const chunk = script.chunks[i];
      if (chunk.op === OP.OP_RETURN || (chunk.data?.length == 1 && chunk.data[0] !== 0x7c)) break;
      const key = Utils.toUTF8(chunk.data || []);
      const value = Utils.toUTF8(script.chunks[i+1]?.data || []);
      if (key == 'subTypeData') {
        map[key] = JSON.parse(value);
      } else {
        map[key] = value;
      }
    }
    return new IndexData(map);
  }
}
