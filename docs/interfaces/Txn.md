[**spv-store v0.1.23**](../README.md) • **Docs**

***

[spv-store v0.1.23](../globals.md) / Txn

# Interface: Txn

Represents a transaction in the system.

 Txn

## Properties

### block

> **block**: [`Block`](../classes/Block.md)

The block containing the transaction.

#### Defined in

[stores/txn-store.ts:27](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/stores/txn-store.ts#L27)

***

### proof?

> `optional` **proof**: `number`[]

Optional proof data for the transaction.

#### Defined in

[stores/txn-store.ts:26](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/stores/txn-store.ts#L26)

***

### rawtx

> **rawtx**: `number`[]

The raw transaction data.

#### Defined in

[stores/txn-store.ts:25](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/stores/txn-store.ts#L25)

***

### status

> **status**: [`TxnStatus`](../enumerations/TxnStatus.md)

The current status of the transaction.

#### Defined in

[stores/txn-store.ts:28](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/stores/txn-store.ts#L28)

***

### txid

> **txid**: `string`

The unique identifier for the transaction.

#### Defined in

[stores/txn-store.ts:24](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/stores/txn-store.ts#L24)
