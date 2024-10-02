[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / BlockStorageIDB

# Class: BlockStorageIDB

Interface representing a block storage system.

## Implements

- [`BlockStorage`](../interfaces/BlockStorage.md)

## Properties

### db

> **db**: `IDBPDatabase`\<[`BlockSchema`](../interfaces/BlockSchema.md)\>

#### Defined in

[storage/idb/idb-blocks.ts:20](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/storage/idb/idb-blocks.ts#L20)

## Methods

### destroy()

> **destroy**(): `Promise`\<`void`\>

Destroys the block storage, releasing any resources held.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the storage is destroyed.

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`destroy`](../interfaces/BlockStorage.md#destroy)

#### Defined in

[storage/idb/idb-blocks.ts:39](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/storage/idb/idb-blocks.ts#L39)

***

### getAll()

> **getAll**(): `Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)[]\>

Retrieves all block headers.

#### Returns

`Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)[]\>

A promise that resolves with an array of all block headers.

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`getAll`](../interfaces/BlockStorage.md#getall)

#### Defined in

[storage/idb/idb-blocks.ts:73](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/storage/idb/idb-blocks.ts#L73)

***

### getBackup()

> **getBackup**(): `Promise`\<`number`[][]\>

Retrieves a backup of the block storage.

#### Returns

`Promise`\<`number`[][]\>

A promise that resolves with a 2D array representing the backup.

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`getBackup`](../interfaces/BlockStorage.md#getbackup)

#### Defined in

[storage/idb/idb-blocks.ts:77](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/storage/idb/idb-blocks.ts#L77)

***

### getByHash()

> **getByHash**(`hash`): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

Retrieves a block header by its hash.

#### Parameters

• **hash**: `string`

The hash of the block header to retrieve.

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

A promise that resolves with the block header if found, or undefined if not found.

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`getByHash`](../interfaces/BlockStorage.md#getbyhash)

#### Defined in

[storage/idb/idb-blocks.ts:56](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/storage/idb/idb-blocks.ts#L56)

***

### getByHeight()

> **getByHeight**(`height`): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

Retrieves a block header by its height.

#### Parameters

• **height**: `number`

The height of the block header to retrieve.

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

A promise that resolves with the block header if found, or undefined if not found.

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`getByHeight`](../interfaces/BlockStorage.md#getbyheight)

#### Defined in

[storage/idb/idb-blocks.ts:60](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/storage/idb/idb-blocks.ts#L60)

***

### getSynced()

> **getSynced**(): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

Retrieves the most recently synced block header.

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

A promise that resolves with the most recently synced block header, or undefined if none are synced.

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`getSynced`](../interfaces/BlockStorage.md#getsynced)

#### Defined in

[storage/idb/idb-blocks.ts:64](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/storage/idb/idb-blocks.ts#L64)

***

### put()

> **put**(`block`): `Promise`\<`void`\>

Stores a single block header.

#### Parameters

• **block**: [`BlockHeader`](../interfaces/BlockHeader.md)

The block header to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the block header is stored.

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`put`](../interfaces/BlockStorage.md#put)

#### Defined in

[storage/idb/idb-blocks.ts:43](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/storage/idb/idb-blocks.ts#L43)

***

### putMany()

> **putMany**(`blocks`): `Promise`\<`void`\>

Stores multiple block headers.

#### Parameters

• **blocks**: [`BlockHeader`](../interfaces/BlockHeader.md)[]

An array of block headers to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when all block headers are stored.

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`putMany`](../interfaces/BlockStorage.md#putmany)

#### Defined in

[storage/idb/idb-blocks.ts:47](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/storage/idb/idb-blocks.ts#L47)

***

### init()

> `static` **init**(`network`): `Promise`\<[`BlockStorageIDB`](BlockStorageIDB.md)\>

#### Parameters

• **network**: [`Network`](../type-aliases/Network.md)

#### Returns

`Promise`\<[`BlockStorageIDB`](BlockStorageIDB.md)\>

#### Defined in

[storage/idb/idb-blocks.ts:22](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/storage/idb/idb-blocks.ts#L22)
