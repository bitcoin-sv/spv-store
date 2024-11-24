[**spv-store v0.1.44**](../README.md) • **Docs**

***

[spv-store v0.1.44](../globals.md) / TxoStore

# Class: TxoStore

## Constructors

### new TxoStore()

> **new TxoStore**(`storage`, `services`, `stores`, `indexers`, `owners`, `events`?): [`TxoStore`](TxoStore.md)

#### Parameters

• **storage**: [`TxoStorage`](../interfaces/TxoStorage.md)

• **services**: [`Services`](../interfaces/Services.md)

• **stores**: [`Stores`](../interfaces/Stores.md)

• **indexers**: [`Indexer`](Indexer.md)[]

• **owners**: `Set`\<`string`\>

• **events?**: `EventEmitter`

#### Returns

[`TxoStore`](TxoStore.md)

#### Defined in

[stores/txo-store.ts:17](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L17)

## Properties

### events?

> `optional` **events**: `EventEmitter`

#### Defined in

[stores/txo-store.ts:23](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L23)

***

### indexers

> **indexers**: [`Indexer`](Indexer.md)[]

#### Defined in

[stores/txo-store.ts:21](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L21)

***

### owners

> **owners**: `Set`\<`string`\>

#### Defined in

[stores/txo-store.ts:22](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L22)

***

### services

> **services**: [`Services`](../interfaces/Services.md)

#### Defined in

[stores/txo-store.ts:19](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L19)

***

### storage

> **storage**: [`TxoStorage`](../interfaces/TxoStorage.md)

#### Defined in

[stores/txo-store.ts:18](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L18)

***

### stores

> **stores**: [`Stores`](../interfaces/Stores.md)

#### Defined in

[stores/txo-store.ts:20](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L20)

## Methods

### buildIndexContext()

> **buildIndexContext**(`tx`): `Promise`\<[`IndexContext`](../interfaces/IndexContext.md)\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<[`IndexContext`](../interfaces/IndexContext.md)\>

#### Defined in

[stores/txo-store.ts:413](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L413)

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

Asynchronously destroys the current instance by stopping synchronization and 
destroying the associated storage.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the instance is destroyed.

#### Defined in

[stores/txo-store.ts:33](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L33)

***

### ingest()

> **ingest**(`tx`, `source`, `parseMode`, `resolveParents`, `outputs`?): `Promise`\<[`IndexContext`](../interfaces/IndexContext.md)\>

Ingests a new transaction into the store, building an index context for it.

#### Parameters

• **tx**: `Transaction`

The transaction to ingest.

• **source**: `string` = `""`

An optional string indicating the source of the transaction.

• **parseMode**: [`ParseMode`](../enumerations/ParseMode.md) = `ParseMode.Persist`

The mode to parse the transaction, default is `ParseMode.Persist`.

• **resolveParents**: `boolean` = `false`

Whether to resolve parent transactions, default is `false`.

• **outputs?**: `number`[]

Optional array of output indices to process.

#### Returns

`Promise`\<[`IndexContext`](../interfaces/IndexContext.md)\>

A promise that resolves to the index context of the ingested transaction.

#### Throws

Will throw an error if an input is missing its source transaction.

#### Defined in

[stores/txo-store.ts:68](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L68)

***

### processConfirms()

> **processConfirms**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:298](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L298)

***

### processDownloads()

> **processDownloads**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:223](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L223)

***

### processImmutable()

> **processImmutable**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:336](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L336)

***

### processIngests()

> **processIngests**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:262](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L262)

***

### processQueue()

> **processQueue**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:211](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L211)

***

### queue()

> **queue**(`ingests`): `Promise`\<`void`\>

#### Parameters

• **ingests**: [`Ingest`](../interfaces/Ingest.md)[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:206](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L206)

***

### resolveBlock()

> **resolveBlock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:433](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L433)

***

### search()

> **search**(`lookup`, `sort`, `limit`, `from`?): `Promise`\<[`TxoResults`](../interfaces/TxoResults.md)\>

Searches for transaction outputs (TXOs) based on the provided lookup criteria.

#### Parameters

• **lookup**: [`TxoLookup`](TxoLookup.md)

The criteria used to search for TXOs.

• **sort**: [`TxoSort`](../enumerations/TxoSort.md) = `TxoSort.DESC`

The sorting order of the results. Defaults to `TxoSort.DESC`.

• **limit**: `number` = `100`

The maximum number of results to return. Defaults to 100. 0 means no limit.

• **from?**: `string`

An optional parameter to specify the starting point for the search. Use for pagination.

#### Returns

`Promise`\<[`TxoResults`](../interfaces/TxoResults.md)\>

A promise that resolves to the search results.

#### Defined in

[stores/txo-store.ts:48](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L48)

***

### syncTxLogs()

> **syncTxLogs**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:376](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L376)

***

### updateQueueStats()

> **updateQueueStats**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:201](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/stores/txo-store.ts#L201)
