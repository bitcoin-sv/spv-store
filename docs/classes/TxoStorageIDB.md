[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / TxoStorageIDB

# Class: TxoStorageIDB

## Implements

- [`TxoStorage`](../interfaces/TxoStorage.md)

## Properties

### db

> **db**: `IDBPDatabase`\<[`TxoSchema`](../interfaces/TxoSchema.md)\>

#### Defined in

[storage/idb/idb-txos.ts:77](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L77)

## Methods

### delIngest()

> **delIngest**(`txid`): `Promise`\<`void`\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`delIngest`](../interfaces/TxoStorage.md#delingest)

#### Defined in

[storage/idb/idb-txos.ts:259](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L259)

***

### delIngests()

> **delIngests**(`txids`): `Promise`\<`void`\>

#### Parameters

• **txids**: `string`[]

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`delIngests`](../interfaces/TxoStorage.md#delingests)

#### Defined in

[storage/idb/idb-txos.ts:263](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L263)

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`destroy`](../interfaces/TxoStorage.md#destroy)

#### Defined in

[storage/idb/idb-txos.ts:107](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L107)

***

### get()

> **get**(`outpoint`): `Promise`\<`undefined` \| [`Txo`](Txo.md)\>

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

#### Returns

`Promise`\<`undefined` \| [`Txo`](Txo.md)\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`get`](../interfaces/TxoStorage.md#get)

#### Defined in

[storage/idb/idb-txos.ts:111](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L111)

***

### getBackupLogs()

> **getBackupLogs**(): `Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

#### Returns

`Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getBackupLogs`](../interfaces/TxoStorage.md#getbackuplogs)

#### Defined in

[storage/idb/idb-txos.ts:298](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L298)

***

### getBySpend()

> **getBySpend**(`txid`): `Promise`\<[`Txo`](Txo.md)[]\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<[`Txo`](Txo.md)[]\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getBySpend`](../interfaces/TxoStorage.md#getbyspend)

#### Defined in

[storage/idb/idb-txos.ts:125](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L125)

***

### getIngests()

> **getIngests**(`status`, `limit`, `start`, `stop`): `Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

#### Parameters

• **status**: [`IngestStatus`](../enumerations/IngestStatus.md)

• **limit**: `number`

• **start**: `number` = `0`

• **stop**: `number` = `0`

#### Returns

`Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getIngests`](../interfaces/TxoStorage.md#getingests)

#### Defined in

[storage/idb/idb-txos.ts:207](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L207)

***

### getMany()

> **getMany**(`outpoints`): `Promise`\<(`undefined` \| [`Txo`](Txo.md))[]\>

#### Parameters

• **outpoints**: [`Outpoint`](Outpoint.md)[]

#### Returns

`Promise`\<(`undefined` \| [`Txo`](Txo.md))[]\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getMany`](../interfaces/TxoStorage.md#getmany)

#### Defined in

[storage/idb/idb-txos.ts:116](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L116)

***

### getQueueLength()

> **getQueueLength**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getQueueLength`](../interfaces/TxoStorage.md#getqueuelength)

#### Defined in

[storage/idb/idb-txos.ts:195](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L195)

***

### getRecentTxLogs()

> **getRecentTxLogs**(`limit`): `Promise`\<[`TxLog`](TxLog.md)[]\>

#### Parameters

• **limit**: `number` = `100`

#### Returns

`Promise`\<[`TxLog`](TxLog.md)[]\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getRecentTxLogs`](../interfaces/TxoStorage.md#getrecenttxlogs)

#### Defined in

[storage/idb/idb-txos.ts:286](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L286)

***

### getState()

> **getState**(`key`): `Promise`\<`undefined` \| `string`\>

#### Parameters

• **key**: `string`

#### Returns

`Promise`\<`undefined` \| `string`\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getState`](../interfaces/TxoStorage.md#getstate)

#### Defined in

[storage/idb/idb-txos.ts:186](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L186)

***

### getTxLog()

> **getTxLog**(`txid`): `Promise`\<`undefined` \| [`TxLog`](TxLog.md)\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| [`TxLog`](TxLog.md)\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getTxLog`](../interfaces/TxoStorage.md#gettxlog)

#### Defined in

[storage/idb/idb-txos.ts:269](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L269)

***

### getTxLogs()

> **getTxLogs**(`txids`): `Promise`\<(`undefined` \| [`TxLog`](TxLog.md))[]\>

#### Parameters

• **txids**: `string`[]

#### Returns

`Promise`\<(`undefined` \| [`TxLog`](TxLog.md))[]\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`getTxLogs`](../interfaces/TxoStorage.md#gettxlogs)

#### Defined in

[storage/idb/idb-txos.ts:273](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L273)

***

### loadDeps()

> **loadDeps**(`op`, `deps`): `Promise`\<`void`\>

#### Parameters

• **op**: [`Outpoint`](Outpoint.md)

• **deps**: `Map`\<`string`, `DepLog`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/idb/idb-txos.ts:331](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L331)

