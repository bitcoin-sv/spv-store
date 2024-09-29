[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / BlockStorage

# Interface: BlockStorage

## Methods

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/block-storage.ts:4](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/block-storage.ts#L4)

***

### getAll()

> **getAll**(): `Promise`\<[`BlockHeader`](BlockHeader.md)[]\>

#### Returns

`Promise`\<[`BlockHeader`](BlockHeader.md)[]\>

#### Defined in

[storage/block-storage.ts:9](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/block-storage.ts#L9)

***

### getBackup()

> **getBackup**(): `Promise`\<`number`[][]\>

#### Returns

`Promise`\<`number`[][]\>

#### Defined in

[storage/block-storage.ts:10](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/block-storage.ts#L10)

***

### getByHash()

> **getByHash**(`hash`): `Promise`\<`undefined` \| [`BlockHeader`](BlockHeader.md)\>

#### Parameters

• **hash**: `string`

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](BlockHeader.md)\>

#### Defined in

[storage/block-storage.ts:7](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/block-storage.ts#L7)

***

### getByHeight()

> **getByHeight**(`height`): `Promise`\<`undefined` \| [`BlockHeader`](BlockHeader.md)\>

#### Parameters

• **height**: `number`

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](BlockHeader.md)\>

#### Defined in

[storage/block-storage.ts:8](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/block-storage.ts#L8)

***

### getSynced()

> **getSynced**(): `Promise`\<`undefined` \| [`BlockHeader`](BlockHeader.md)\>

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](BlockHeader.md)\>

#### Defined in

[storage/block-storage.ts:11](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/block-storage.ts#L11)

***

### put()

> **put**(`block`): `Promise`\<`void`\>

#### Parameters

• **block**: [`BlockHeader`](BlockHeader.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/block-storage.ts:5](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/block-storage.ts#L5)

***

### putMany()

> **putMany**(`blocks`): `Promise`\<`void`\>

#### Parameters

• **blocks**: [`BlockHeader`](BlockHeader.md)[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/block-storage.ts:6](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/block-storage.ts#L6)
