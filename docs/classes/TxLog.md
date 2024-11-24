[**spv-store v0.1.44**](../README.md) • **Docs**

***

[spv-store v0.1.44](../globals.md) / TxLog

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

[models/index-context.ts:40](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/index-context.ts#L40)

## Properties

### height

> **height**: `number` = `0`

The height of the block containing the transaction.

#### Defined in

[models/index-context.ts:42](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/index-context.ts#L42)

***

### idx

> **idx**: `number` = `0`

The index of the transaction in the block.

#### Defined in

[models/index-context.ts:43](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/index-context.ts#L43)

***

### source?

> `optional` **source**: `string`

The source of the indexed transaction.

#### Defined in

[models/index-context.ts:39](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/index-context.ts#L39)

***

### summary?

> `optional` **summary**: [`IndexSummary`](../type-aliases/IndexSummary.md)

The summary of the indexed transaction.

#### Defined in

[models/index-context.ts:38](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/index-context.ts#L38)

***

### txid

> **txid**: `string`

The unique identifier of the transaction.

#### Defined in

[models/index-context.ts:41](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/index-context.ts#L41)
