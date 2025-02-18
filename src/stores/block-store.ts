import type { ChainTracker } from "@bsv/sdk";
import type { BlockStorage } from "../storage/block-storage";
import type { Services } from "../spv-store";
import type { EventEmitter } from "../lib/event-emitter";
import type { BlockHeader } from "../models";

const PAGE_SIZE = 10000;

export class BlockStore implements ChainTracker {
  private syncRunning: Promise<void> | undefined;
  private stopSync = false;
  constructor(
    public storage: BlockStorage,
    public services: Services,
    public emitter?: EventEmitter
  ) {}

  async destroy() {
    this.stopSync = true;
    await this.syncRunning;
    await this.storage.destroy();
  }

  /**
   * Synchronizes the block store with the blockchain.
   * 
   * @param returnOnChaintip - If true, the method will wait until the sync is complete before returning.
   * @returns A promise that resolves when the synchronization is complete.
   */
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
    let syncedBlock = await this.storage.getSynced();
    if (syncedBlock) {
      lastHeight = syncedBlock.height > 5 ? syncedBlock.height - 5 : 1;
    }
    while (!this.stopSync) {
      try {
        const blocks = await this.services.blocks.getBlocks(
          lastHeight,
          PAGE_SIZE
        );
        console.log(
          `Syncing ${PAGE_SIZE} blocks from ${lastHeight}: ${blocks.length} received`
        );
        await this.storage.putMany(blocks);
        if (blocks.length == 0) break;
        if (syncedBlock?.hash != blocks[blocks.length - 1].hash) {
          this.emitter?.emit("syncedBlockHeight", blocks[blocks.length - 1].height);
        }
        syncedBlock = blocks[blocks.length - 1];
        if (blocks.length < PAGE_SIZE) break;
        lastHeight = syncedBlock.height + 1;
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
    await new Promise((resolve) => setTimeout(resolve, 60 * 1000));
    return this.doSync(returnOnChaintip);
  }

  /**
   * Checks if the given root is valid for the specified block height.
   *
   * @param root - The Merkle root to validate.
   * @param height - The height of the block to check.
   * @returns A promise that resolves to `true` if the root is valid for the given height, otherwise `false`.
   */
  async isValidRootForHeight(root: string, height: number): Promise<boolean> {
    const block = await this.storage.getByHeight(height);
    return block?.merkleroot == root;
  }

  /**
   * Retrieves the current chaintip from the storage.
   *
   * @returns {Promise<BlockHeader | undefined>} A promise that resolves to the current chaintip block header, or undefined if not available.
   */
  async getChaintip(): Promise<BlockHeader | undefined> {
    return this.storage.getSynced();
  }

  async currentHeight(): Promise<number> {
    const chaintip = await this.getChaintip();
    return chaintip?.height || 0;
  }
}
