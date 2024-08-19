import type { ChainTracker } from "@bsv/sdk";
import type { BlockStorage } from "../storage/block-storage";
import EventEmitter from "events";
import type { Services } from "../case-mod-spv";

const PAGE_SIZE = 100000;

export class BlockStore implements ChainTracker {
    private syncInProgress = false;
    private stopSync = false;
    constructor(
        public storage: BlockStorage,
        public services: Services,
        public emitter?: EventEmitter,
    ) {}

    destroy() {
        this.stopSync = true;
        this.storage.destroy();
    }

    async sync(returnOnChaintip = true): Promise<void> {
        if (this.syncInProgress) return;
        this.syncInProgress = true;
        let lastHeight = 1;
        const syncedBlock = await this.storage.getSynced();
        if (syncedBlock) {
            lastHeight = syncedBlock.height > 5 ? syncedBlock.height - 5 : 1;
        }

        try {
            let blocks = await this.services.blocks.getBlocks(lastHeight, PAGE_SIZE);
            do {
                console.log('Syncing from', lastHeight);
                await this.storage.putMany(blocks);
                this.emitter?.emit('newChaintip', blocks[blocks.length - 1].height);
                blocks = await this.services.blocks.getBlocks(lastHeight, PAGE_SIZE);
            } while (blocks.length == PAGE_SIZE && !this.stopSync);
        } catch (e) {
            console.error(e);
        } finally {
            this.stopSync = false;
            this.syncInProgress = false;
            if(returnOnChaintip) {
                return
            }
            setTimeout(() => this.sync(returnOnChaintip), 1000 * 60);
        }
    }

    async isValidRootForHeight(root: string, height: number): Promise<boolean> {
        const block = await this.storage.getByHeight(height);
        return block?.merkleroot == root;
    }
}
