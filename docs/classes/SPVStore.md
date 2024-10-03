[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / SPVStore

# Class: SPVStore

## Extended by

- [`OneSatWebSPV`](OneSatWebSPV.md)

## Constructors

### new SPVStore()

> **new SPVStore**(`services`, `stores`, `events`, `startSync`): [`SPVStore`](SPVStore.md)

#### Parameters

• **services**: [`Services`](../interfaces/Services.md)

• **stores**: [`Stores`](../interfaces/Stores.md)

• **events**: `EventEmitter` = `...`

• **startSync**: `boolean` = `false`

#### Returns

[`SPVStore`](SPVStore.md)

#### Defined in

[spv-store.ts:46](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L46)

## Properties

### events

> **events**: `EventEmitter`

#### Defined in

[spv-store.ts:49](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L49)

***

### services

> **services**: [`Services`](../interfaces/Services.md)

#### Defined in

[spv-store.ts:47](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L47)

***

### stores

> **stores**: [`Stores`](../interfaces/Stores.md)

#### Defined in

[spv-store.ts:48](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L48)

## Methods

### broadcast()

> **broadcast**(`tx`, `source`): `Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Parameters

• **tx**: `Transaction`

• **source**: `string` = `""`

#### Returns

`Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Defined in

[spv-store.ts:70](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L70)

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[spv-store.ts:55](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L55)

***

### getBackupLogs()

> **getBackupLogs**(): `Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

#### Returns

`Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

#### Defined in

[spv-store.ts:216](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L216)

***

### getBackupTx()

> **getBackupTx**(`txid`): `Promise`\<`undefined` \| `number`[]\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| `number`[]\>

#### Defined in

[spv-store.ts:170](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L170)

***

### getBlock()

> **getBlock**(`height`): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Parameters

• **height**: `number`

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Defined in

[spv-store.ts:162](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L162)

***

### getBlocksBackup()

> **getBlocksBackup**(): `Promise`\<`number`[][]\>

#### Returns

`Promise`\<`number`[][]\>

#### Defined in

[spv-store.ts:186](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L186)

***

### getChaintip()

> **getChaintip**(): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Defined in

[spv-store.ts:166](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L166)

***

### getRecentTxs()

> **getRecentTxs**(): `Promise`\<[`TxLog`](TxLog.md)[]\>

#### Returns

`Promise`\<[`TxLog`](TxLog.md)[]\>

#### Defined in

[spv-store.ts:150](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L150)

***

### getSyncedBlock()

> **getSyncedBlock**(): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Defined in

[spv-store.ts:158](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L158)

***

### getTx()

> **getTx**(`txid`, `fromRemote`): `Promise`\<`undefined` \| `Transaction`\>

#### Parameters

• **txid**: `string`

• **fromRemote**: `boolean` = `false`

#### Returns

`Promise`\<`undefined` \| `Transaction`\>

#### Defined in

[spv-store.ts:143](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L143)

***

### getTxo()

> **getTxo**(`outpoint`): `Promise`\<`undefined` \| [`Txo`](Txo.md)\>

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

#### Returns

`Promise`\<`undefined` \| [`Txo`](Txo.md)\>

#### Defined in

[spv-store.ts:135](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L135)

***

### getTxos()

> **getTxos**(`outpoints`): `Promise`\<(`undefined` \| [`Txo`](Txo.md))[]\>

#### Parameters

• **outpoints**: [`Outpoint`](Outpoint.md)[]

#### Returns

`Promise`\<(`undefined` \| [`Txo`](Txo.md))[]\>

#### Defined in

[spv-store.ts:139](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L139)

***

### parseTx()

> **parseTx**(`tx`): `Promise`\<[`IndexContext`](../interfaces/IndexContext.md)\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<[`IndexContext`](../interfaces/IndexContext.md)\>

#### Defined in

[spv-store.ts:154](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L154)

***

### restoreBackupLogs()

> **restoreBackupLogs**(`logs`): `Promise`\<`void`\>

#### Parameters

• **logs**: [`Ingest`](../interfaces/Ingest.md)[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[spv-store.ts:220](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L220)

***

### restoreBackupTx()

> **restoreBackupTx**(`txid`, `data`): `Promise`\<`void`\>

#### Parameters

• **txid**: `string`

• **data**: `number`[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[spv-store.ts:199](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L199)

***

### restoreBlocks()

> **restoreBlocks**(`data`): `Promise`\<`void`\>

#### Parameters

• **data**: `number`[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[spv-store.ts:190](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L190)

***

### search()

> **search**(`lookup`, `sort`, `limit`, `from`?): `Promise`\<[`TxoResults`](../interfaces/TxoResults.md)\>

#### Parameters

• **lookup**: [`TxoLookup`](TxoLookup.md)

• **sort**: [`TxoSort`](../enumerations/TxoSort.md) = `TxoSort.DESC`

• **limit**: `number` = `100`

• **from?**: `string`

#### Returns

`Promise`\<[`TxoResults`](../interfaces/TxoResults.md)\>

#### Defined in

[spv-store.ts:126](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L126)

***

### sync()

> **sync**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[spv-store.ts:91](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/spv-store.ts#L91)
