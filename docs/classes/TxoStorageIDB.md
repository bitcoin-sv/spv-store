[**spv-store v0.1.44**](../README.md) • **Docs**

***

[spv-store v0.1.44](../globals.md) / TxoStorageIDB

# Class: TxoStorageIDB

Interface representing a storage system for transaction outputs (Txo).

## Implements

- [`TxoStorage`](../interfaces/TxoStorage.md)

## Properties

### db

> **db**: `IDBPDatabase`\<[`TxoSchema`](../interfaces/TxoSchema.md)\>

#### Defined in

[storage/idb/idb-txos.ts:78](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L78)

## Methods

### delIngest()

> **delIngest**(`txid`): `Promise`\<`void`\>

Deletes an ingest by its transaction ID.

#### Parameters

• **txid**: `string`

The transaction ID of the ingest to delete.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`delIngest`](../interfaces/TxoStorage.md#delingest)

#### Defined in

[storage/idb/idb-txos.ts:268](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L268)

***

### delIngests()

> **delIngests**(`txids`): `Promise`\<`void`\>

Deletes multiple ingests by their transaction IDs.

#### Parameters

• **txids**: `string`[]

An array of transaction IDs of the ingests to delete.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`delIngests`](../interfaces/TxoStorage.md#delingests)

#### Defined in

[storage/idb/idb-txos.ts:272](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L272)

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

Destroys the storage, cleaning up any resources.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`destroy`](../interfaces/TxoStorage.md#destroy)

#### Defined in

[storage/idb/idb-txos.ts:108](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L108)

***

### get()

> **get**(`outpoint`): `Promise`\<`undefined` \| [`Txo`](Txo.md)\>

Retrieves a transaction output by its outpoint.

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

The outpoint of the transaction output.

#### Returns

`Promise`\<`undefined` \| [`Txo`](Txo.md)\>

A promise that resolves to the transaction output or undefined if not found.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`get`](../interfaces/TxoStorage.md#get)

#### Defined in

[storage/idb/idb-txos.ts:112](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L112)

***

### getBackupLogs()

> **getBackupLogs**(): `Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

Retrieves backup logs.

#### Returns

`Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

A promise that resolves to an array of backup logs.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getBackupLogs`](../interfaces/TxoStorage.md#getbackuplogs)

#### Defined in

[storage/idb/idb-txos.ts:308](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L308)

***

### getBySpend()

> **getBySpend**(`txid`): `Promise`\<[`Txo`](Txo.md)[]\>

Retrieves transaction outputs by the transaction ID that spent them.

#### Parameters

• **txid**: `string`

The transaction ID.

#### Returns

`Promise`\<[`Txo`](Txo.md)[]\>

A promise that resolves to an array of transaction outputs.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getBySpend`](../interfaces/TxoStorage.md#getbyspend)

#### Defined in

[storage/idb/idb-txos.ts:126](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L126)

***

### getIngests()

> **getIngests**(`status`, `limit`, `start`, `stop`): `Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

Retrieves ingests based on their status.

#### Parameters

• **status**: [`IngestStatus`](../enumerations/IngestStatus.md)

The status of the ingests.

• **limit**: `number`

The maximum number of ingests to retrieve.

• **start**: `number` = `0`

Optional starting point for the retrieval.

• **stop**: `number` = `0`

Optional stopping point for the retrieval.

#### Returns

`Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

A promise that resolves to an array of ingests.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getIngests`](../interfaces/TxoStorage.md#getingests)

#### Defined in

[storage/idb/idb-txos.ts:216](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L216)

***

### getMany()

> **getMany**(`outpoints`): `Promise`\<(`undefined` \| [`Txo`](Txo.md))[]\>

Retrieves multiple transaction outputs by their outpoints.

#### Parameters

• **outpoints**: [`Outpoint`](Outpoint.md)[]

An array of outpoints.

#### Returns

`Promise`\<(`undefined` \| [`Txo`](Txo.md))[]\>

A promise that resolves to an array of transaction outputs or undefined if not found.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getMany`](../interfaces/TxoStorage.md#getmany)

#### Defined in

[storage/idb/idb-txos.ts:117](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L117)

***

### getQueueLength()

> **getQueueLength**(): `Promise`\<`number`\>

Retrieves the length of the queue.

#### Returns

`Promise`\<`number`\>

A promise that resolves to the length of the queue.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getQueueLength`](../interfaces/TxoStorage.md#getqueuelength)

#### Defined in

[storage/idb/idb-txos.ts:204](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L204)

***

### getRecentTxLogs()

> **getRecentTxLogs**(`limit`): `Promise`\<[`TxLog`](TxLog.md)[]\>

Retrieves recent transaction logs.

#### Parameters

• **limit**: `number` = `100`

Optional limit on the number of logs to retrieve.

#### Returns

`Promise`\<[`TxLog`](TxLog.md)[]\>

A promise that resolves to an array of recent transaction logs.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getRecentTxLogs`](../interfaces/TxoStorage.md#getrecenttxlogs)

#### Defined in

[storage/idb/idb-txos.ts:296](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L296)

***

### getState()

> **getState**(`key`): `Promise`\<`undefined` \| `string`\>

Retrieves a state value by its key.

#### Parameters

• **key**: `string`

The key of the state value.

#### Returns

`Promise`\<`undefined` \| `string`\>

A promise that resolves to the state value or undefined if not found.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getState`](../interfaces/TxoStorage.md#getstate)

#### Defined in

[storage/idb/idb-txos.ts:195](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L195)

***

### getTxLog()

> **getTxLog**(`txid`): `Promise`\<`undefined` \| [`TxLog`](TxLog.md)\>

Retrieves a transaction log by its transaction ID.

#### Parameters

• **txid**: `string`

The transaction ID of the log to retrieve.

#### Returns

`Promise`\<`undefined` \| [`TxLog`](TxLog.md)\>

A promise that resolves to the transaction log or undefined if not found.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getTxLog`](../interfaces/TxoStorage.md#gettxlog)

#### Defined in

[storage/idb/idb-txos.ts:278](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L278)

***

### getTxLogs()

> **getTxLogs**(`txids`): `Promise`\<(`undefined` \| [`TxLog`](TxLog.md))[]\>

Retrieves multiple transaction logs by their transaction IDs.

#### Parameters

• **txids**: `string`[]

An array of transaction IDs of the logs to retrieve.

#### Returns

`Promise`\<(`undefined` \| [`TxLog`](TxLog.md))[]\>

A promise that resolves to an array of transaction logs or undefined if not found.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getTxLogs`](../interfaces/TxoStorage.md#gettxlogs)

#### Defined in

[storage/idb/idb-txos.ts:282](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L282)

***

### loadDeps()

> **loadDeps**(`op`, `deps`): `Promise`\<`void`\>

#### Parameters

• **op**: [`Outpoint`](Outpoint.md)

• **deps**: `Map`\<`string`, `DepLog`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/idb/idb-txos.ts:344](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L344)

***

### put()

> **put**(`txo`): `Promise`\<`void`\>

Stores a transaction output.

#### Parameters

• **txo**: [`Txo`](Txo.md)

The transaction output to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`put`](../interfaces/TxoStorage.md#put)

#### Defined in

[storage/idb/idb-txos.ts:135](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L135)

***

### putIngest()

> **putIngest**(`ingest`): `Promise`\<`void`\>

Stores an ingest.

#### Parameters

• **ingest**: [`Ingest`](../interfaces/Ingest.md)

The ingest to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`putIngest`](../interfaces/TxoStorage.md#putingest)

#### Defined in

[storage/idb/idb-txos.ts:235](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L235)

***

### putIngests()

> **putIngests**(`ingests`): `Promise`\<`void`\>

Stores multiple ingests.

#### Parameters

• **ingests**: [`Ingest`](../interfaces/Ingest.md)[]

An array of ingests to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`putIngests`](../interfaces/TxoStorage.md#putingests)

#### Defined in

[storage/idb/idb-txos.ts:249](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L249)

***

### putMany()

> **putMany**(`txos`): `Promise`\<`void`\>

Stores multiple transaction outputs.

#### Parameters

• **txos**: [`Txo`](Txo.md)[]

An array of transaction outputs to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`putMany`](../interfaces/TxoStorage.md#putmany)

#### Defined in

[storage/idb/idb-txos.ts:140](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L140)

***

### putTxLog()

> **putTxLog**(`txLog`): `Promise`\<`void`\>

Stores a transaction log.

#### Parameters

• **txLog**: [`TxLog`](TxLog.md)

The transaction log to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`putTxLog`](../interfaces/TxoStorage.md#puttxlog)

#### Defined in

[storage/idb/idb-txos.ts:292](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L292)

***

### search()

> **search**(`lookup`, `sort`, `limit`, `from`?): `Promise`\<[`TxoResults`](../interfaces/TxoResults.md)\>

Searches for transaction outputs based on a lookup criteria.

#### Parameters

• **lookup**: [`TxoLookup`](TxoLookup.md)

The lookup criteria.

• **sort**: [`TxoSort`](../enumerations/TxoSort.md) = `TxoSort.DESC`

Optional sorting criteria.

• **limit**: `number` = `10`

Optional limit on the number of results.

• **from?**: `string`

Optional starting point for the search.

#### Returns

`Promise`\<[`TxoResults`](../interfaces/TxoResults.md)\>

A promise that resolves to the search results.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`search`](../interfaces/TxoStorage.md#search)

#### Defined in

[storage/idb/idb-txos.ts:152](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L152)

***

### setState()

> **setState**(`key`, `value`): `Promise`\<`void`\>

Sets a state value by its key.

#### Parameters

• **key**: `string`

The key of the state value.

• **value**: `string`

The value to set.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`setState`](../interfaces/TxoStorage.md#setstate)

#### Defined in

[storage/idb/idb-txos.ts:200](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L200)

***

### init()

> `static` **init**(`accountId`, `network`): `Promise`\<[`TxoStorageIDB`](TxoStorageIDB.md)\>

#### Parameters

• **accountId**: `string`

• **network**: [`Network`](../type-aliases/Network.md)

#### Returns

`Promise`\<[`TxoStorageIDB`](TxoStorageIDB.md)\>

#### Defined in

[storage/idb/idb-txos.ts:79](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/storage/idb/idb-txos.ts#L79)
