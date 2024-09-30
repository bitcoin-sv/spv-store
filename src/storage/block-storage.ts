import type { BlockHeader } from "../models/block-header";

/**
 * Interface representing a block storage system.
 */
export interface BlockStorage {
  /**
   * Destroys the block storage, releasing any resources held.
   * @returns A promise that resolves when the storage is destroyed.
   */
  destroy(): Promise<void>;

  /**
   * Stores a single block header.
   * @param block - The block header to store.
   * @returns A promise that resolves when the block header is stored.
   */
  put(block: BlockHeader): Promise<void>;

  /**
   * Stores multiple block headers.
   * @param blocks - An array of block headers to store.
   * @returns A promise that resolves when all block headers are stored.
   */
  putMany(blocks: BlockHeader[]): Promise<void>;

  /**
   * Retrieves a block header by its hash.
   * @param hash - The hash of the block header to retrieve.
   * @returns A promise that resolves with the block header if found, or undefined if not found.
   */
  getByHash(hash: string): Promise<BlockHeader | undefined>;

  /**
   * Retrieves a block header by its height.
   * @param height - The height of the block header to retrieve.
   * @returns A promise that resolves with the block header if found, or undefined if not found.
   */
  getByHeight(height: number): Promise<BlockHeader | undefined>;

  /**
   * Retrieves all block headers.
   * @returns A promise that resolves with an array of all block headers.
   */
  getAll(): Promise<BlockHeader[]>;

  /**
   * Retrieves a backup of the block storage.
   * @returns A promise that resolves with a 2D array representing the backup.
   */
  getBackup(): Promise<number[][]>;

  /**
   * Retrieves the most recently synced block header.
   * @returns A promise that resolves with the most recently synced block header, or undefined if none are synced.
   */
  getSynced(): Promise<BlockHeader | undefined>;
}
