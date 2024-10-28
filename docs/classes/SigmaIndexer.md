[**spv-store v0.1.24**](../README.md) • **Docs**

***

[spv-store v0.1.24](../globals.md) / SigmaIndexer

# Class: SigmaIndexer

Abstract class representing an Indexer.

## Extends

- [`Indexer`](Indexer.md)

## Constructors

### new SigmaIndexer()

> **new SigmaIndexer**(`owners`, `indexMode`, `network`?): [`SigmaIndexer`](SigmaIndexer.md)

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

[`SigmaIndexer`](SigmaIndexer.md)

#### Inherited from

[`Indexer`](Indexer.md).[`constructor`](Indexer.md#constructors)

#### Defined in

[models/indexer.ts:56](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/indexer.ts#L56)

## Properties

### indexMode

> **indexMode**: [`IndexMode`](../enumerations/IndexMode.md)

The mode of the indexer.

#### Inherited from

[`Indexer`](Indexer.md).[`indexMode`](Indexer.md#indexmode)

#### Defined in

[models/indexer.ts:58](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/indexer.ts#L58)

***

### name

> **name**: `string` = `"Sigma"`

Human readable name for this indexer.

#### Overrides

[`Indexer`](Indexer.md).[`name`](Indexer.md#name)

#### Defined in

[indexers/sigma.ts:18](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/indexers/sigma.ts#L18)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

The network the indexer is operating on. Defaults to "mainnet".

#### Inherited from

[`Indexer`](Indexer.md).[`network`](Indexer.md#network)

#### Defined in

[models/indexer.ts:59](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/indexer.ts#L59)

***

### owners

> **owners**: `Set`\<`string`\>

A set of owners that this indexer is interested in. 
                An owner can be an address or any other data the indexer 
                wants to use to identify which transactions to include in the index.

#### Inherited from

[`Indexer`](Indexer.md).[`owners`](Indexer.md#owners)

#### Defined in

[models/indexer.ts:57](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/indexer.ts#L57)

***

### tag

> **tag**: `string` = `"sigma"`

Unique identifier for this indexer.

#### Overrides

[`Indexer`](Indexer.md).[`tag`](Indexer.md#tag)

#### Defined in

[indexers/sigma.ts:17](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/indexers/sigma.ts#L17)

## Methods

### parse()

> **parse**(`ctx`, `vout`): `Promise`\<`undefined` \| [`IndexData`](IndexData.md)\>

Parses an output and returns the index data if it is relevant to this indexer.
If the output is not relevant, it returns undefined.

#### Parameters

• **ctx**: [`IndexContext`](../interfaces/IndexContext.md)

The context for the index operation.

• **vout**: `number`

The output number to be parsed.

#### Returns

`Promise`\<`undefined` \| [`IndexData`](IndexData.md)\>

A promise that resolves to the index data if relevant, or undefined if not.

#### Overrides

[`Indexer`](Indexer.md).[`parse`](Indexer.md#parse)

#### Defined in

[indexers/sigma.ts:20](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/indexers/sigma.ts#L20)

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

[models/indexer.ts:81](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/indexer.ts#L81)

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

#### Inherited from

[`Indexer`](Indexer.md).[`sync`](Indexer.md#sync)

#### Defined in

[models/indexer.ts:92](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/indexer.ts#L92)