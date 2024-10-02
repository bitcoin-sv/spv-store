[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / TxnStorageIDB

# Class: TxnStorageIDB

Interface representing a transaction storage system.

## Implements

- [`TxnStorage`](../interfaces/TxnStorage.md)

## Properties

### db

> **db**: `IDBPDatabase`\<[`TxnSchema`](../interfaces/TxnSchema.md)\>

#### Defined in

[storage/idb/idb-txns.ts:19](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/storage/idb/idb-txns.ts#L19)

## Methods

### destroy()

> **destroy**(): `Promise`\<`void`\>

Destroys the storage instance, releasing any resources held.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the storage is destroyed.

#### Implementation of

[`TxnStorage`](../interfaces/TxnStorage.md).[`destroy`](../interfaces/TxnStorage.md#destroy)

#### Defined in

[storage/idb/idb-txns.ts:34](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/storage/idb/idb-txns.ts#L34)

***

### exists()

> **exists**(`txids`): `Promise`\<`boolean`[]\>

Checks if transactions exist by their IDs.

#### Parameters

• **txids**: `string`[]

An array of transaction IDs to check.

#### Returns

`Promise`\<`boolean`[]\>

A promise that resolves to an array of booleans indicating the existence of each transaction.

#### Implementation of

[`TxnStorage`](../interfaces/TxnStorage.md).[`exists`](../interfaces/TxnStorage.md#exists)

#### Defined in

[storage/idb/idb-txns.ts:70](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/storage/idb/idb-txns.ts#L70)

***

### get()

> **get**(`txid`): `Promise`\<`undefined` \| [`Txn`](../interfaces/Txn.md)\>

Retrieves a transaction by its ID.

#### Parameters

• **txid**: `string`

The ID of the transaction to retrieve.

#### Returns

`Promise`\<`undefined` \| [`Txn`](../interfaces/Txn.md)\>

A promise that resolves to the transaction if found, or undefined if not found.

#### Implementation of

[`TxnStorage`](../interfaces/TxnStorage.md).[`get`](../interfaces/TxnStorage.md#get)

#### Defined in

[storage/idb/idb-txns.ts:38](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/storage/idb/idb-txns.ts#L38)

***

### getByStatus()

> **getByStatus**(`status`, `toBlock`, `limit`): `Promise`\<[`Txn`](../interfaces/Txn.md)[]\>

Retrieves transactions by their status up to a specified block number, with an optional limit on the number of transactions.

#### Parameters

• **status**: [`TxnStatus`](../enumerations/TxnStatus.md)

The status of the transactions to retrieve.

• **toBlock**: `number`

The block number up to which to retrieve transactions.

• **limit**: `number` = `25`

The maximum number of transactions to retrieve.

#### Returns

`Promise`\<[`Txn`](../interfaces/Txn.md)[]\>

A promise that resolves to an array of transactions matching the criteria.

#### Implementation of

[`TxnStorage`](../interfaces/TxnStorage.md).[`getByStatus`](../interfaces/TxnStorage.md#getbystatus)

#### Defined in

[storage/idb/idb-txns.ts:79](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/storage/idb/idb-txns.ts#L79)

***

### getMany()

> **getMany**(`txids`): `Promise`\<(`undefined` \| [`Txn`](../interfaces/Txn.md))[]\>

Retrieves multiple transactions by their IDs.

#### Parameters

• **txids**: `string`[]

An array of transaction IDs to retrieve.

#### Returns

`Promise`\<(`undefined` \| [`Txn`](../interfaces/Txn.md))[]\>

A promise that resolves to an array of transactions, with undefined for any transactions not found.

#### Implementation of

[`TxnStorage`](../interfaces/TxnStorage.md).[`getMany`](../interfaces/TxnStorage.md#getmany)

#### Defined in

[storage/idb/idb-txns.ts:42](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/storage/idb/idb-txns.ts#L42)

***

### put()

> **put**(`txn`): `Promise`\<`void`\>

Stores a transaction.

#### Parameters

• **txn**: [`Txn`](../interfaces/Txn.md)

The transaction to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the transaction is stored.

#### Implementation of

[`TxnStorage`](../interfaces/TxnStorage.md).[`put`](../interfaces/TxnStorage.md#put)

#### Defined in

[storage/idb/idb-txns.ts:51](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/storage/idb/idb-txns.ts#L51)

***

### putMany()

> **putMany**(`txns`): `Promise`\<`void`\>

Stores multiple transactions.   *

#### Parameters

• **txns**: [`Txn`](../interfaces/Txn.md)[]

An array of transactions to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when all transactions are stored.

#### Implementation of

[`TxnStorage`](../interfaces/TxnStorage.md).[`putMany`](../interfaces/TxnStorage.md#putmany)

#### Defined in

[storage/idb/idb-txns.ts:59](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/storage/idb/idb-txns.ts#L59)

***

### init()

> `static` **init**(`network`): `Promise`\<[`TxnStorageIDB`](TxnStorageIDB.md)\>

#### Parameters

• **network**: [`Network`](../type-aliases/Network.md)

#### Returns

`Promise`\<[`TxnStorageIDB`](TxnStorageIDB.md)\>

#### Defined in

[storage/idb/idb-txns.ts:21](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/storage/idb/idb-txns.ts#L21)
