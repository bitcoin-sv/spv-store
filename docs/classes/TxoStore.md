[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / TxoStore

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

[stores/txo-store.ts:17](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L17)

## Properties

### events?

> `optional` **events**: `EventEmitter`

#### Defined in

[stores/txo-store.ts:23](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L23)

***

### indexers

> **indexers**: [`Indexer`](Indexer.md)[]

#### Defined in

[stores/txo-store.ts:21](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L21)

***

### owners

> **owners**: `Set`\<`string`\>

#### Defined in

[stores/txo-store.ts:22](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L22)

***

### services

> **services**: [`Services`](../interfaces/Services.md)

#### Defined in

[stores/txo-store.ts:19](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L19)

***

### storage

> **storage**: [`TxoStorage`](../interfaces/TxoStorage.md)

#### Defined in

[stores/txo-store.ts:18](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L18)

***

### stores

> **stores**: [`Stores`](../interfaces/Stores.md)

#### Defined in

[stores/txo-store.ts:20](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L20)

## Methods

### destroy()

> **destroy**(): `Promise`\<`void`\>

Asynchronously destroys the current instance by stopping synchronization and 
destroying the associated storage.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the instance is destroyed.

#### Async

#### Defined in

[stores/txo-store.ts:34](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L34)

***

### ingest()

> **ingest**(`tx`, `source`, `fromRemote`, `isDep`, `ingestParents`, `outputs`?): `Promise`\<[`IndexContext`](IndexContext.md)\>

Ingests a transaction into the store, optionally ingesting its parent transactions.

#### Parameters

• **tx**: `Transaction`

The transaction to ingest.

• **source**: `string` = `""`

An optional string indicating the source of the transaction.

• **fromRemote**: `boolean` = `false`

A boolean indicating if the transaction is from a remote source.

• **isDep**: `boolean` = `false`

A boolean indicating if the transaction is a dependency.

• **ingestParents**: `boolean` = `true`

A boolean indicating if parent transactions should be ingested.

• **outputs?**: `number`[]

An optional array of output indices to be ingested.

#### Returns

`Promise`\<[`IndexContext`](IndexContext.md)\>

A promise that resolves to an IndexContext object.

#### Defined in

[stores/txo-store.ts:166](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L166)

***

### parse()

> **parse**(`tx`, `previewOnly`, `outputs`?, `fromRemote`?, `resolveInputs`?): `Promise`\<[`IndexContext`](IndexContext.md)\>

Parses a transaction and returns an IndexContext.

#### Parameters

• **tx**: `Transaction`

The transaction to parse.

• **previewOnly**: `boolean` = `true`

If true, only a preview of the transaction is parsed. Defaults to true.

• **outputs?**: `number`[]

An optional array of output indices to include in the parsing.

• **fromRemote?**: `boolean` = `false`

If true, the transaction is loaded from a remote source. Defaults to false.

• **resolveInputs?**: `boolean` = `false`

If true, the inputs of the transaction are resolved. Defaults to false.

#### Returns

`Promise`\<[`IndexContext`](IndexContext.md)\>

A promise that resolves to an IndexContext.

#### Throws

Will throw an error if the merkle path verification fails or if an input is missing a source transaction.

#### Defined in

[stores/txo-store.ts:69](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L69)

***

### processConfirms()

> **processConfirms**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:309](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L309)

***

### processDownloads()

> **processDownloads**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:241](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L241)

***

### processImmutable()

> **processImmutable**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:347](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L347)

***

### processIngests()

> **processIngests**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:277](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L277)

***

### processQueue()

> **processQueue**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:230](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L230)

***

### queue()

> **queue**(`ingests`): `Promise`\<`void`\>

#### Parameters

• **ingests**: [`Ingest`](../interfaces/Ingest.md)[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:225](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L225)

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

[stores/txo-store.ts:49](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L49)

***

### syncTxLogs()

> **syncTxLogs**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:389](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L389)

***

### updateQueueStats()

> **updateQueueStats**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:220](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/stores/txo-store.ts#L220)
