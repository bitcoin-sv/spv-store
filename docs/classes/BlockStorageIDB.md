[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / BlockStorageIDB

# Class: BlockStorageIDB

## Implements

- [`BlockStorage`](../interfaces/BlockStorage.md)

## Properties

### db

> **db**: `IDBPDatabase`\<[`BlockSchema`](../interfaces/BlockSchema.md)\>

#### Defined in

[storage/idb/idb-blocks.ts:20](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/idb/idb-blocks.ts#L20)

## Methods

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`destroy`](../interfaces/BlockStorage.md#destroy)

#### Defined in

[storage/idb/idb-blocks.ts:39](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/idb/idb-blocks.ts#L39)

***

### getAll()

> **getAll**(): `Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)[]\>

#### Returns

`Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)[]\>

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`getAll`](../interfaces/BlockStorage.md#getall)

#### Defined in

[storage/idb/idb-blocks.ts:73](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/idb/idb-blocks.ts#L73)

***

### getBackup()

> **getBackup**(): `Promise`\<`number`[][]\>

#### Returns

`Promise`\<`number`[][]\>

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`getBackup`](../interfaces/BlockStorage.md#getbackup)

#### Defined in

[storage/idb/idb-blocks.ts:77](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/idb/idb-blocks.ts#L77)

***

### getByHash()

> **getByHash**(`hash`): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Parameters

• **hash**: `string`

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`getByHash`](../interfaces/BlockStorage.md#getbyhash)

#### Defined in

[storage/idb/idb-blocks.ts:56](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/idb/idb-blocks.ts#L56)

***

### getByHeight()

> **getByHeight**(`height`): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Parameters

• **height**: `number`

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`getByHeight`](../interfaces/BlockStorage.md#getbyheight)

#### Defined in

[storage/idb/idb-blocks.ts:60](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/idb/idb-blocks.ts#L60)

***

### getSynced()

> **getSynced**(): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`getSynced`](../interfaces/BlockStorage.md#getsynced)

#### Defined in

[storage/idb/idb-blocks.ts:64](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/idb/idb-blocks.ts#L64)

***

### put()

> **put**(`block`): `Promise`\<`void`\>

#### Parameters

• **block**: [`BlockHeader`](../interfaces/BlockHeader.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`put`](../interfaces/BlockStorage.md#put)

#### Defined in

[storage/idb/idb-blocks.ts:43](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/idb/idb-blocks.ts#L43)

***

### putMany()

> **putMany**(`blocks`): `Promise`\<`void`\>

#### Parameters

• **blocks**: [`BlockHeader`](../interfaces/BlockHeader.md)[]

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`BlockStorage`](../interfaces/BlockStorage.md).[`putMany`](../interfaces/BlockStorage.md#putmany)

#### Defined in

[storage/idb/idb-blocks.ts:47](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/idb/idb-blocks.ts#L47)

***

### init()

> `static` **init**(`network`): `Promise`\<[`BlockStorageIDB`](BlockStorageIDB.md)\>

#### Parameters

• **network**: [`Network`](../type-aliases/Network.md)

#### Returns

`Promise`\<[`BlockStorageIDB`](BlockStorageIDB.md)\>

#### Defined in

[storage/idb/idb-blocks.ts:22](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/idb/idb-blocks.ts#L22)
