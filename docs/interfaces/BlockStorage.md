[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / BlockStorage

# Interface: BlockStorage

Interface representing a block storage system.

## Methods

### destroy()

> **destroy**(): `Promise`\<`void`\>

Destroys the block storage, releasing any resources held.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the storage is destroyed.

#### Defined in

[storage/block-storage.ts:11](https://github.com/shruggr/ts-casemod-spv/blob/8cad294f9d357aecab6b1c47b568729155023889/src/storage/block-storage.ts#L11)

***

### getAll()

> **getAll**(): `Promise`\<[`BlockHeader`](BlockHeader.md)[]\>

Retrieves all block headers.

#### Returns

`Promise`\<[`BlockHeader`](BlockHeader.md)[]\>

A promise that resolves with an array of all block headers.

#### Defined in

[storage/block-storage.ts:45](https://github.com/shruggr/ts-casemod-spv/blob/8cad294f9d357aecab6b1c47b568729155023889/src/storage/block-storage.ts#L45)

***

### getBackup()

> **getBackup**(): `Promise`\<`number`[][]\>

Retrieves a backup of the block storage.

#### Returns

`Promise`\<`number`[][]\>

A promise that resolves with a 2D array representing the backup.

#### Defined in

[storage/block-storage.ts:51](https://github.com/shruggr/ts-casemod-spv/blob/8cad294f9d357aecab6b1c47b568729155023889/src/storage/block-storage.ts#L51)

***

### getByHash()

> **getByHash**(`hash`): `Promise`\<`undefined` \| [`BlockHeader`](BlockHeader.md)\>

Retrieves a block header by its hash.

#### Parameters

• **hash**: `string`

The hash of the block header to retrieve.

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](BlockHeader.md)\>

A promise that resolves with the block header if found, or undefined if not found.

#### Defined in

[storage/block-storage.ts:32](https://github.com/shruggr/ts-casemod-spv/blob/8cad294f9d357aecab6b1c47b568729155023889/src/storage/block-storage.ts#L32)

***

### getByHeight()

> **getByHeight**(`height`): `Promise`\<`undefined` \| [`BlockHeader`](BlockHeader.md)\>

Retrieves a block header by its height.

#### Parameters

• **height**: `number`

The height of the block header to retrieve.

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](BlockHeader.md)\>

A promise that resolves with the block header if found, or undefined if not found.

#### Defined in

[storage/block-storage.ts:39](https://github.com/shruggr/ts-casemod-spv/blob/8cad294f9d357aecab6b1c47b568729155023889/src/storage/block-storage.ts#L39)

***

### getSynced()

> **getSynced**(): `Promise`\<`undefined` \| [`BlockHeader`](BlockHeader.md)\>

Retrieves the most recently synced block header.

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](BlockHeader.md)\>

A promise that resolves with the most recently synced block header, or undefined if none are synced.

#### Defined in

[storage/block-storage.ts:57](https://github.com/shruggr/ts-casemod-spv/blob/8cad294f9d357aecab6b1c47b568729155023889/src/storage/block-storage.ts#L57)

***

### put()

> **put**(`block`): `Promise`\<`void`\>

Stores a single block header.

#### Parameters

• **block**: [`BlockHeader`](BlockHeader.md)

The block header to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the block header is stored.

#### Defined in

[storage/block-storage.ts:18](https://github.com/shruggr/ts-casemod-spv/blob/8cad294f9d357aecab6b1c47b568729155023889/src/storage/block-storage.ts#L18)

***

### putMany()

> **putMany**(`blocks`): `Promise`\<`void`\>

Stores multiple block headers.

#### Parameters

• **blocks**: [`BlockHeader`](BlockHeader.md)[]

An array of block headers to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when all block headers are stored.

#### Defined in

[storage/block-storage.ts:25](https://github.com/shruggr/ts-casemod-spv/blob/8cad294f9d357aecab6b1c47b568729155023889/src/storage/block-storage.ts#L25)
