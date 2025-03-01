[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / Indexer

# Class: `abstract` Indexer

Abstract class representing an Indexer.

## Extended by

- [`OneSatIndexer`](OneSatIndexer.md)
- [`Bsv20Indexer`](Bsv20Indexer.md)
- [`Bsv21Indexer`](Bsv21Indexer.md)
- [`FundIndexer`](FundIndexer.md)
- [`LockIndexer`](LockIndexer.md)
- [`InscriptionIndexer`](InscriptionIndexer.md)
- [`OpNSIndexer`](OpNSIndexer.md)
- [`OriginIndexer`](OriginIndexer.md)
- [`MapIndexer`](MapIndexer.md)
- [`SigmaIndexer`](SigmaIndexer.md)
- [`OrdLockIndexer`](OrdLockIndexer.md)
- [`CosignIndexer`](CosignIndexer.md)

## Constructors

### new Indexer()

> **new Indexer**(`owners`, `network`?): [`Indexer`](Indexer.md)

Creates an instance of the Indexer.

#### Parameters

• **owners**: `Set`\<`string`\> = `...`

A set of owners that this indexer is interested in. 
                An owner can be an address or any other data the indexer 
                wants to use to identify which transactions to include in the index.

• **network?**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

The network the indexer is operating on. Defaults to "mainnet".

#### Returns

[`Indexer`](Indexer.md)

#### Defined in

[models/indexer.ts:70](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L70)

## Properties

### name

> **name**: `string` = `""`

Human readable name for this indexer.

#### Defined in

[models/indexer.ts:59](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L59)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

The network the indexer is operating on. Defaults to "mainnet".

#### Defined in

[models/indexer.ts:72](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L72)

***

### owners

> **owners**: `Set`\<`string`\>

A set of owners that this indexer is interested in. 
                An owner can be an address or any other data the indexer 
                wants to use to identify which transactions to include in the index.

#### Defined in

[models/indexer.ts:71](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L71)

***

### tag

> **tag**: `string` = `""`

Unique identifier for this indexer.

#### Defined in

[models/indexer.ts:58](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L58)

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

#### Defined in

[models/indexer.ts:94](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L94)

***

### sync()

> **sync**(`txoStore`, `ingestQueue`, `parseMode`?): `Promise`\<`number`\>

Synchronize txo data for indexer from a remote source.

#### Parameters

• **txoStore**: [`TxoStore`](TxoStore.md)

The store containing transaction outputs.

• **ingestQueue**

A queue of transactions to be ingested, keyed by transaction ID.

• **parseMode?**: [`ParseMode`](../enumerations/ParseMode.md)

#### Returns

`Promise`\<`number`\>

A promise that resolves when the synchronization is complete.

#### Defined in

[models/indexer.ts:105](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L105)
