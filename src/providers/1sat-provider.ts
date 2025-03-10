import {
  type BroadcastFailure,
  type BroadcastResponse,
  MerklePath,
  Transaction,
} from "@bsv/sdk";
import {
  type AccountService,
  type BlockHeaderService,
  type BroadcastService,
  BroadcastStatus,
  type BroadcastStatusResponse,
  type Query,
  type TxnService,
  type TxSyncLog,
} from "../services";
import type { BlockHeader } from "../models/block-header";
import type { Network } from "../spv-store";
import type { Outpoint } from "../models/outpoint";
import type { Ordinal, RemoteBsv20 } from "../indexers/remote-types";
import type { File } from "../indexers";
import { NotFoundError } from "../lib/errors";

export const APIS = {
  // mainnet: "http://morovol:8081",
  mainnet: "https://ordinals.1sat.app",
  // mainnet: "https://ordinals.gorillapool.io",
  testnet: "https://testnet.ordinals.gorillapool.io",
};

export const LEGACY_APIS = {
  mainnet: "https://ordinals.gorillapool.io",
  testnet: "https://testnet.ordinals.gorillapool.io",
};

export class OneSatProvider
  implements AccountService, BlockHeaderService, BroadcastService, TxnService {
  // public subscriptions = new Map<string, (topic: string, event: string) => void>();
  public eventSource: EventSource | undefined;

  public constructor(
    public network: Network,
    public accountId?: string,
    // public authKey?: PrivateKey,
  ) { }

  async register(addresses: string[]): Promise<void> {
    const resp = await fetch(`${APIS[this.network]}/v5/acct/${this.accountId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addresses),
    });
    if (!resp.ok) throw new Error("Failed to register account");
  }

  async broadcast(
    tx: Transaction
  ): Promise<BroadcastResponse | BroadcastFailure> {
    console.log("Broadcasting", tx.id("hex"), tx.toHex());
    const url = `${APIS[this.network]}/v5/tx`;

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: Buffer.from(tx.toBinary()),
    });
    const body = (await resp.json()) as { txid: string, success: boolean, error: string, status: number };
    if (resp.status !== 200) {
      return {
        status: "error",
        code: resp.status.toString(),
        description: body.error,
      } as BroadcastFailure;
    }
    return {
      status: "success",
      txid: body.txid,
      message: "Transaction broadcast successfully",
    } as BroadcastResponse;
  }

  async status(txid: string): Promise<BroadcastStatusResponse | undefined> {
    const resp = await fetch(`${APIS[this.network]}/v1/tx/${txid}/proof`);
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

  async fetchBeef(txid: string): Promise<Transaction> {
    const resp = await fetch(`${APIS[this.network]}/v5/tx/${txid}/beef`);
    if (resp.status == 404) throw NotFoundError;
    if (resp.status !== 200){
      throw new Error(`${resp.status} - Failed to fetch beef for tx ${txid}`);
    }
    const beef = [...Buffer.from(await resp.arrayBuffer())]
    return Transaction.fromAtomicBEEF(beef);
  }

  async fetchProof(txid: string): Promise<MerklePath | undefined> {
    const resp = await fetch(`${APIS[this.network]}/v5/tx/${txid}/proof`);
    console.log("Fetching", txid);
    if (resp.status !== 200) return;
    const proof = await resp.arrayBuffer();
    return MerklePath.fromBinary([...Buffer.from(proof)]);
  }

  async getBlocks(lastHeight: number, limit = 1000): Promise<BlockHeader[]> {
    const resp = await fetch(
      `${APIS[this.network]}/v5/blocks/list/${lastHeight}?limit=${limit}`
    );

    return (await resp.json() as any[]).map(bh => {
      return bh as BlockHeader;
    });
  }

  async getChaintip(): Promise<BlockHeader> {
    const resp = await fetch(`${APIS[this.network]}/v5/blocks/tip`);
    if (!resp.ok) throw new Error("Failed to fetch chaintip");
    return resp.json() as Promise<BlockHeader>;
  }

  async utxos(refresh = false): Promise<Ordinal[]> {
    const resp = await fetch(
      `${APIS[this.network]}/v5/acct/${this.accountId}/utxos?txo=true&limit=0&tags=*${refresh ? "&refresh=true" : ""}`,
    );
    return ((await resp.json()) as Ordinal[]) || [];
  }

  async txosByAddress(address: string, unspent = true): Promise<Ordinal[]> {
    const resp = await fetch(
      `${APIS[this.network]}/v5/own/${address}/txos?txo=true&limit=0&tags=*&unspent=${unspent}`,
    );
    return ((await resp.json()) as Ordinal[]) || [];
  }

  async getTxo(outpoint: Outpoint): Promise<Ordinal | undefined> {
    const resp = await fetch(
      `${APIS[this.network]}/v5/txo/${outpoint.toString()}?txo=true&tags=*`
    );
    return resp.ok ? (resp.json() as Promise<Ordinal>) : undefined;
  }

  async getTxos(outpoints: Outpoint[]): Promise<Ordinal[]> {
    const resp = await fetch(`${APIS[this.network]}/v5/txos/outpoints?txo=true&tags=*`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(outpoints),
    });
    return resp.ok ? (await resp.json() as Ordinal[]).map(o => o) : [];
  }

  async getBsv20Details(tick: string): Promise<RemoteBsv20 | undefined> {
    const resp = await fetch(`${LEGACY_APIS[this.network]}/api/bsv20/tick/${tick}`);
    return resp.ok ? (resp.json() as Promise<RemoteBsv20>) : undefined;
  }
  
  async getBsv2021Txo(outpoint: Outpoint): Promise<RemoteBsv20 | undefined> {
    const resp = await fetch(
      `${LEGACY_APIS[this.network]}/api/bsv20/outpoint/${outpoint.toString()}`
    );
    return resp.ok ? (resp.json() as Promise<RemoteBsv20>) : undefined;
  }

  async getOriginAncestors(outpoints: string[]): Promise<Ordinal[]> {
    if (!outpoints.length) return [];
    const resp = await fetch(`${APIS[this.network]}/v5/origins/ancestors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(outpoints),
    });
    return resp.ok ? (await resp.json() as Ordinal[]) : [];

  }

  async getInscriptionFile(outpoint: string): Promise<File | undefined> {
    const [txid, vout] = outpoint.split("_");
    const resp = await fetch(`${APIS[this.network]}/v5/tx/${txid}/parse`);
    if (!resp.ok) return;
    const idxCtx = await resp.json();
    
    return idxCtx.txos[parseInt(vout)]?.data?.insc?.file;
  }

  subscribed() {
    return !!this.eventSource;
  }

  subscribe(cb: (topic: string, data: string) => void) {
    if (this.eventSource) this.eventSource.close();
    const acctTopic = `acct:${this.accountId}`;
    const topics = [acctTopic, `block`];
    this.eventSource = new EventSource(`${APIS[this.network]}/v5/sse?${topics.map(t => `topic=${t}`).join('&')}`);
    this.eventSource.addEventListener(acctTopic, (e: MessageEvent) => {
      console.log(acctTopic, e.data);
      cb('tx', e.data)
    });
    this.eventSource.addEventListener('block', (e: MessageEvent) => {
      console.log('block', e.data);
      cb('block', e.data)
    });
    this.eventSource.onmessage = (e: MessageEvent) => {
      console.log('message', e.data);
    }
  }

  unsubscribe() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = undefined;
    }
  };

  async syncTxLogs(from = 0, limit=0, reverse = false): Promise<TxSyncLog[]> {
    const resp = await fetch(
      `${APIS[this.network]}/v5/acct/${this.accountId}/${from}?limit=${limit}&rev=${reverse}`
    );
    if (!resp.ok) throw new Error("Failed to fetch tx logs");
    const logs = await resp.json() as TxSyncLog[];
    return logs.map((log) => {
      if(log.score > 5e16) {
        log.score = 0;
      }
      return log;
    });
  }

  async spends(outpoints: string[]): Promise<string[]> {
    const resp = await fetch(`${APIS[this.network]}/v5/spends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(outpoints),
    });
    return resp.ok ? (await resp.json() as string[]) : [];
  }

  async search(q: Query): Promise<Ordinal[]> {
    let url = `${APIS[this.network]}/v5/evt/${q.tag}/${q.id}/${q.value}?`
    const params: { [key: string]: string } = {};
    if (q.tags) params.tags = q.tags.join(",");
    if (q.unspent) params.unspent = "true";
    if (q.limit) params.limit = q.limit.toString();
    if (q.from) params.from = q.from.toString();
    if (q.spend) params.spend = "true";
    url += new URLSearchParams(params);
    const resp = await fetch(url);
    return resp.ok ? (await resp.json() as Ordinal[]) : [];
  }
}
