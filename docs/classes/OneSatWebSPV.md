[**spv-store v0.1.24**](../README.md) • **Docs**

***

[spv-store v0.1.24](../globals.md) / OneSatWebSPV

# Class: OneSatWebSPV

## Extends

- [`SPVStore`](SPVStore.md)

## Properties

### events

> **events**: `EventEmitter`

#### Inherited from

[`SPVStore`](SPVStore.md).[`events`](SPVStore.md#events)

#### Defined in

[pre-config/1sat-web.ts:17](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/pre-config/1sat-web.ts#L17)

***

### services

> **services**: [`Services`](../interfaces/Services.md)

#### Inherited from

[`SPVStore`](SPVStore.md).[`services`](SPVStore.md#services)

#### Defined in

[pre-config/1sat-web.ts:15](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/pre-config/1sat-web.ts#L15)

***

### stores

> **stores**: [`Stores`](../interfaces/Stores.md)

#### Inherited from

[`SPVStore`](SPVStore.md).[`stores`](SPVStore.md#stores)

#### Defined in

[pre-config/1sat-web.ts:16](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/pre-config/1sat-web.ts#L16)

***

### subscribe

> **subscribe**: `boolean` = `false`

#### Inherited from

[`SPVStore`](SPVStore.md).[`subscribe`](SPVStore.md#subscribe)

#### Defined in

[spv-store.ts:52](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L52)

## Methods

### broadcast()

> **broadcast**(`tx`, `source`, `isBeefy`): `Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Parameters

• **tx**: `Transaction`

• **source**: `string` = `""`

• **isBeefy**: `boolean` = `false`

#### Returns

`Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`broadcast`](SPVStore.md#broadcast)

#### Defined in

[spv-store.ts:72](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L72)

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`destroy`](SPVStore.md#destroy)

#### Defined in

[spv-store.ts:57](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L57)

***

### getBackupLogs()

> **getBackupLogs**(): `Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

#### Returns

`Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getBackupLogs`](SPVStore.md#getbackuplogs)

#### Defined in

[spv-store.ts:235](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L235)

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

[spv-store.ts:189](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L189)

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

[spv-store.ts:181](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L181)

***

### getBlocksBackup()

> **getBlocksBackup**(): `Promise`\<`number`[][]\>

#### Returns

`Promise`\<`number`[][]\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getBlocksBackup`](SPVStore.md#getblocksbackup)

#### Defined in

[spv-store.ts:205](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L205)

***

### getChaintip()

> **getChaintip**(): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getChaintip`](SPVStore.md#getchaintip)

#### Defined in

[spv-store.ts:185](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L185)

***

### getRecentTxs()

> **getRecentTxs**(`limit`): `Promise`\<[`TxLog`](TxLog.md)[]\>

#### Parameters

• **limit**: `number` = `100`

#### Returns

`Promise`\<[`TxLog`](TxLog.md)[]\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getRecentTxs`](SPVStore.md#getrecenttxs)

#### Defined in

[spv-store.ts:169](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L169)

***

### getSyncedBlock()

> **getSyncedBlock**(): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getSyncedBlock`](SPVStore.md#getsyncedblock)

#### Defined in

[spv-store.ts:177](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L177)

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

[spv-store.ts:162](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L162)

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

[spv-store.ts:154](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L154)

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

[spv-store.ts:158](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L158)

***

### parseTx()

> **parseTx**(`tx`): `Promise`\<[`IndexContext`](../interfaces/IndexContext.md)\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<[`IndexContext`](../interfaces/IndexContext.md)\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`parseTx`](SPVStore.md#parsetx)

#### Defined in

[spv-store.ts:173](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L173)

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

[spv-store.ts:239](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L239)

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

[spv-store.ts:218](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L218)

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

[spv-store.ts:209](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L209)

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

[spv-store.ts:145](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L145)

***

### sync()

> **sync**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`sync`](SPVStore.md#sync)

#### Defined in

[spv-store.ts:94](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/spv-store.ts#L94)

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

[pre-config/1sat-web.ts:23](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/pre-config/1sat-web.ts#L23)
