[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / OneSatIndexer

# Class: OneSatIndexer

Abstract class representing an Indexer.

## Extends

- [`Indexer`](Indexer.md)

## Constructors

### new OneSatIndexer()

> **new OneSatIndexer**(`owners`, `network`, `syncHistory`): [`OneSatIndexer`](OneSatIndexer.md)

#### Parameters

• **owners**: `Set`\<`string`\> = `...`

• **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

• **syncHistory**: `boolean` = `false`

#### Returns

[`OneSatIndexer`](OneSatIndexer.md)

#### Overrides

[`Indexer`](Indexer.md).[`constructor`](Indexer.md#constructors)

#### Defined in

[indexers/1sat.ts:10](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/1sat.ts#L10)

## Properties

### name

> **name**: `string` = `"1Sat"`

Human readable name for this indexer.

#### Overrides

[`Indexer`](Indexer.md).[`name`](Indexer.md#name)

#### Defined in

[indexers/1sat.ts:8](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/1sat.ts#L8)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

The network the indexer is operating on. Defaults to "mainnet".

#### Inherited from

[`Indexer`](Indexer.md).[`network`](Indexer.md#network)

#### Defined in

[indexers/1sat.ts:12](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/1sat.ts#L12)

***

### owners

> **owners**: `Set`\<`string`\>

A set of owners that this indexer is interested in. 
                An owner can be an address or any other data the indexer 
                wants to use to identify which transactions to include in the index.

#### Inherited from

[`Indexer`](Indexer.md).[`owners`](Indexer.md#owners)

#### Defined in

[indexers/1sat.ts:11](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/1sat.ts#L11)

***

### syncHistory

> **syncHistory**: `boolean` = `false`

#### Defined in

[indexers/1sat.ts:13](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/1sat.ts#L13)

***

### tag

> **tag**: `string` = `"1sat"`

Unique identifier for this indexer.

#### Overrides

[`Indexer`](Indexer.md).[`tag`](Indexer.md#tag)

#### Defined in

[indexers/1sat.ts:7](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/1sat.ts#L7)

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

#### Inherited from

[`Indexer`](Indexer.md).[`parse`](Indexer.md#parse)

#### Defined in

[models/indexer.ts:84](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L84)

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

> **summerize**(`ctx`, `parseMode`): `Promise`\<`undefined` \| [`IndexSummary`](../type-aliases/IndexSummary.md)\>

Pre-save hook that evaluates the index data for the entire transaction before it is persisted.

#### Parameters

• **ctx**: [`IndexContext`](../interfaces/IndexContext.md)

The context of the index operation.

• **parseMode**: [`ParseMode`](../enumerations/ParseMode.md) = `ParseMode.Persist`

#### Returns

`Promise`\<`undefined` \| [`IndexSummary`](../type-aliases/IndexSummary.md)\>

A promise that resolves when the pre-save evaluation is complete.

#### Inherited from

[`Indexer`](Indexer.md).[`summerize`](Indexer.md#summerize)

#### Defined in

[models/indexer.ts:94](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L94)

***

### sync()

> **sync**(`txoStore`, `ingestQueue`, `parseMode`): `Promise`\<`number`\>

Synchronize txo data for indexer from a remote source.

#### Parameters

• **txoStore**: [`TxoStore`](TxoStore.md)

The store containing transaction outputs.

• **ingestQueue**

A queue of transactions to be ingested, keyed by transaction ID.

• **parseMode**: [`ParseMode`](../enumerations/ParseMode.md) = `ParseMode.PersistSummary`

#### Returns

`Promise`\<`number`\>

A promise that resolves when the synchronization is complete.

#### Overrides

[`Indexer`](Indexer.md).[`sync`](Indexer.md#sync)

#### Defined in

[indexers/1sat.ts:18](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/1sat.ts#L18)
