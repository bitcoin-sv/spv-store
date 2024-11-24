[**spv-store v0.1.44**](../README.md) • **Docs**

***

[spv-store v0.1.44](../globals.md) / IndexContext

# Interface: IndexContext

Represents the context of an index operation.

 IndexContext

## Properties

### block

> **block**: [`Block`](../classes/Block.md)

The block containing the transaction.

#### Defined in

[models/index-context.ts:65](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/index-context.ts#L65)

***

### queue

> **queue**: [`IndexQueue`](../type-aliases/IndexQueue.md)

The dependency transactions to be ingested.

#### Defined in

[models/index-context.ts:68](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/index-context.ts#L68)

***

### spends

> **spends**: [`Txo`](../classes/Txo.md)[]

The spent transaction outputs (inputs).

#### Defined in

[models/index-context.ts:66](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/index-context.ts#L66)

***

### summary

> **summary**: [`IndexSummary`](../type-aliases/IndexSummary.md)

The summary of the transaction after indexing.

#### Defined in

[models/index-context.ts:69](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/index-context.ts#L69)

***

### tx

> **tx**: `Transaction`

The transaction being indexed.

#### Defined in

[models/index-context.ts:63](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/index-context.ts#L63)

***

### txid

> **txid**: `string`

The unique identifier of the transaction.

#### Defined in

[models/index-context.ts:64](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/index-context.ts#L64)

***

### txos

> **txos**: [`Txo`](../classes/Txo.md)[]

The transaction outputs.

#### Defined in

[models/index-context.ts:67](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/index-context.ts#L67)
