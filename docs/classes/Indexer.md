[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / Indexer

# Class: `abstract` Indexer

Abstract class representing an Indexer.

## Extended by

- [`Bsv20Indexer`](Bsv20Indexer.md)
- [`Bsv21Indexer`](Bsv21Indexer.md)
- [`FundIndexer`](FundIndexer.md)
- [`LockIndexer`](LockIndexer.md)
- [`InscriptionIndexer`](InscriptionIndexer.md)
- [`OpNSIndexer`](OpNSIndexer.md)
- [`OriginIndexer`](OriginIndexer.md)
- [`MapIndexer`](MapIndexer.md)
- [`OrdLockIndexer`](OrdLockIndexer.md)

## Constructors

### new Indexer()

> **new Indexer**(`owners`, `mode`, `network`?): [`Indexer`](Indexer.md)

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

[`Indexer`](Indexer.md)

#### Defined in

[models/indexer.ts:40](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/indexer.ts#L40)

## Properties

### mode

> **mode**: [`IndexMode`](../enumerations/IndexMode.md)

The mode of the indexer.

#### Defined in

[models/indexer.ts:42](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/indexer.ts#L42)

***

### name

> **name**: `string` = `""`

Human readable name for this indexer.

#### Defined in

[models/indexer.ts:29](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/indexer.ts#L29)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

The network the indexer is operating on. Defaults to "mainnet".

#### Defined in

[models/indexer.ts:43](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/indexer.ts#L43)

***

### owners

> **owners**: `Set`\<`string`\>

A set of owners that this indexer is interested in. 
                An owner can be an address or any other data the indexer 
                wants to use to identify which transactions to include in the index.

#### Defined in

[models/indexer.ts:41](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/indexer.ts#L41)

***

### tag

> **tag**: `string` = `""`

Unique identifier for this indexer.

#### Defined in

[models/indexer.ts:28](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/indexer.ts#L28)

## Methods

### parse()

> **parse**(`ctx`, `vout`, `previewOnly`?): `Promise`\<`undefined` \| [`IndexData`](IndexData.md)\>

Parses an output and returns the index data if it is relevant to this indexer.
If the output is not relevant, it returns undefined.

#### Parameters

• **ctx**: [`IndexContext`](IndexContext.md)

The context for the index operation.

• **vout**: `number`

The output number to be parsed.

• **previewOnly?**: `boolean` = `false`

A flag indicating whether to perform a preview-only parse.

#### Returns

`Promise`\<`undefined` \| [`IndexData`](IndexData.md)\>

A promise that resolves to the index data if relevant, or undefined if not.

#### Defined in

[models/indexer.ts:55](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/indexer.ts#L55)

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

#### Defined in

[models/indexer.ts:65](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/indexer.ts#L65)

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

#### Defined in

[models/indexer.ts:76](https://github.com/shruggr/ts-casemod-spv/blob/56b4750a08daabb55f614a1b84ddcb1eb8c8c7fb/src/models/indexer.ts#L76)
