[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / FundIndexer

# Class: FundIndexer

Abstract class representing an Indexer.

## Extends

- [`Indexer`](Indexer.md)

## Constructors

### new FundIndexer()

> **new FundIndexer**(`owners`, `network`, `syncHistory`): [`FundIndexer`](FundIndexer.md)

#### Parameters

• **owners**: `Set`\<`string`\> = `...`

• **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

• **syncHistory**: `boolean` = `false`

#### Returns

[`FundIndexer`](FundIndexer.md)

#### Overrides

[`Indexer`](Indexer.md).[`constructor`](Indexer.md#constructors)

#### Defined in

[indexers/fund.ts:19](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/fund.ts#L19)

## Properties

### name

> **name**: `string` = `"Funds"`

Human readable name for this indexer.

#### Overrides

[`Indexer`](Indexer.md).[`name`](Indexer.md#name)

#### Defined in

[indexers/fund.ts:17](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/fund.ts#L17)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

The network the indexer is operating on. Defaults to "mainnet".

#### Inherited from

[`Indexer`](Indexer.md).[`network`](Indexer.md#network)

#### Defined in

[indexers/fund.ts:21](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/fund.ts#L21)

***

### owners

> **owners**: `Set`\<`string`\>

A set of owners that this indexer is interested in. 
                An owner can be an address or any other data the indexer 
                wants to use to identify which transactions to include in the index.

#### Inherited from

[`Indexer`](Indexer.md).[`owners`](Indexer.md#owners)

#### Defined in

[indexers/fund.ts:20](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/fund.ts#L20)

***

### syncHistory

> **syncHistory**: `boolean` = `false`

#### Defined in

[indexers/fund.ts:22](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/fund.ts#L22)

***

### tag

> **tag**: `string` = `"fund"`

Unique identifier for this indexer.

#### Overrides

[`Indexer`](Indexer.md).[`tag`](Indexer.md#tag)

#### Defined in

[indexers/fund.ts:16](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/fund.ts#L16)

## Methods

### parse()

> **parse**(`ctx`, `vout`): `Promise`\<`undefined` \| [`IndexData`](../interfaces/IndexData.md)\>

Parses an output and returns the index data if it is relevant to this indexer.
If the output is not relevant, it returns undefined.

#### Parameters

• **ctx**: [`IndexContext`](../interfaces/IndexContext.md)

The context for the index operation.

• **vout**: `number`

The output number to be parsed.

#### Returns

`Promise`\<`undefined` \| [`IndexData`](../interfaces/IndexData.md)\>

A promise that resolves to the index data if relevant, or undefined if not.

#### Overrides

[`Indexer`](Indexer.md).[`parse`](Indexer.md#parse)

#### Defined in

[indexers/fund.ts:27](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/fund.ts#L27)

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

> **summerize**(`ctx`, `parseMode`, `outputs`?): `Promise`\<`undefined` \| [`IndexSummary`](../type-aliases/IndexSummary.md)\>

Pre-save hook that evaluates the index data for the entire transaction before it is persisted.

#### Parameters

• **ctx**: [`IndexContext`](../interfaces/IndexContext.md)

The context of the index operation.

• **parseMode**: [`ParseMode`](../enumerations/ParseMode.md)

• **outputs?**: `Set`\<`number`\>

#### Returns

`Promise`\<`undefined` \| [`IndexSummary`](../type-aliases/IndexSummary.md)\>

A promise that resolves when the pre-save evaluation is complete.

#### Overrides

[`Indexer`](Indexer.md).[`summerize`](Indexer.md#summerize)

#### Defined in

[indexers/fund.ts:43](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/fund.ts#L43)

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

[indexers/fund.ts:71](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/indexers/fund.ts#L71)
