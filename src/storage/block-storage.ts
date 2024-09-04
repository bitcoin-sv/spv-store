import type { BlockHeader } from "../models/block-header";

export interface BlockStorage {
  destroy(): Promise<void>;
  put(block: BlockHeader): Promise<void>;
  putMany(blocks: BlockHeader[]): Promise<void>;
  getByHash(hash: string): Promise<BlockHeader | undefined>;
  getByHeight(height: number): Promise<BlockHeader | undefined>;
  getAll(): Promise<BlockHeader[]>;
  getBackup(): Promise<number[][]>;
  getSynced(): Promise<BlockHeader | undefined>;
}
