[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / IndexContext

# Interface: IndexContext

Represents the context of an index operation.

 IndexContext

## Properties

### block

> **block**: [`Block`](../classes/Block.md)

The block containing the transaction.

#### Defined in

[models/index-context.ts:42](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/models/index-context.ts#L42)

***

### queue

> **queue**: [`IndexQueue`](../type-aliases/IndexQueue.md)

The dependency transactions to be ingested.

#### Defined in

[models/index-context.ts:45](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/models/index-context.ts#L45)

***

### spends

> **spends**: [`Txo`](../classes/Txo.md)[]

The spent transaction outputs (inputs).

#### Defined in

[models/index-context.ts:43](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/models/index-context.ts#L43)

***

### summary

> **summary**: [`IndexSummary`](../type-aliases/IndexSummary.md)

The summary of the transaction after indexing.

#### Defined in

[models/index-context.ts:46](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/models/index-context.ts#L46)

***

### tx

> **tx**: `Transaction`

The transaction being indexed.

#### Defined in

[models/index-context.ts:40](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/models/index-context.ts#L40)

***

### txid

> **txid**: `string`

The unique identifier of the transaction.

#### Defined in

[models/index-context.ts:41](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/models/index-context.ts#L41)

***

### txos

> **txos**: [`Txo`](../classes/Txo.md)[]

The transaction outputs.

#### Defined in

[models/index-context.ts:44](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/models/index-context.ts#L44)
