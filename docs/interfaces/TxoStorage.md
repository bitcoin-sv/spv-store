[**spv-store v0.1.24**](../README.md) • **Docs**

***

[spv-store v0.1.24](../globals.md) / TxoStorage

# Interface: TxoStorage

Interface representing a storage system for transaction outputs (Txo).

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

#### Defined in

[storage/txo-storage.ts:117](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L117)

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

#### Defined in

[storage/txo-storage.ts:124](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L124)

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

Destroys the storage, cleaning up any resources.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Defined in

[storage/txo-storage.ts:15](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L15)

***

### get()

> **get**(`outpoint`): `Promise`\<`undefined` \| [`Txo`](../classes/Txo.md)\>

Retrieves a transaction output by its outpoint.

#### Parameters

• **outpoint**: [`Outpoint`](../classes/Outpoint.md)

The outpoint of the transaction output.

#### Returns

`Promise`\<`undefined` \| [`Txo`](../classes/Txo.md)\>

A promise that resolves to the transaction output or undefined if not found.

#### Defined in

[storage/txo-storage.ts:22](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L22)

***

### getBackupLogs()

> **getBackupLogs**(): `Promise`\<[`Ingest`](Ingest.md)[]\>

Retrieves backup logs.

#### Returns

`Promise`\<[`Ingest`](Ingest.md)[]\>

A promise that resolves to an array of backup logs.

#### Defined in

[storage/txo-storage.ts:158](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L158)

***

### getBySpend()

> **getBySpend**(`txid`): `Promise`\<[`Txo`](../classes/Txo.md)[]\>

Retrieves transaction outputs by the transaction ID that spent them.

#### Parameters

• **txid**: `string`

The transaction ID.

#### Returns

`Promise`\<[`Txo`](../classes/Txo.md)[]\>

A promise that resolves to an array of transaction outputs.

#### Defined in

[storage/txo-storage.ts:36](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L36)

***

### getIngests()

> **getIngests**(`status`, `limit`, `start`?, `stop`?): `Promise`\<[`Ingest`](Ingest.md)[]\>

Retrieves ingests based on their status.

#### Parameters

• **status**: [`IngestStatus`](../enumerations/IngestStatus.md)

The status of the ingests.

• **limit**: `number`

The maximum number of ingests to retrieve.

• **start?**: `number`

Optional starting point for the retrieval.

• **stop?**: `number`

Optional stopping point for the retrieval.

#### Returns

`Promise`\<[`Ingest`](Ingest.md)[]\>

A promise that resolves to an array of ingests.

#### Defined in

[storage/txo-storage.ts:91](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L91)

***

### getMany()

> **getMany**(`outpoints`): `Promise`\<(`undefined` \| [`Txo`](../classes/Txo.md))[]\>

Retrieves multiple transaction outputs by their outpoints.

#### Parameters

• **outpoints**: [`Outpoint`](../classes/Outpoint.md)[]

An array of outpoints.

#### Returns

`Promise`\<(`undefined` \| [`Txo`](../classes/Txo.md))[]\>

A promise that resolves to an array of transaction outputs or undefined if not found.

#### Defined in

[storage/txo-storage.ts:29](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L29)

***

### getQueueLength()

> **getQueueLength**(): `Promise`\<`number`\>

Retrieves the length of the queue.

#### Returns

`Promise`\<`number`\>

A promise that resolves to the length of the queue.

#### Defined in

[storage/txo-storage.ts:81](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L81)

***

### getRecentTxLogs()

> **getRecentTxLogs**(`limit`?): `Promise`\<[`TxLog`](../classes/TxLog.md)[]\>

Retrieves recent transaction logs.

#### Parameters

• **limit?**: `number`

Optional limit on the number of logs to retrieve.

#### Returns

`Promise`\<[`TxLog`](../classes/TxLog.md)[]\>

A promise that resolves to an array of recent transaction logs.

#### Defined in

[storage/txo-storage.ts:145](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L145)

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

#### Defined in

[storage/txo-storage.ts:67](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L67)

***

### getTxLog()

> **getTxLog**(`txid`): `Promise`\<`undefined` \| [`TxLog`](../classes/TxLog.md)\>

Retrieves a transaction log by its transaction ID.

#### Parameters

• **txid**: `string`

The transaction ID of the log to retrieve.

#### Returns

`Promise`\<`undefined` \| [`TxLog`](../classes/TxLog.md)\>

A promise that resolves to the transaction log or undefined if not found.

#### Defined in

[storage/txo-storage.ts:131](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L131)

***

### getTxLogs()

> **getTxLogs**(`txids`): `Promise`\<(`undefined` \| [`TxLog`](../classes/TxLog.md))[]\>

Retrieves multiple transaction logs by their transaction IDs.

#### Parameters

• **txids**: `string`[]

An array of transaction IDs of the logs to retrieve.

#### Returns

`Promise`\<(`undefined` \| [`TxLog`](../classes/TxLog.md))[]\>

A promise that resolves to an array of transaction logs or undefined if not found.

#### Defined in

[storage/txo-storage.ts:138](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L138)

***

### put()

> **put**(`txo`): `Promise`\<`void`\>

Stores a transaction output.

#### Parameters

• **txo**: [`Txo`](../classes/Txo.md)

The transaction output to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Defined in

[storage/txo-storage.ts:43](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L43)

***

### putIngest()

> **putIngest**(`ingest`): `Promise`\<`void`\>

Stores an ingest.

#### Parameters

• **ingest**: [`Ingest`](Ingest.md)

The ingest to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Defined in

[storage/txo-storage.ts:103](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L103)

***

### putIngests()

> **putIngests**(`ingests`): `Promise`\<`void`\>

Stores multiple ingests.

#### Parameters

• **ingests**: [`Ingest`](Ingest.md)[]

An array of ingests to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Defined in

[storage/txo-storage.ts:110](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L110)

***

### putMany()

> **putMany**(`txos`): `Promise`\<`void`\>

Stores multiple transaction outputs.

#### Parameters

• **txos**: [`Txo`](../classes/Txo.md)[]

An array of transaction outputs to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Defined in

[storage/txo-storage.ts:50](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L50)

***

### putTxLog()

> **putTxLog**(`txLog`): `Promise`\<`void`\>

Stores a transaction log.

#### Parameters

• **txLog**: [`TxLog`](../classes/TxLog.md)

The transaction log to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the operation is complete.

#### Defined in

[storage/txo-storage.ts:152](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L152)

***

### search()

> **search**(`lookup`, `sort`?, `limit`?, `from`?): `Promise`\<[`TxoResults`](TxoResults.md)\>

Searches for transaction outputs based on a lookup criteria.

#### Parameters

• **lookup**: [`TxoLookup`](../classes/TxoLookup.md)

The lookup criteria.

• **sort?**: [`TxoSort`](../enumerations/TxoSort.md)

Optional sorting criteria.

• **limit?**: `number`

Optional limit on the number of results.

• **from?**: `string`

Optional starting point for the search.

#### Returns

`Promise`\<[`TxoResults`](TxoResults.md)\>

A promise that resolves to the search results.

#### Defined in

[storage/txo-storage.ts:60](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L60)

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

#### Defined in

[storage/txo-storage.ts:75](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/storage/txo-storage.ts#L75)
