[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / OriginIndexer

# Class: OriginIndexer

Abstract class representing an Indexer.

## Extends

- [`Indexer`](Indexer.md)

## Constructors

### new OriginIndexer()

> **new OriginIndexer**(`owners`, `network`, `syncHistory`): [`OriginIndexer`](OriginIndexer.md)

#### Parameters

• **owners**: `Set`\<`string`\> = `...`

• **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

• **syncHistory**: `boolean` = `false`

#### Returns

[`OriginIndexer`](OriginIndexer.md)

#### Overrides

[`Indexer`](Indexer.md).[`constructor`](Indexer.md#constructors)

#### Defined in

[indexers/origin.ts:32](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/origin.ts#L32)

## Properties

### name

> **name**: `string` = `"Origins"`

Human readable name for this indexer.

#### Overrides

[`Indexer`](Indexer.md).[`name`](Indexer.md#name)

#### Defined in

[indexers/origin.ts:29](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/origin.ts#L29)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

The network the indexer is operating on. Defaults to "mainnet".

#### Inherited from

[`Indexer`](Indexer.md).[`network`](Indexer.md#network)

#### Defined in

[indexers/origin.ts:34](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/origin.ts#L34)

***

### oneSat

> **oneSat**: [`OneSatProvider`](OneSatProvider.md)

#### Defined in

[indexers/origin.ts:30](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/origin.ts#L30)

***

### owners

> **owners**: `Set`\<`string`\>

A set of owners that this indexer is interested in. 
                An owner can be an address or any other data the indexer 
                wants to use to identify which transactions to include in the index.

#### Inherited from

[`Indexer`](Indexer.md).[`owners`](Indexer.md#owners)

#### Defined in

[indexers/origin.ts:33](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/origin.ts#L33)

***

### syncHistory

> **syncHistory**: `boolean` = `false`

#### Defined in

[indexers/origin.ts:35](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/origin.ts#L35)

***

### tag

> **tag**: `string` = `"origin"`

Unique identifier for this indexer.

#### Overrides

[`Indexer`](Indexer.md).[`tag`](Indexer.md#tag)

#### Defined in

[indexers/origin.ts:28](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/origin.ts#L28)

## Methods

### parse()

> **parse**(`ctx`, `vout`, `parseMode`): `Promise`\<`undefined` \| [`IndexData`](../interfaces/IndexData.md)\>

Parses an output and returns the index data if it is relevant to this indexer.
If the output is not relevant, it returns undefined.

#### Parameters

• **ctx**: [`IndexContext`](../interfaces/IndexContext.md)

The context for the index operation.

• **vout**: `number`

The output number to be parsed.

• **parseMode**: [`ParseMode`](../enumerations/ParseMode.md) = `ParseMode.Persist`

#### Returns

`Promise`\<`undefined` \| [`IndexData`](../interfaces/IndexData.md)\>

A promise that resolves to the index data if relevant, or undefined if not.

#### Overrides

[`Indexer`](Indexer.md).[`parse`](Indexer.md#parse)

#### Defined in

[indexers/origin.ts:41](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/origin.ts#L41)

***

### resolve()

> **resolve**(`txoStore`, `block`): `Promise`\<`void`\>

Resolve asynchronous validations on new block

#### Parameters

• **txoStore**: [`TxoStore`](TxoStore.md)

• **block**: [`BlockHeader`](../interfaces/BlockHeader.md)

#### Returns

`Promise`\<`void`\>

A promise that resolves when the indexer is resolved.

#### Inherited from

[`Indexer`](Indexer.md).[`resolve`](Indexer.md#resolve)

#### Defined in

[models/indexer.ts:114](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L114)

***

### summerize()

> **summerize**(`ctx`): `Promise`\<`undefined` \| [`IndexSummary`](../type-aliases/IndexSummary.md)\>

Pre-save hook that evaluates the index data for the entire transaction before it is persisted.

#### Parameters

• **ctx**: [`IndexContext`](../interfaces/IndexContext.md)

The context of the index operation.

#### Returns

`Promise`\<`undefined` \| [`IndexSummary`](../type-aliases/IndexSummary.md)\>

A promise that resolves when the pre-save evaluation is complete.

#### Overrides

[`Indexer`](Indexer.md).[`summerize`](Indexer.md#summerize)

#### Defined in

[indexers/origin.ts:113](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/origin.ts#L113)

***

### sync()

> **sync**(`txoStore`, `ingestQueue`, `parseMode`): `Promise`\<`number`\>

Synchronize txo data for indexer from a remote source.

#### Parameters

• **txoStore**: [`TxoStore`](TxoStore.md)

The store containing transaction outputs.

• **ingestQueue**

A queue of transactions to be ingested, keyed by transaction ID.

• **parseMode**: [`ParseMode`](../enumerations/ParseMode.md) = `ParseMode.Persist`

#### Returns

`Promise`\<`number`\>

A promise that resolves when the synchronization is complete.

#### Overrides

[`Indexer`](Indexer.md).[`sync`](Indexer.md#sync)

#### Defined in

[indexers/origin.ts:152](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/origin.ts#L152)
