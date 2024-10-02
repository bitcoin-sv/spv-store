[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / OriginIndexer

# Class: OriginIndexer

Abstract class representing an Indexer.

## Extends

- [`Indexer`](Indexer.md)

## Constructors

### new OriginIndexer()

> **new OriginIndexer**(`owners`, `indexMode`, `network`): [`OriginIndexer`](OriginIndexer.md)

#### Parameters

• **owners**: `Set`\<`string`\> = `...`

• **indexMode**: [`IndexMode`](../enumerations/IndexMode.md)

• **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

#### Returns

[`OriginIndexer`](OriginIndexer.md)

#### Overrides

[`Indexer`](Indexer.md).[`constructor`](Indexer.md#constructors)

#### Defined in

[indexers/origin.ts:34](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/indexers/origin.ts#L34)

## Properties

### indexMode

> **indexMode**: [`IndexMode`](../enumerations/IndexMode.md)

The mode of the indexer.

#### Inherited from

[`Indexer`](Indexer.md).[`indexMode`](Indexer.md#indexmode)

#### Defined in

[indexers/origin.ts:36](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/indexers/origin.ts#L36)

***

### name

> **name**: `string` = `"Origins"`

Human readable name for this indexer.

#### Overrides

[`Indexer`](Indexer.md).[`name`](Indexer.md#name)

#### Defined in

[indexers/origin.ts:31](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/indexers/origin.ts#L31)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

The network the indexer is operating on. Defaults to "mainnet".

#### Inherited from

[`Indexer`](Indexer.md).[`network`](Indexer.md#network)

#### Defined in

[indexers/origin.ts:37](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/indexers/origin.ts#L37)

***

### oneSat

> **oneSat**: `OneSatProvider`

#### Defined in

[indexers/origin.ts:32](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/indexers/origin.ts#L32)

***

### owners

> **owners**: `Set`\<`string`\>

A set of owners that this indexer is interested in. 
                An owner can be an address or any other data the indexer 
                wants to use to identify which transactions to include in the index.

#### Inherited from

[`Indexer`](Indexer.md).[`owners`](Indexer.md#owners)

#### Defined in

[indexers/origin.ts:35](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/indexers/origin.ts#L35)

***

### tag

> **tag**: `string` = `"origin"`

Unique identifier for this indexer.

#### Overrides

[`Indexer`](Indexer.md).[`tag`](Indexer.md#tag)

#### Defined in

[indexers/origin.ts:30](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/indexers/origin.ts#L30)

## Methods

### parse()

> **parse**(`ctx`, `vout`, `parseMode`): `Promise`\<`undefined` \| [`IndexData`](IndexData.md)\>

Parses an output and returns the index data if it is relevant to this indexer.
If the output is not relevant, it returns undefined.

#### Parameters

• **ctx**: [`IndexContext`](../interfaces/IndexContext.md)

The context for the index operation.

• **vout**: `number`

The output number to be parsed.

• **parseMode**: [`ParseMode`](../enumerations/ParseMode.md) = `ParseMode.Persist`

#### Returns

`Promise`\<`undefined` \| [`IndexData`](IndexData.md)\>

A promise that resolves to the index data if relevant, or undefined if not.

#### Overrides

[`Indexer`](Indexer.md).[`parse`](Indexer.md#parse)

#### Defined in

[indexers/origin.ts:43](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/indexers/origin.ts#L43)

***

### preSave()

> **preSave**(`ctx`): `Promise`\<`void`\>

Pre-save hook that evaluates the index data for the entire transaction before it is persisted.

#### Parameters

• **ctx**: [`IndexContext`](../interfaces/IndexContext.md)

The context of the index operation.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the pre-save evaluation is complete.

#### Inherited from

[`Indexer`](Indexer.md).[`preSave`](Indexer.md#presave)

#### Defined in

[models/indexer.ts:79](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/models/indexer.ts#L79)

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

[indexers/origin.ts:113](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/indexers/origin.ts#L113)
