[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / TxnStorageIDB

# Class: TxnStorageIDB

## Implements

- [`TxnStorage`](../interfaces/TxnStorage.md)

## Properties

### db

> **db**: `IDBPDatabase`\<[`TxnSchema`](../interfaces/TxnSchema.md)\>

#### Defined in

[storage/idb/idb-txns.ts:19](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/storage/idb/idb-txns.ts#L19)

## Methods

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TxnStorage`](../interfaces/TxnStorage.md).[`destroy`](../interfaces/TxnStorage.md#destroy)

#### Defined in

[storage/idb/idb-txns.ts:34](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/storage/idb/idb-txns.ts#L34)

***

### exists()

> **exists**(`txids`): `Promise`\<`boolean`[]\>

#### Parameters

• **txids**: `string`[]

#### Returns

`Promise`\<`boolean`[]\>

#### Implementation of

[`TxnStorage`](../interfaces/TxnStorage.md).[`exists`](../interfaces/TxnStorage.md#exists)

#### Defined in

[storage/idb/idb-txns.ts:70](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/storage/idb/idb-txns.ts#L70)

***

### get()

> **get**(`txid`): `Promise`\<`undefined` \| [`Txn`](../interfaces/Txn.md)\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| [`Txn`](../interfaces/Txn.md)\>

#### Implementation of

[`TxnStorage`](../interfaces/TxnStorage.md).[`get`](../interfaces/TxnStorage.md#get)

#### Defined in

[storage/idb/idb-txns.ts:38](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/storage/idb/idb-txns.ts#L38)

***

### getByStatus()

> **getByStatus**(`status`, `toBlock`, `limit`): `Promise`\<[`Txn`](../interfaces/Txn.md)[]\>

#### Parameters

• **status**: [`TxnStatus`](../enumerations/TxnStatus.md)

• **toBlock**: `number`

• **limit**: `number` = `25`

#### Returns

`Promise`\<[`Txn`](../interfaces/Txn.md)[]\>

#### Implementation of

[`TxnStorage`](../interfaces/TxnStorage.md).[`getByStatus`](../interfaces/TxnStorage.md#getbystatus)

#### Defined in

[storage/idb/idb-txns.ts:79](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/storage/idb/idb-txns.ts#L79)

***

### getMany()

> **getMany**(`txids`): `Promise`\<(`undefined` \| [`Txn`](../interfaces/Txn.md))[]\>

#### Parameters

• **txids**: `string`[]

#### Returns

`Promise`\<(`undefined` \| [`Txn`](../interfaces/Txn.md))[]\>

#### Implementation of

[`TxnStorage`](../interfaces/TxnStorage.md).[`getMany`](../interfaces/TxnStorage.md#getmany)

#### Defined in

[storage/idb/idb-txns.ts:42](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/storage/idb/idb-txns.ts#L42)

***

### put()

> **put**(`txn`): `Promise`\<`void`\>

#### Parameters

• **txn**: [`Txn`](../interfaces/Txn.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TxnStorage`](../interfaces/TxnStorage.md).[`put`](../interfaces/TxnStorage.md#put)

#### Defined in

[storage/idb/idb-txns.ts:51](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/storage/idb/idb-txns.ts#L51)

***

### putMany()

> **putMany**(`txns`): `Promise`\<`void`\>

#### Parameters

• **txns**: [`Txn`](../interfaces/Txn.md)[]

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TxnStorage`](../interfaces/TxnStorage.md).[`putMany`](../interfaces/TxnStorage.md#putmany)

#### Defined in

[storage/idb/idb-txns.ts:59](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/storage/idb/idb-txns.ts#L59)

***

### init()

> `static` **init**(`network`): `Promise`\<[`TxnStorageIDB`](TxnStorageIDB.md)\>

#### Parameters

• **network**: [`Network`](../type-aliases/Network.md)

#### Returns

`Promise`\<[`TxnStorageIDB`](TxnStorageIDB.md)\>

#### Defined in

[storage/idb/idb-txns.ts:21](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/storage/idb/idb-txns.ts#L21)
