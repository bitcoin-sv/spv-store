import type { BlockHeader } from "../models/block-header";

export interface BlockHeaderService {
    getBlocks(lastHeight: number, limit: number): Promise<BlockHeader[]>;
    getChaintip(): Promise<BlockHeader>;
}
