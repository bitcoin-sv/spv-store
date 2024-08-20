import { openDB, type DBSchema, type IDBPDatabase } from "@tempfix/idb";
import type { BlockStorage } from "../block-storage";
import type { BlockHeader } from "../../models/block-header";
import type { Network } from "../../case-mod-spv";

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
            "hash",
          );
        },
      },
    );

    return new BlockStorageIDB(db);
  }

  destroy() {
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
}
