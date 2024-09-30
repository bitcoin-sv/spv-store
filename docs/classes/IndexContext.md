[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / IndexContext

# Class: IndexContext

Represents the context for indexing a transaction.

## Remarks

This class holds the necessary information for indexing a transaction,
including its transaction ID, spent transaction outputs, transaction outputs,
dependency transactions to be ingested, and a summary of the transaction after indexing.

## Param

The transaction to be indexed.

## Param

The transaction block. Defaults to a new Block instance.

## Constructors

### new IndexContext()

> **new IndexContext**(`tx`, `block`): [`IndexContext`](IndexContext.md)

#### Parameters

• **tx**: `Transaction`

• **block**: [`Block`](Block.md) = `...`

#### Returns

[`IndexContext`](IndexContext.md)

#### Defined in

[models/index-context.ts:48](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/index-context.ts#L48)

## Properties

### block

> **block**: [`Block`](Block.md)

#### Defined in

[models/index-context.ts:50](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/index-context.ts#L50)

***

### queue

> **queue**: [`IndexQueue`](../type-aliases/IndexQueue.md) = `{}`

Dependency transactions to be ingested.

#### Defined in

[models/index-context.ts:46](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/index-context.ts#L46)

***

### spends

> **spends**: [`Txo`](Txo.md)[] = `[]`

An array of spent transaction outputs (inputs).

#### Defined in

[models/index-context.ts:44](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/index-context.ts#L44)

***

### summary

> **summary**: [`IndexSummary`](../type-aliases/IndexSummary.md) = `{}`

Summary of the transaction after indexing.

#### Defined in

[models/index-context.ts:47](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/index-context.ts#L47)

***

### tx

> **tx**: `Transaction`

#### Defined in

[models/index-context.ts:49](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/index-context.ts#L49)

***

### txid

> **txid**: `string`

The transaction ID in hexadecimal format.

#### Defined in

[models/index-context.ts:43](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/index-context.ts#L43)

***

### txos

> **txos**: [`Txo`](Txo.md)[] = `[]`

An array of transaction outputs.

#### Defined in

[models/index-context.ts:45](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/index-context.ts#L45)
