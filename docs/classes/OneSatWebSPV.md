[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / OneSatWebSPV

# Class: OneSatWebSPV

## Extends

- [`SPVStore`](SPVStore.md)

## Properties

### events

> **events**: `EventEmitter`

#### Inherited from

[`SPVStore`](SPVStore.md).[`events`](SPVStore.md#events)

#### Defined in

[pre-config/1sat-web.ts:17](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/pre-config/1sat-web.ts#L17)

***

### services

> **services**: [`Services`](../interfaces/Services.md)

#### Inherited from

[`SPVStore`](SPVStore.md).[`services`](SPVStore.md#services)

#### Defined in

[pre-config/1sat-web.ts:15](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/pre-config/1sat-web.ts#L15)

***

### stores

> **stores**: [`Stores`](../interfaces/Stores.md)

#### Inherited from

[`SPVStore`](SPVStore.md).[`stores`](SPVStore.md#stores)

#### Defined in

[pre-config/1sat-web.ts:16](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/pre-config/1sat-web.ts#L16)

## Methods

### broadcast()

> **broadcast**(`tx`, `source`, `ingestParets`): `Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Parameters

• **tx**: `Transaction`

• **source**: `string` = `""`

• **ingestParets**: `boolean` = `false`

#### Returns

`Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`broadcast`](SPVStore.md#broadcast)

#### Defined in

[spv-store.ts:69](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L69)

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`destroy`](SPVStore.md#destroy)

#### Defined in

[spv-store.ts:54](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L54)

***

### getBackupLogs()

> **getBackupLogs**(): `Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

#### Returns

`Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getBackupLogs`](SPVStore.md#getbackuplogs)

#### Defined in

[spv-store.ts:220](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L220)

***

### getBackupTx()

> **getBackupTx**(`txid`): `Promise`\<`undefined` \| `number`[]\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| `number`[]\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getBackupTx`](SPVStore.md#getbackuptx)

#### Defined in

[spv-store.ts:174](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L174)

***

### getBlock()

> **getBlock**(`height`): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Parameters

• **height**: `number`

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getBlock`](SPVStore.md#getblock)

#### Defined in

[spv-store.ts:166](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L166)

***

### getBlocksBackup()

> **getBlocksBackup**(): `Promise`\<`number`[][]\>

#### Returns

`Promise`\<`number`[][]\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getBlocksBackup`](SPVStore.md#getblocksbackup)

#### Defined in

[spv-store.ts:190](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L190)

***

### getChaintip()

> **getChaintip**(): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getChaintip`](SPVStore.md#getchaintip)

#### Defined in

[spv-store.ts:170](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L170)

***

### getRecentTxs()

> **getRecentTxs**(): `Promise`\<[`TxLog`](TxLog.md)[]\>

#### Returns

`Promise`\<[`TxLog`](TxLog.md)[]\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getRecentTxs`](SPVStore.md#getrecenttxs)

#### Defined in

[spv-store.ts:154](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L154)

***

### getSyncedBlock()

> **getSyncedBlock**(): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getSyncedBlock`](SPVStore.md#getsyncedblock)

#### Defined in

[spv-store.ts:162](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L162)

***

### getTx()

> **getTx**(`txid`, `fromRemote`): `Promise`\<`undefined` \| `Transaction`\>

#### Parameters

• **txid**: `string`

• **fromRemote**: `boolean` = `false`

#### Returns

`Promise`\<`undefined` \| `Transaction`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getTx`](SPVStore.md#gettx)

#### Defined in

[spv-store.ts:147](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L147)

***

### getTxo()

> **getTxo**(`outpoint`): `Promise`\<`undefined` \| [`Txo`](Txo.md)\>

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

#### Returns

`Promise`\<`undefined` \| [`Txo`](Txo.md)\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getTxo`](SPVStore.md#gettxo)

#### Defined in

[spv-store.ts:135](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L135)

***

### getTxos()

> **getTxos**(`outpoints`): `Promise`\<(`undefined` \| [`Txo`](Txo.md))[]\>

#### Parameters

• **outpoints**: [`Outpoint`](Outpoint.md)[]

#### Returns

`Promise`\<(`undefined` \| [`Txo`](Txo.md))[]\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getTxos`](SPVStore.md#gettxos)

#### Defined in

[spv-store.ts:139](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L139)

***

### parseTx()

> **parseTx**(`tx`): `Promise`\<[`IndexContext`](IndexContext.md)\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<[`IndexContext`](IndexContext.md)\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`parseTx`](SPVStore.md#parsetx)

#### Defined in

[spv-store.ts:158](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L158)

***

### restoreBackupLogs()

> **restoreBackupLogs**(`logs`): `Promise`\<`void`\>

#### Parameters

• **logs**: [`Ingest`](../interfaces/Ingest.md)[]

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`restoreBackupLogs`](SPVStore.md#restorebackuplogs)

#### Defined in

[spv-store.ts:224](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L224)

***

### restoreBackupTx()

> **restoreBackupTx**(`txid`, `data`): `Promise`\<`void`\>

#### Parameters

• **txid**: `string`

• **data**: `number`[]

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`restoreBackupTx`](SPVStore.md#restorebackuptx)

#### Defined in

[spv-store.ts:203](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L203)

***

### restoreBlocks()

> **restoreBlocks**(`data`): `Promise`\<`void`\>

#### Parameters

• **data**: `number`[]

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`restoreBlocks`](SPVStore.md#restoreblocks)

#### Defined in

[spv-store.ts:194](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L194)

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

#### Inherited from

[`SPVStore`](SPVStore.md).[`search`](SPVStore.md#search)

#### Defined in

[spv-store.ts:126](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L126)

***

### sync()

> **sync**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`sync`](SPVStore.md#sync)

#### Defined in

[spv-store.ts:91](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/spv-store.ts#L91)

***

### init()

> `static` **init**(`accountId`, `indexers`, `owners`, `startSync`, `network`): `Promise`\<[`SPVStore`](SPVStore.md)\>

#### Parameters

• **accountId**: `string`

• **indexers**: [`Indexer`](Indexer.md)[]

• **owners**: `Set`\<`string`\> = `...`

• **startSync**: `boolean` = `false`

• **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

#### Returns

`Promise`\<[`SPVStore`](SPVStore.md)\>

#### Defined in

[pre-config/1sat-web.ts:23](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/pre-config/1sat-web.ts#L23)
