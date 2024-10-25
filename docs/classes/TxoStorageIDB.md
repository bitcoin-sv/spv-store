[**spv-store v0.1.24**](../README.md) • **Docs**

***

[spv-store v0.1.24](../globals.md) / TxoStorageIDB

# Class: TxoStorageIDB

Interface representing a storage system for transaction outputs (Txo).

## Implements

- [`TxoStorage`](../interfaces/TxoStorage.md)

## Properties

### db

> **db**: `IDBPDatabase`\<[`TxoSchema`](../interfaces/TxoSchema.md)\>

#### Defined in

[storage/idb/idb-txos.ts:77](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L77)

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

[storage/idb/idb-txos.ts:267](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L267)

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

[storage/idb/idb-txos.ts:271](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L271)

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

[storage/idb/idb-txos.ts:107](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L107)

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

[storage/idb/idb-txos.ts:111](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L111)

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

[storage/idb/idb-txos.ts:307](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L307)

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

[storage/idb/idb-txos.ts:125](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L125)

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

[storage/idb/idb-txos.ts:215](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L215)

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

[storage/idb/idb-txos.ts:116](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L116)

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

[storage/idb/idb-txos.ts:203](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L203)

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

[storage/idb/idb-txos.ts:295](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L295)

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

[storage/idb/idb-txos.ts:194](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L194)

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

[storage/idb/idb-txos.ts:277](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L277)

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

[storage/idb/idb-txos.ts:281](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L281)

***

### loadDeps()

> **loadDeps**(`op`, `deps`): `Promise`\<`void`\>

#### Parameters

• **op**: [`Outpoint`](Outpoint.md)

• **deps**: `Map`\<`string`, `DepLog`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/idb/idb-txos.ts:343](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L343)

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

[storage/idb/idb-txos.ts:134](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L134)

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

[storage/idb/idb-txos.ts:234](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L234)

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

[storage/idb/idb-txos.ts:248](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L248)

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

[storage/idb/idb-txos.ts:139](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L139)

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

[storage/idb/idb-txos.ts:291](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L291)

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

[storage/idb/idb-txos.ts:151](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L151)

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

[storage/idb/idb-txos.ts:199](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L199)

***

### init()

> `static` **init**(`accountId`, `network`): `Promise`\<[`TxoStorageIDB`](TxoStorageIDB.md)\>

#### Parameters

• **accountId**: `string`

• **network**: [`Network`](../type-aliases/Network.md)

#### Returns

`Promise`\<[`TxoStorageIDB`](TxoStorageIDB.md)\>

#### Defined in

[storage/idb/idb-txos.ts:78](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/idb/idb-txos.ts#L78)
