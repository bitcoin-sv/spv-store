import {
  type BroadcastFailure,
  type BroadcastResponse,
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
import type { Network } from "../spv-store";
import type { Outpoint } from "../models/outpoint";
import type { Ordinal, RemoteBsv20 } from "../indexers/remote-types";
import type { Txn } from "../stores";

const APIS = {
  mainnet: "https://ordinals.gorillapool.io",
  testnet: "https://testnet.ordinals.gorillapool.io",
};

export class OneSatProvider
  implements BroadcastService, TxnService, BlockHeaderService, InventoryService {
  public constructor(
    public network: Network,
    // authKey?: PrivateKey
  ) { }

  async broadcast(
    tx: Transaction,
    owner?: string,
  ): Promise<BroadcastResponse | BroadcastFailure> {
    console.log("Broadcasting", tx.id("hex"), tx.toHex());
    const url = owner
      ? `${APIS[this.network]}/api/tx/address/${owner}/${tx.id("hex")}`
      : `${APIS[this.network]}/api/tx/bin`;

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: Buffer.from(tx.toBinary()),
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

  async fetchTxn(txid: string): Promise<Txn> {
    const resp = await fetch(`${APIS[this.network]}/api/tx/${txid}`);
    console.log("Fetching", txid);
    if (resp.status !== 200)
      throw new Error(`${resp.status} - Failed to fetch tx ${txid}`);
    const data = await resp.arrayBuffer();
    const reader = new Utils.Reader([...Buffer.from(data)]);
    let len = reader.readVarIntNum();
    const txn = {
      rawtx: reader.read(len)
    } as Txn;
    len = reader.readVarIntNum();
    if (len) txn.proof = reader.read(len);
    return txn;
  }

  async fetchProof(txid: string): Promise<number[] | undefined> {
    const resp = await fetch(`${APIS[this.network]}/api/tx/${txid}/proof`);
    console.log("Fetching", txid);
    if (resp.status !== 200) return
    const proof = await resp.arrayBuffer();
    return [...Buffer.from(proof)];
  }

  async fetchTxns(txids: string[]): Promise<Txn[]> {
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
    const txns: Txn[] = [];
    while (reader.pos < data.byteLength) {
      let len = reader.readVarIntNum();
      const txn = {
        rawtx: reader.read(len)
      } as Txn;
      len = reader.readVarIntNum();
      if (len) txn.proof = reader.read(len);
      txns.push(txn);
    }
    return txns;
  }

  async pollTxLogs(owner: string, fromHeight = 0): Promise<TxLog[]> {
    const resp = await fetch(
      `${APIS[this.network]}/api/tx/address/${owner}/from/${fromHeight}`,
    );
    return (
      (await resp.json()) as { txid: string; height?: number; idx?: string }[]
    ).map((l) => ({
      owner,
      txid: l.txid,
      height: l.height || Date.now(),
      idx: Number(l.idx || 0),
    }));
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

  async getSpends(outpoints: Outpoint[]): Promise<(string | undefined)[]> {
    const body = JSON.stringify(outpoints);
    const resp = await fetch(`${APIS[this.network]}/api/spends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    return resp.ok ? (resp.json() as Promise<(string | undefined)[]>) : [];
  }

  async getTxo(outpoint: Outpoint): Promise<Ordinal | undefined> {
    const resp = await fetch(
      `${APIS[this.network]}/api/txos/${outpoint.toString()}`,
    );
    return resp.ok ? (resp.json() as Promise<Ordinal>) : undefined;
  }
  async getTxos(outpoints: Outpoint[]): Promise<Ordinal[]> {
    const resp = await fetch(`${APIS[this.network]}/api/txos/outpoints`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(outpoints),
    });
    return resp.ok ? (resp.json() as Promise<Ordinal[]>) : [];
  }
  async getBsv20Details(tick: string): Promise<RemoteBsv20 | undefined> {
    const resp = await fetch(`${APIS[this.network]}/api/bsv20/tick/${tick}`);
    return resp.ok ? (resp.json() as Promise<RemoteBsv20>) : undefined;
  }
  async getBsv2021Txo(outpoint: Outpoint): Promise<RemoteBsv20 | undefined> {
    const resp = await fetch(`${APIS[this.network]}/api/bsv20/outpoint/${outpoint.toString()}`);
    return resp.ok ? (resp.json() as Promise<RemoteBsv20>) : undefined;
  }
}
