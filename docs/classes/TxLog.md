[**spv-store v0.1.23**](../README.md) • **Docs**

***

[spv-store v0.1.23](../globals.md) / TxLog

# Class: TxLog

Represents a log of indexed transactions.

 TxLog

## Constructors

### new TxLog()

> **new TxLog**(`txid`, `height`, `idx`): [`TxLog`](TxLog.md)

#### Parameters

• **txid**: `string`

• **height**: `number` = `0`

• **idx**: `number` = `0`

#### Returns

[`TxLog`](TxLog.md)

#### Defined in

[models/index-context.ts:38](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/index-context.ts#L38)

## Properties

### height

> **height**: `number` = `0`

The height of the block containing the transaction.

#### Defined in

[models/index-context.ts:40](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/index-context.ts#L40)

***

### idx

> **idx**: `number` = `0`

The index of the transaction in the block.

#### Defined in

[models/index-context.ts:41](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/index-context.ts#L41)

***

### source?

> `optional` **source**: `string`

The source of the indexed transaction.

#### Defined in

[models/index-context.ts:37](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/index-context.ts#L37)

***

### summary?

> `optional` **summary**: [`IndexSummary`](../type-aliases/IndexSummary.md)

The summary of the indexed transaction.

#### Defined in

[models/index-context.ts:36](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/index-context.ts#L36)

***

### txid

> **txid**: `string`

The unique identifier of the transaction.

#### Defined in

[models/index-context.ts:39](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/index-context.ts#L39)
