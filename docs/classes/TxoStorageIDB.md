[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / TxoStorageIDB

# Class: TxoStorageIDB

Interface representing a storage system for transaction outputs (Txo).

## Implements

- [`TxoStorage`](../interfaces/TxoStorage.md)

## Properties

### db

> **db**: `IDBPDatabase`\<[`TxoSchema`](../interfaces/TxoSchema.md)\>

#### Defined in

[storage/idb/idb-txos.ts:85](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L85)

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

[storage/idb/idb-txos.ts:281](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L281)

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

[storage/idb/idb-txos.ts:285](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L285)

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

[storage/idb/idb-txos.ts:116](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L116)

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

[storage/idb/idb-txos.ts:120](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L120)

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

[storage/idb/idb-txos.ts:321](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L321)

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

[storage/idb/idb-txos.ts:134](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L134)

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

[storage/idb/idb-txos.ts:229](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L229)

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

[storage/idb/idb-txos.ts:125](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L125)

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

[storage/idb/idb-txos.ts:217](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L217)

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

[storage/idb/idb-txos.ts:309](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L309)

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

[storage/idb/idb-txos.ts:208](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L208)

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

[storage/idb/idb-txos.ts:291](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L291)

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

[storage/idb/idb-txos.ts:295](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L295)

***

### getUtxos()

> **getUtxos**(): `Promise`\<[`Txo`](Txo.md)[]\>

Get all user utxos

#### Returns

`Promise`\<[`Txo`](Txo.md)[]\>

A promise that resolves to an array of utxos

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getUtxos`](../interfaces/TxoStorage.md#getutxos)

#### Defined in

[storage/idb/idb-txos.ts:382](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L382)

***

### loadDeps()

> **loadDeps**(`op`, `deps`): `Promise`\<`void`\>

#### Parameters

• **op**: [`Outpoint`](Outpoint.md)

• **deps**: `Map`\<`string`, `DepLog`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/idb/idb-txos.ts:357](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L357)

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

[storage/idb/idb-txos.ts:143](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L143)

***

### putIngest()

> **putIngest**(`ingest`, `t`?): `Promise`\<`void`\>

Stores an ingest.

#### Parameters

• **ingest**: [`Ingest`](../interfaces/Ingest.md)

The ingest to store.

• **t?**: `IDBPTransaction`\<[`TxoSchema`](../interfaces/TxoSchema.md), [`"ingestQueue"`], `"readwrite"`\>

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`putIngest`](../interfaces/TxoStorage.md#putingest)

#### Defined in

[storage/idb/idb-txos.ts:248](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L248)

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

[storage/idb/idb-txos.ts:270](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L270)

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

[storage/idb/idb-txos.ts:148](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L148)

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

[storage/idb/idb-txos.ts:305](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L305)

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

[storage/idb/idb-txos.ts:161](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L161)

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

[storage/idb/idb-txos.ts:213](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L213)

***

### init()

> `static` **init**(`accountId`, `network`): `Promise`\<[`TxoStorageIDB`](TxoStorageIDB.md)\>

#### Parameters

• **accountId**: `string`

• **network**: [`Network`](../type-aliases/Network.md)

#### Returns

`Promise`\<[`TxoStorageIDB`](TxoStorageIDB.md)\>

#### Defined in

[storage/idb/idb-txos.ts:86](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/idb/idb-txos.ts#L86)
