import type { IndexContext } from "../models/index-context";
import { OP, Script, Utils } from "@bsv/sdk";
import {
  Indexer,
  IndexData,
} from "../models";

export const MAP_PROTO = "1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5"
export class MapIndexer extends Indexer {
  tag = "map";
  name = "MAP";

  async parse(ctx: IndexContext, vout: number): Promise<IndexData | undefined> {
    const script = ctx.tx.outputs[vout].lockingScript;

    let retPos = 0
    let mapPos = 0;
    for (let i = retPos + 1; i < script.chunks.length; i++) {
      const chunk = script.chunks[i];
      if (!retPos || chunk.op === OP.OP_RETURN) {
        retPos = i;
      } else if (!retPos || chunk.data?.length !== 1 || chunk.data[0] !== 0x7c) {
        continue;
      }

      if (Utils.toUTF8(script.chunks[++i]?.data || []) !== MAP_PROTO) {
        continue;
      }
      mapPos = ++i;
      break;
    }
    if (!mapPos) return;
    const map = MapIndexer.parseMap(script, mapPos);
    if (!map) return;
    return new IndexData(map);
  }

  static parseMap(script: Script, mapPos: number): { [key: string]: any } | undefined {
    if (Utils.toUTF8(script.chunks[mapPos]?.data || []) !== "SET") {
      return;
    }
    const map: { [key: string]: any } = {};
    for (let i = mapPos+1; i < script.chunks.length; i += 2) {
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
    return map;
  }
}