***

### put()

> **put**(`txo`): `Promise`\<`void`\>

#### Parameters

• **txo**: [`Txo`](Txo.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`put`](../interfaces/TxoStorage.md#put)

#### Defined in

[storage/idb/idb-txos.ts:134](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L134)

***

### putIngest()

> **putIngest**(`ingest`): `Promise`\<`void`\>

#### Parameters

• **ingest**: [`Ingest`](../interfaces/Ingest.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`putIngest`](../interfaces/TxoStorage.md#putingest)

#### Defined in

[storage/idb/idb-txos.ts:226](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L226)

***

### putIngests()

> **putIngests**(`ingests`): `Promise`\<`void`\>

#### Parameters

• **ingests**: [`Ingest`](../interfaces/Ingest.md)[]

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`putIngests`](../interfaces/TxoStorage.md#putingests)

#### Defined in

[storage/idb/idb-txos.ts:240](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L240)

***

### putMany()

> **putMany**(`txos`): `Promise`\<`void`\>

#### Parameters

• **txos**: [`Txo`](Txo.md)[]

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`putMany`](../interfaces/TxoStorage.md#putmany)

#### Defined in

[storage/idb/idb-txos.ts:139](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L139)

***

### putTxLog()

> **putTxLog**(`txLog`): `Promise`\<`void`\>

#### Parameters

• **txLog**: [`TxLog`](TxLog.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`putTxLog`](../interfaces/TxoStorage.md#puttxlog)

#### Defined in

[storage/idb/idb-txos.ts:282](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L282)

***

### search()

> **search**(`lookup`, `sort`, `limit`, `from`?): `Promise`\<[`TxoResults`](../interfaces/TxoResults.md)\>

#### Parameters

• **lookup**: [`TxoLookup`](TxoLookup.md)

• **sort**: [`TxoSort`](../enumerations/TxoSort.md) = `TxoSort.DESC`

• **limit**: `number` = `10`

• **from?**: `string`

#### Returns

`Promise`\<[`TxoResults`](../interfaces/TxoResults.md)\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`search`](../interfaces/TxoStorage.md#search)

#### Defined in

[storage/idb/idb-txos.ts:151](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L151)

***

### setState()

> **setState**(`key`, `value`): `Promise`\<`void`\>

#### Parameters

• **key**: `string`

• **value**: `string`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TxoStorage`](../interfaces/TxoStorage.md).[`setState`](../interfaces/TxoStorage.md#setstate)

#### Defined in

[storage/idb/idb-txos.ts:191](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L191)

***

### init()

> `static` **init**(`accountId`, `network`): `Promise`\<[`TxoStorageIDB`](TxoStorageIDB.md)\>

#### Parameters

• **accountId**: `string`

• **network**: [`Network`](../type-aliases/Network.md)

#### Returns

`Promise`\<[`TxoStorageIDB`](TxoStorageIDB.md)\>

#### Defined in

[storage/idb/idb-txos.ts:78](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/idb/idb-txos.ts#L78)
