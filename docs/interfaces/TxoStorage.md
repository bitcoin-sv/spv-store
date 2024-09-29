[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / TxoStorage

# Interface: TxoStorage

## Methods

### delIngest()

> **delIngest**(`txid`): `Promise`\<`void`\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/txo-storage.ts:26](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L26)

***

### delIngests()

> **delIngests**(`txids`): `Promise`\<`void`\>

#### Parameters

• **txids**: `string`[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/txo-storage.ts:27](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L27)

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/txo-storage.ts:8](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L8)

***

### get()

> **get**(`outpoint`): `Promise`\<`undefined` \| [`Txo`](../classes/Txo.md)\>

#### Parameters

• **outpoint**: [`Outpoint`](../classes/Outpoint.md)

#### Returns

`Promise`\<`undefined` \| [`Txo`](../classes/Txo.md)\>

#### Defined in

[storage/txo-storage.ts:9](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L9)

***

### getBackupLogs()

> **getBackupLogs**(): `Promise`\<[`TxLog`](../classes/TxLog.md)[]\>

#### Returns

`Promise`\<[`TxLog`](../classes/TxLog.md)[]\>

#### Defined in

[storage/txo-storage.ts:32](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L32)

***

### getBySpend()

> **getBySpend**(`txid`): `Promise`\<[`Txo`](../classes/Txo.md)[]\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<[`Txo`](../classes/Txo.md)[]\>

#### Defined in

[storage/txo-storage.ts:11](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L11)

***

### getIngests()

> **getIngests**(`status`, `limit`, `start`?, `stop`?): `Promise`\<[`Ingest`](Ingest.md)[]\>

#### Parameters

• **status**: [`IngestStatus`](../enumerations/IngestStatus.md)

• **limit**: `number`

• **start?**: `number`

• **stop?**: `number`

#### Returns

`Promise`\<[`Ingest`](Ingest.md)[]\>

#### Defined in

[storage/txo-storage.ts:18](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L18)

***

### getMany()

> **getMany**(`outpoints`): `Promise`\<(`undefined` \| [`Txo`](../classes/Txo.md))[]\>

#### Parameters

• **outpoints**: [`Outpoint`](../classes/Outpoint.md)[]

#### Returns

`Promise`\<(`undefined` \| [`Txo`](../classes/Txo.md))[]\>

#### Defined in

[storage/txo-storage.ts:10](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L10)

***

### getQueueLength()

> **getQueueLength**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[storage/txo-storage.ts:17](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L17)

***

### getRecentTxLogs()

> **getRecentTxLogs**(`limit`?): `Promise`\<[`TxLog`](../classes/TxLog.md)[]\>

#### Parameters

• **limit?**: `number`

#### Returns

`Promise`\<[`TxLog`](../classes/TxLog.md)[]\>

#### Defined in

[storage/txo-storage.ts:30](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L30)

***

### getState()

> **getState**(`key`): `Promise`\<`undefined` \| `string`\>

#### Parameters

• **key**: `string`

#### Returns

`Promise`\<`undefined` \| `string`\>

#### Defined in

[storage/txo-storage.ts:15](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L15)

***

### getTxLog()

> **getTxLog**(`txid`): `Promise`\<`undefined` \| [`TxLog`](../classes/TxLog.md)\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| [`TxLog`](../classes/TxLog.md)\>

#### Defined in

[storage/txo-storage.ts:28](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L28)

***

### getTxLogs()

> **getTxLogs**(`txids`): `Promise`\<(`undefined` \| [`TxLog`](../classes/TxLog.md))[]\>

#### Parameters

• **txids**: `string`[]

#### Returns

`Promise`\<(`undefined` \| [`TxLog`](../classes/TxLog.md))[]\>

#### Defined in

[storage/txo-storage.ts:29](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L29)

***

### put()

> **put**(`txo`): `Promise`\<`void`\>

#### Parameters

• **txo**: [`Txo`](../classes/Txo.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/txo-storage.ts:12](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L12)

***

### putIngest()

> **putIngest**(`ingest`): `Promise`\<`void`\>

#### Parameters

• **ingest**: [`Ingest`](Ingest.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/txo-storage.ts:24](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L24)

***

### putIngests()

> **putIngests**(`ingests`): `Promise`\<`void`\>

#### Parameters

• **ingests**: [`Ingest`](Ingest.md)[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/txo-storage.ts:25](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L25)

***

### putMany()

> **putMany**(`txos`): `Promise`\<`void`\>

#### Parameters

• **txos**: [`Txo`](../classes/Txo.md)[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/txo-storage.ts:13](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L13)

***

### putTxLog()

> **putTxLog**(`txLog`): `Promise`\<`void`\>

#### Parameters

• **txLog**: [`TxLog`](../classes/TxLog.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/txo-storage.ts:31](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L31)

***

### search()

> **search**(`lookup`, `sort`?, `limit`?, `from`?): `Promise`\<[`TxoResults`](TxoResults.md)\>

#### Parameters

• **lookup**: [`TxoLookup`](../classes/TxoLookup.md)

• **sort?**: [`TxoSort`](../enumerations/TxoSort.md)

• **limit?**: `number`

• **from?**: `string`

#### Returns

`Promise`\<[`TxoResults`](TxoResults.md)\>

#### Defined in

[storage/txo-storage.ts:14](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L14)

***

### setState()

> **setState**(`key`, `value`): `Promise`\<`void`\>

#### Parameters

• **key**: `string`

• **value**: `string`

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/txo-storage.ts:16](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/storage/txo-storage.ts#L16)
