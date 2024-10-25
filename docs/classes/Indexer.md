[**spv-store v0.1.24**](../README.md) • **Docs**

***

[spv-store v0.1.24](../globals.md) / Indexer

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

## Constructors

### new Indexer()

> **new Indexer**(`owners`, `indexMode`, `network`?): [`Indexer`](Indexer.md)

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

[`Indexer`](Indexer.md)

#### Defined in

[models/indexer.ts:56](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/indexer.ts#L56)

## Properties

### indexMode

> **indexMode**: [`IndexMode`](../enumerations/IndexMode.md)

The mode of the indexer.

#### Defined in

[models/indexer.ts:58](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/indexer.ts#L58)

***

### name

> **name**: `string` = `""`

Human readable name for this indexer.

#### Defined in

[models/indexer.ts:45](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/indexer.ts#L45)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

The network the indexer is operating on. Defaults to "mainnet".

#### Defined in

[models/indexer.ts:59](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/indexer.ts#L59)

***

### owners

> **owners**: `Set`\<`string`\>

A set of owners that this indexer is interested in. 
                An owner can be an address or any other data the indexer 
                wants to use to identify which transactions to include in the index.

#### Defined in

[models/indexer.ts:57](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/indexer.ts#L57)

***

### tag

> **tag**: `string` = `""`

Unique identifier for this indexer.

#### Defined in

[models/indexer.ts:44](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/indexer.ts#L44)

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

#### Defined in

[models/indexer.ts:71](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/indexer.ts#L71)

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

#### Defined in

[models/indexer.ts:92](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/indexer.ts#L92)
