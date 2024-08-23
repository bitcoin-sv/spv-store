import type { ChainTracker } from "@bsv/sdk";
import type { BlockStorage } from "../storage/block-storage";
import type { Services } from "../casemod-spv";
import type { EventEmitter } from "../lib/event-emitter";
import type { BlockHeader } from "../models";

const PAGE_SIZE = 10000;

export class BlockStore implements ChainTracker {
  private syncRunning: Promise<void> | undefined;
  private stopSync = false;
  constructor(
    public storage: BlockStorage,
    public services: Services,
    public emitter?: EventEmitter,
  ) { }

  async destroy() {
    this.stopSync = true;
    await this.syncRunning;
    await this.storage.destroy();
  }

  async sync(returnOnChaintip = true): Promise<void> {
    if (this.syncRunning) return;
    // const doSync = async (returnOnChaintip: boolean) =>
    this.syncRunning = this.doSync(returnOnChaintip);
    if (returnOnChaintip) {
      await this.syncRunning;
      this.syncRunning = undefined;
    }
  }

  private async doSync(returnOnChaintip = true): Promise<void> {
    let lastHeight = 1;
    const syncedBlock = await this.storage.getSynced();
    if (syncedBlock) {
      lastHeight = syncedBlock.height > 5 ? syncedBlock.height - 5 : 1;
    }
    while (!this.stopSync) {
      try {
        const blocks = await this.services.blocks.getBlocks(
          lastHeight,
          PAGE_SIZE,
        );
        console.log(
          `Syncing ${PAGE_SIZE} blocks from ${lastHeight}: ${blocks.length} received`,
        );
        await this.storage.putMany(blocks);
        if (blocks.length == 0) break;
        const lastBlock = blocks[blocks.length - 1];
        this.emitter?.emit("syncedBlockHeight", lastBlock.height);
        if (blocks.length < PAGE_SIZE) break;
        lastHeight = lastBlock.height + 1;
      } catch (e) {
        if (returnOnChaintip) {
          throw e;
        }
        console.error(e);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    // this.syncInProgress = false;
    if (returnOnChaintip || this.stopSync) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 660 * 1000));
    return this.doSync(returnOnChaintip);
  }

  async isValidRootForHeight(root: string, height: number): Promise<boolean> {
    const block = await this.storage.getByHeight(height);
    return block?.merkleroot == root;
  }
}
