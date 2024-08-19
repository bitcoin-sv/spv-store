import { Hash, OP, P2PKH, Utils } from "@bsv/sdk";
import type { IndexContext } from "../models/index-context";
import { TxoStore } from "../stores/txo-store";
import type { Ordinal } from "./remote-types";
import {
  Block,
  IndexData,
  Indexer,
  Ingest,
  Outpoint,
  parseAddress,
  Txo,
  TxoStatus,
  type Event,
} from "../models";

export interface File {
  hash: string;
  size: number;
  type: string;
  text?: string;
  json?: { [key: string]: any };
}

export interface OriginData {
  insc?: Inscription;
  map?: { [key: string]: any };
}

export class Origin {
  constructor(
    public outpoint: string,
    public nonce: number,
    public data: OriginData = {},
  ) {}
}

export interface Inscription {
  file: File;
  fields?: { [key: string]: any };
  parent?: string;
}

export class Ord {
  insc?: Inscription;
  origin?: Origin;
}

export class OrdIndexer extends Indexer {
  tag = "ord";

  parse(ctx: IndexContext, vout: number): IndexData | undefined {
    const txo = ctx.txos[vout];
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

    const ord: Ord = {};
    if (!txo.owner) txo.owner = parseAddress(script, 0);

    const events: Event[] = [];
    const deps: string[] = [];
    if (fromPos !== undefined) {
      const insc = (ord.insc = {
        file: { hash: "", size: 0, type: "" },
        fields: {},
      } as Inscription);
      const script = ctx.tx.outputs[vout].lockingScript;
      // const events: { id: string, value: string }[] = []
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
            insc.file.size = value.data?.length || 0;
            if (!value.data?.length) break;
            insc.file.hash = Buffer.from(Hash.sha256(value.data)).toString(
              "hex",
            );
            events.push({ id: "hash", value: insc.file.hash });
            if (value.data?.length <= 1024) {
              try {
                insc.file.text = new TextDecoder("utf8", {
                  fatal: true,
                }).decode(Buffer.from(value.data));
                const words = new Set<string>();
                insc.file.text.split(/\W+/).forEach((word) => {
                  if (word.length > 3 && word.length < 20) {
                    words.add(word);
                  }
                });
                words.forEach((word) =>
                  events.push({ id: "word", value: word }),
                );
              } catch {
                console.log("Error parsing text");
              }
              if (insc.file.text) {
                try {
                  insc.file.json = JSON.parse(insc.file.text);
                } catch {
                  console.log("Error parsing json");
                }
              }
            }
            break;
          case 1:
            insc.file.type = Buffer.from(value.data || []).toString();
            events.push({ id: "type", value: insc.file.type });
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
              events.push({ id: "parent", value: parent.toString() });
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
    }
    if (!ord.insc && txo.satoshis != 1n) return;
    let outSat = 0n;
    for (let i = 0; i < vout; i++) {
      outSat += ctx.txos[i].satoshis;
    }
    let inSat = 0n;
    for (const spend of ctx.spends) {
      deps.push(spend.outpoint.toString());
      if (inSat == outSat && spend.satoshis == 1n) {
        if ((spend.data.ord?.data as Ord)?.origin) {
          ord.origin = Object.assign(
            {},
            spend.data.ord?.data?.origin,
          ) as Origin;
          ord.origin.nonce++;
        }
        break;
      } else if (inSat > outSat) {
        break;
      }
      inSat += spend.satoshis;
    }
    if (!ord.origin) {
      ord.origin = new Origin(txo.outpoint.toString(), 0);
    }

    if (ord.origin) {
      ord.origin.data = txo.data.ord?.data?.origin?.data;
      if (txo.data.map) {
        ord.origin.data.map = Object.assign(
          ord.origin.data?.map || {},
          txo.data.map.data,
        );
      }
      events.push({ id: "origin", value: ord.origin.outpoint });
    }

    if (txo.owner && this.owners.has(txo.owner)) {
      events.push({ id: "address", value: txo.owner });
      return new IndexData(ord, deps, events);
    }
    return new IndexData(ord);
  }

  fromObj(obj: IndexData): IndexData {
    const ord: Ord = {};
    Object.assign(ord, obj.data);
    return new IndexData(ord, obj.deps);
  }

  async sync(txoStore: TxoStore): Promise<number> {
    const limit = 10000;
    let lastHeight = 0;
    for await (const owner of this.owners) {
      let txos: { txid: string; idx: string; height?: number }[] = [];
      let offset = 0;
      if (this.syncMode !== TxoStatus.TRUSTED) {
        do {
          const resp = await fetch(
            `https://ordinals.gorillapool.io/api/inscriptions/address/${owner}/ancestors?limit=${limit}&offset=${offset}`,
          );
          txos = (await resp.json()) as {
            txid: string;
            idx: string;
            height?: number;
          }[];
          const txns = txos.map(
            (t) =>
              new Ingest(
                t.txid,
                t.height || Date.now(),
                parseInt(t.idx || "0"),
                true,
              ),
          );
          await txoStore.queue(txns);
        } while (txos.length == limit);
      }
      let utxos: Ordinal[] = [];
      offset = 0;
      do {
        const url = `https://ordinals.gorillapool.io/api/txos/address/${owner}/unspent?limit=${limit}&offset=${offset}&bsv20=false`;
        const resp = await fetch(url);
        utxos = (await resp.json()) as Ordinal[];
        const ingests = utxos.map(
          (u) =>
            new Ingest(
              u.txid,
              u.height,
              u.idx || 0,
              false,
              true,
              this.syncMode === TxoStatus.TRUSTED,
            ),
        );
        await txoStore.queue(ingests);

        const txos = utxos.map((u) => {
          const ord: Ord = {};
          const events: Event[] = [{ id: "address", value: owner }];
          if (u.origin?.data?.insc && u.origin?.data?.insc?.file) {
            ord.insc = { file: u.origin.data.insc.file };
            if (ord.insc.file.type) {
              events.push({ id: "type", value: ord.insc.file.type });
            }
          }
          if (u.origin) {
            ord.origin = new Origin(u.origin.outpoint, 0);
            events.push({ id: "origin", value: ord.origin.outpoint });
          }

          if (!ord.origin && !ord.insc) return;
          const txo = new Txo(
            new Outpoint(u.outpoint),
            1n,
            new P2PKH().lock(Utils.fromBase58Check(owner).data).toBinary(),
            TxoStatus.TRUSTED,
          );
          if (u.height) {
            txo.block = new Block(u.height, BigInt(u.idx || 0));
          }
          txo.data[this.tag] = new IndexData(ord, undefined, events);
          if (u.data?.list && u.data?.list.payout && u.data?.list.price) {
            const price = BigInt(u.data.list.price);
            txo.data.list = new IndexData(
              {
                payout: Utils.toArray(u.data.list.payout, "base64"),
                price,
              },
              undefined,
              [{ id: "price", value: price.toString(16).padStart(16, "0") }],
            );
          }
          lastHeight = Math.max(lastHeight, u.height || 0);
          return txo.toObject();
        });

        await txoStore.storage.putMany(txos.filter((t) => t) as Txo[]);
        offset += limit;
      } while (utxos.length == limit);
    }
    return lastHeight;
  }
}