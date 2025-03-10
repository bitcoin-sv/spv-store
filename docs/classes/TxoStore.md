[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / TxoStore

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

[stores/txo-store.ts:18](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L18)

## Properties

### events?

> `optional` **events**: `EventEmitter`

#### Defined in

[stores/txo-store.ts:24](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L24)

***

### indexers

> **indexers**: [`Indexer`](Indexer.md)[]

#### Defined in

[stores/txo-store.ts:22](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L22)

***

### owners

> **owners**: `Set`\<`string`\>

#### Defined in

[stores/txo-store.ts:23](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L23)

***

### services

> **services**: [`Services`](../interfaces/Services.md)

#### Defined in

[stores/txo-store.ts:20](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L20)

***

### storage

> **storage**: [`TxoStorage`](../interfaces/TxoStorage.md)

#### Defined in

[stores/txo-store.ts:19](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L19)

***

### stores

> **stores**: [`Stores`](../interfaces/Stores.md)

#### Defined in

[stores/txo-store.ts:21](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L21)

## Methods

### buildIndexContext()

> **buildIndexContext**(`tx`): `Promise`\<[`IndexContext`](../interfaces/IndexContext.md)\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<[`IndexContext`](../interfaces/IndexContext.md)\>

#### Defined in

[stores/txo-store.ts:492](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L492)

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

Asynchronously destroys the current instance by stopping synchronization and 
destroying the associated storage.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the instance is destroyed.

#### Defined in

[stores/txo-store.ts:33](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L33)

***

### ingest()

> **ingest**(`tx`, `source`, `parseMode`, `outputs`?): `Promise`\<[`IndexContext`](../interfaces/IndexContext.md)\>

Ingests a new transaction into the store, building an index context for it.

#### Parameters

• **tx**: `Transaction`

The transaction to ingest.

• **source**: `string` = `""`

An optional string indicating the source of the transaction.

• **parseMode**: [`ParseMode`](../enumerations/ParseMode.md) = `ParseMode.Persist`

The mode to parse the transaction, default is `ParseMode.Persist`.

• **outputs?**: `Set`\<`number`\>

Optional array of output indices to process.

#### Returns

`Promise`\<[`IndexContext`](../interfaces/IndexContext.md)\>

A promise that resolves to the index context of the ingested transaction.

#### Throws

Will throw an error if an input is missing its source transaction.

#### Defined in

[stores/txo-store.ts:93](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L93)

***

### loadTx()

> **loadTx**(`txid`): `Promise`\<`Transaction`\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

[stores/txo-store.ts:57](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L57)

***

### populateTx()

> **populateTx**(`tx`): `Promise`\<`void`\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:62](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L62)

***

### processConfirms()

> **processConfirms**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:363](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L363)

***

### processDownloads()

> **processDownloads**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:270](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L270)

***

### processImmutable()

> **processImmutable**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:401](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L401)

***

### processIngests()

> **processIngests**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:316](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L316)

***

### processQueue()

> **processQueue**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:258](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L258)

***

### queue()

> **queue**(`ingests`): `Promise`\<`void`\>

#### Parameters

• **ingests**: [`Ingest`](../interfaces/Ingest.md)[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:253](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L253)

***

### queueDependency()

> **queueDependency**(`outpoint`, `parseMode`): `Promise`\<`void`\>

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

• **parseMode**: [`ParseMode`](../enumerations/ParseMode.md) = `ParseMode.Dependency`

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:222](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L222)

***

### refreshSpends()

> **refreshSpends**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:520](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L520)

***

### resolveBlock()

> **resolveBlock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:512](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L512)

***

### resolveOutput()

> **resolveOutput**(`outpoint`, `parseMode`): `Promise`\<[`Txo`](Txo.md)\>

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

• **parseMode**: [`ParseMode`](../enumerations/ParseMode.md) = `ParseMode.Dependency`

#### Returns

`Promise`\<[`Txo`](Txo.md)\>

#### Defined in

[stores/txo-store.ts:240](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L240)

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

[stores/txo-store.ts:48](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L48)

***

### syncTxLogs()

> **syncTxLogs**(`parseMode`): `Promise`\<`void`\>

#### Parameters

• **parseMode**: [`ParseMode`](../enumerations/ParseMode.md) = `ParseMode.Persist`

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:442](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L442)

***

### updateQueueStats()

> **updateQueueStats**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:248](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txo-store.ts#L248)
