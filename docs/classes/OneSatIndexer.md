[**spv-store v0.1.23**](../README.md) • **Docs**

***

[spv-store v0.1.23](../globals.md) / OneSatIndexer

# Class: OneSatIndexer

Abstract class representing an Indexer.

## Extends

- [`Indexer`](Indexer.md)

## Constructors

### new OneSatIndexer()

> **new OneSatIndexer**(`owners`, `indexMode`, `network`?): [`OneSatIndexer`](OneSatIndexer.md)

Creates an instance of the Indexer.

#### Parameters

• **owners**: `Set`\<`string`\> = `...`

A set of owners that this indexer is interested in. 
                An owner can be an address or any other data the indexer 
                wants to use to identify which transactions to include in the index.

• **indexMode**: [`IndexMode`](../enumerations/IndexMode.md)

The mode of the indexer.

• **network?**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

The network the indexer is operating on. Defaults to "mainnet".

#### Returns

[`OneSatIndexer`](OneSatIndexer.md)

#### Inherited from

[`Indexer`](Indexer.md).[`constructor`](Indexer.md#constructors)

#### Defined in

[models/indexer.ts:56](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/indexer.ts#L56)

## Properties

### indexMode

> **indexMode**: [`IndexMode`](../enumerations/IndexMode.md)

The mode of the indexer.

#### Inherited from

[`Indexer`](Indexer.md).[`indexMode`](Indexer.md#indexmode)

#### Defined in

[models/indexer.ts:58](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/indexer.ts#L58)

***

### name

> **name**: `string` = `"1Sat"`

Human readable name for this indexer.

#### Overrides

[`Indexer`](Indexer.md).[`name`](Indexer.md#name)

#### Defined in

[indexers/1sat.ts:8](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/indexers/1sat.ts#L8)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

The network the indexer is operating on. Defaults to "mainnet".

#### Inherited from

[`Indexer`](Indexer.md).[`network`](Indexer.md#network)

#### Defined in

[models/indexer.ts:59](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/indexer.ts#L59)

***

### owners

> **owners**: `Set`\<`string`\>

A set of owners that this indexer is interested in. 
                An owner can be an address or any other data the indexer 
                wants to use to identify which transactions to include in the index.

#### Inherited from

[`Indexer`](Indexer.md).[`owners`](Indexer.md#owners)

#### Defined in

[models/indexer.ts:57](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/indexer.ts#L57)

***

### tag

> **tag**: `string` = `"1sat"`

Unique identifier for this indexer.

#### Overrides

[`Indexer`](Indexer.md).[`tag`](Indexer.md#tag)

#### Defined in

[indexers/1sat.ts:7](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/indexers/1sat.ts#L7)

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

#### Inherited from

[`Indexer`](Indexer.md).[`parse`](Indexer.md#parse)

#### Defined in

[models/indexer.ts:71](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/indexer.ts#L71)

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

[models/indexer.ts:81](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/indexer.ts#L81)

***

### sync()

> **sync**(`txoStore`, `ingestQueue`): `Promise`\<`number`\>

Synchronize txo data for indexer from a remote source.

#### Parameters

• **txoStore**: [`TxoStore`](TxoStore.md)

The store containing transaction outputs.

• **ingestQueue**

A queue of transactions to be ingested, keyed by transaction ID.

#### Returns

`Promise`\<`number`\>

A promise that resolves when the synchronization is complete.

#### Overrides

[`Indexer`](Indexer.md).[`sync`](Indexer.md#sync)

#### Defined in

[indexers/1sat.ts:10](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/indexers/1sat.ts#L10)
