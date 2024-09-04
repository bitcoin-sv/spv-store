import { openDB, type DBSchema, type IDBPDatabase } from "@tempfix/idb";
import type { BlockStorage } from "../block-storage";
import { writeBlockHeader, type BlockHeader } from "../../models/block-header";
import type { Network } from "../../casemod-spv";
import { Utils } from "@bsv/sdk";

const BLOCK_DB_VERSION = 1;

export interface BlockSchema extends DBSchema {
  blocks: {
    key: number;
    value: BlockHeader;
    indexes: {
      hash: string;
    };
  };
}

export class BlockStorageIDB implements BlockStorage {
  private constructor(public db: IDBPDatabase<BlockSchema>) {}

  static async init(network: Network): Promise<BlockStorageIDB> {
    const db = await openDB<BlockSchema>(
      `blocks-${network}`,
      BLOCK_DB_VERSION,
      {
        upgrade(db) {
          db.createObjectStore("blocks", { keyPath: "height" }).createIndex(
            "hash",
            "hash"
          );
        },
      }
    );

    return new BlockStorageIDB(db);
  }

  async destroy() {
    this.db.close();
  }

  async put(block: BlockHeader): Promise<void> {
    await this.db.put("blocks", block);
  }

  async putMany(blocks: BlockHeader[]): Promise<void> {
    if (!blocks.length) return;
    const t = this.db.transaction("blocks", "readwrite");
    for (const block of blocks) {
      t.store.put(block);
    }
    await t.done;
  }

  async getByHash(hash: string): Promise<BlockHeader | undefined> {
    return this.db.getFromIndex("blocks", "hash", hash).catch(() => undefined);
  }

  async getByHeight(height: number): Promise<BlockHeader | undefined> {
    return this.db.get("blocks", height).catch(() => undefined);
  }

  async getSynced(): Promise<BlockHeader | undefined> {
    const db = await this.db;
    const t = db.transaction("blocks", "readonly");
    const cursor = await t.store.openCursor(null, "prev");
    const block = cursor?.value;
    await t.done;
    return block;
  }

  async getAll(): Promise<BlockHeader[]> {
    return this.db.getAll("blocks");
  }

  async getBackup(): Promise<number[][]> {
    let writer = new Utils.Writer();
    const t = this.db.transaction("blocks", "readonly");
    let headers: number[][] = [];
    let count = 0;
    let prevHash =
      "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f";
    for await (const cursor of t.store.iterate()) {
      const header = cursor.value;
      header.prevHash = prevHash;
      prevHash = header.hash;
      writeBlockHeader(writer, cursor.value);
      if (++count === 10000) {
        headers.push(writer.toArray());
        writer = new Utils.Writer();
        count = 0;
      }
    }
    await t.done;
    if (count) {
      headers.push(writer.toArray());
    }
    return headers;
  }
}
