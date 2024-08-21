import {
  type BroadcastFailure,
  type BroadcastResponse,
  MerklePath,
  Transaction,
  Utils,
} from "@bsv/sdk";
import {
  type BlockHeaderService,
  type BroadcastService,
  BroadcastStatus,
  type BroadcastStatusResponse,
  type InventoryService,
  TxLog,
  type TxnService,
} from "../services";
import type { BlockHeader } from "../models/block-header";
import type { Network } from "../casemod-spv";
import type { Outpoint } from "../models/outpoint";

const APIS = {
  mainnet: "https://ordinals.gorillapool.io",
  testnet: "https://testnet.ordinals.gorillapool.io",
};

export class OneSatProvider
  implements BroadcastService, TxnService, BlockHeaderService, InventoryService
{
  public constructor(
    public network: Network,
    // authKey?: PrivateKey
  ) {}

  async broadcast(
    tx: Transaction,
    owner?: string,
  ): Promise<BroadcastResponse | BroadcastFailure> {
    console.log("Broadcasting", tx.id("hex"), tx.toHex());
    let url = owner
      ? `${APIS[this.network]}/api/tx/address/${owner}/${tx.id("hex")}`
      : `${APIS[this.network]}/api/tx`;

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: Uint8Array.from(tx.toBinary()),
    });
    const body = (await resp.json()) as string | { message: string };
    if (resp.status !== 200) {
      return {
        status: "error",
        code: resp.status.toString(),
        description: `${(body as { message: string }).message}`,
      } as BroadcastFailure;
    }
    return {
      status: "success",
      txid: body,
      message: "Transaction broadcast successfully",
    } as BroadcastResponse;
  }

  async status(txid: string): Promise<BroadcastStatusResponse | undefined> {
    const resp = await fetch(`${APIS[this.network]}/api/tx/${txid}/proof`);
    switch (resp.status) {
      case 200:
        return {
          status: BroadcastStatus.CONFIRMED,
          proof: [...Buffer.from(await resp.arrayBuffer())],
        };
      case 404:
        return { status: BroadcastStatus.MEMPOOL };
      default:
        return undefined;
    }
  }

  async fetch(txid: string): Promise<Transaction> {
    const resp = await fetch(`${APIS[this.network]}/api/tx/${txid}`);
    console.log("Fetching", txid);
    if (resp.status !== 200)
      throw new Error(`${resp.status} - Failed to fetch tx ${txid}`);
    const beef = await resp.arrayBuffer();
    return Transaction.fromBEEF([...Buffer.from(beef)]);
  }

  async batchFetch(txids: string[]): Promise<Transaction[]> {
    const resp = await fetch(`${APIS[this.network]}/api/tx/batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(txids),
    });
    if (resp.status !== 200)
      throw new Error(
        `${resp.status} - Failed to fetch txs: ${await resp.text()}`,
      );
    const data = await resp.arrayBuffer();
    const reader = new Utils.Reader([...Buffer.from(data)]);
    const txs: Transaction[] = [];
    while (reader.pos < data.byteLength) {
      let len = reader.readVarIntNum();
      const rawtx = reader.read(len);
      const tx = Transaction.fromBinary(rawtx);
      len = reader.readVarIntNum();
      if (len) tx.merklePath = MerklePath.fromBinary(reader.read(len));
      txs.push(tx);
    }
    return txs;
  }

  async pollTxLogs(owner: string, fromHeight = 0): Promise<TxLog[]> {
    const resp = await fetch(
      `${APIS[this.network]}/api/tx/address/${owner}/from/${fromHeight}`,
    );
    return (
      (await resp.json()) as { txid: string; height?: number; idx?: string }[]
    ).map(
      (l) =>
        new TxLog(owner, l.txid, l.height || Date.now(), Number(l.idx || 0)),
    );
  }

  async getBlocks(lastHeight: number, limit = 1000): Promise<BlockHeader[]> {
    const resp = await fetch(
      `${APIS[this.network]}/api/blocks/list/${lastHeight}?limit=${limit}`,
    );
    return resp.json() as Promise<BlockHeader[]>;
  }

  async getChaintip(): Promise<BlockHeader> {
    const resp = await fetch(`${APIS[this.network]}/api/blocks/tip`);
    return resp.json() as Promise<BlockHeader>;
  }

  async getSpend(outpoint: Outpoint): Promise<string | undefined> {
    const resp = await fetch(
      `${APIS[this.network]}/api/spends/${outpoint.toString()}`,
    );
    return resp.ok ? (resp.json() as Promise<string>) : undefined;
  }

  async getSpends(outpoints: Outpoint[]): Promise<(string | undefined)[]> {
    const resp = await fetch(`${APIS[this.network]}/api/spends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(outpoints),
    });
    return resp.ok ? (resp.json() as Promise<(string | undefined)[]>) : [];
  }
}
