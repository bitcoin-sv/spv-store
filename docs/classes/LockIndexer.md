[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / LockIndexer

# Class: LockIndexer

Abstract class representing an Indexer.

## Extends

- [`Indexer`](Indexer.md)

## Constructors

### new LockIndexer()

> **new LockIndexer**(`owners`, `mode`, `network`?): [`LockIndexer`](LockIndexer.md)

Creates an instance of the Indexer.

#### Parameters

• **owners**: `Set`\<`string`\> = `...`

A set of owners that this indexer is interested in. 
                An owner can be an address or any other data the indexer 
                wants to use to identify which transactions to include in the index.

• **mode**: [`IndexMode`](../enumerations/IndexMode.md)

The mode of the indexer.

• **network?**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

The network the indexer is operating on. Defaults to "mainnet".

#### Returns

[`LockIndexer`](LockIndexer.md)

#### Inherited from

[`Indexer`](Indexer.md).[`constructor`](Indexer.md#constructors)

#### Defined in

[models/indexer.ts:40](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/indexer.ts#L40)

## Properties

### mode

> **mode**: [`IndexMode`](../enumerations/IndexMode.md)

The mode of the indexer.

#### Inherited from

[`Indexer`](Indexer.md).[`mode`](Indexer.md#mode)

#### Defined in

[models/indexer.ts:42](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/indexer.ts#L42)

***

### name

> **name**: `string` = `"Locks"`

Human readable name for this indexer.

#### Overrides

[`Indexer`](Indexer.md).[`name`](Indexer.md#name)

#### Defined in

[indexers/lock.ts:22](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/indexers/lock.ts#L22)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

The network the indexer is operating on. Defaults to "mainnet".

#### Inherited from

[`Indexer`](Indexer.md).[`network`](Indexer.md#network)

#### Defined in

[models/indexer.ts:43](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/indexer.ts#L43)

***

### owners

> **owners**: `Set`\<`string`\>

A set of owners that this indexer is interested in. 
                An owner can be an address or any other data the indexer 
                wants to use to identify which transactions to include in the index.

#### Inherited from

[`Indexer`](Indexer.md).[`owners`](Indexer.md#owners)

#### Defined in

[models/indexer.ts:41](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/indexer.ts#L41)

***

### tag

> **tag**: `string` = `"lock"`

Unique identifier for this indexer.

#### Overrides

[`Indexer`](Indexer.md).[`tag`](Indexer.md#tag)

#### Defined in

[indexers/lock.ts:21](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/indexers/lock.ts#L21)

## Methods

### parse()

> **parse**(`ctx`, `vout`): `Promise`\<`undefined` \| [`IndexData`](IndexData.md)\>

Parses an output and returns the index data if it is relevant to this indexer.
If the output is not relevant, it returns undefined.

#### Parameters

• **ctx**: [`IndexContext`](IndexContext.md)

The context for the index operation.

• **vout**: `number`

The output number to be parsed.

#### Returns

`Promise`\<`undefined` \| [`IndexData`](IndexData.md)\>

A promise that resolves to the index data if relevant, or undefined if not.

#### Overrides

[`Indexer`](Indexer.md).[`parse`](Indexer.md#parse)

#### Defined in

[indexers/lock.ts:23](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/indexers/lock.ts#L23)

***

### preSave()

> **preSave**(`ctx`): `Promise`\<`void`\>

Pre-save hook that evaluates the index data for the entire transaction before it is persisted.

#### Parameters

• **ctx**: [`IndexContext`](IndexContext.md)

The context of the index operation.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the pre-save evaluation is complete.

#### Overrides

[`Indexer`](Indexer.md).[`preSave`](Indexer.md#presave)

#### Defined in

[indexers/lock.ts:52](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/indexers/lock.ts#L52)

***

### sync()

> **sync**(`txoStore`, `ingestQueue`): `Promise`\<`void`\>

Synchronize txo data for indexer from a remote source.

#### Parameters

• **txoStore**: [`TxoStore`](TxoStore.md)

The store containing transaction outputs.

• **ingestQueue**

A queue of transactions to be ingested, keyed by transaction ID.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the synchronization is complete.

#### Overrides

[`Indexer`](Indexer.md).[`sync`](Indexer.md#sync)

#### Defined in

[indexers/lock.ts:69](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/indexers/lock.ts#L69)
