import type { BlockHeader } from "../models/block-header";

export interface BlockStorage {
    destroy(): void;
    put(block: BlockHeader): Promise<void>;
    putMany(blocks: BlockHeader[]): Promise<void>;
    getByHash(hash: string): Promise<BlockHeader | undefined>;
    getByHeight(height: number): Promise<BlockHeader | undefined>;
    getSynced(): Promise<BlockHeader | undefined>;
}