[**spv-store v0.1.24**](../README.md) • **Docs**

***

[spv-store v0.1.24](../globals.md) / IndexContext

# Interface: IndexContext

Represents the context of an index operation.

 IndexContext

## Properties

### block

> **block**: [`Block`](../classes/Block.md)

The block containing the transaction.

#### Defined in

[models/index-context.ts:63](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/index-context.ts#L63)

***

### queue

> **queue**: [`IndexQueue`](../type-aliases/IndexQueue.md)

The dependency transactions to be ingested.

#### Defined in

[models/index-context.ts:66](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/index-context.ts#L66)

***

### spends

> **spends**: [`Txo`](../classes/Txo.md)[]

The spent transaction outputs (inputs).

#### Defined in

[models/index-context.ts:64](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/index-context.ts#L64)

***

### summary

> **summary**: [`IndexSummary`](../type-aliases/IndexSummary.md)

The summary of the transaction after indexing.

#### Defined in

[models/index-context.ts:67](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/index-context.ts#L67)

***

### tx

> **tx**: `Transaction`

The transaction being indexed.

#### Defined in

[models/index-context.ts:61](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/index-context.ts#L61)

***

### txid

> **txid**: `string`

The unique identifier of the transaction.

#### Defined in

[models/index-context.ts:62](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/index-context.ts#L62)

***

### txos

> **txos**: [`Txo`](../classes/Txo.md)[]

The transaction outputs.

#### Defined in

[models/index-context.ts:65](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/index-context.ts#L65)
