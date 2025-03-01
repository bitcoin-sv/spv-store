[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / OneSatWebSPV

# Class: OneSatWebSPV

## Extends

- [`SPVStore`](SPVStore.md)

## Properties

### events

> **events**: `EventEmitter`

#### Inherited from

[`SPVStore`](SPVStore.md).[`events`](SPVStore.md#events)

#### Defined in

[pre-config/1sat-web.ts:17](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/pre-config/1sat-web.ts#L17)

***

### parseMode?

> `optional` **parseMode**: [`ParseMode`](../enumerations/ParseMode.md)

#### Inherited from

[`SPVStore`](SPVStore.md).[`parseMode`](SPVStore.md#parsemode)

#### Defined in

[spv-store.ts:53](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L53)

***

### services

> **services**: [`Services`](../interfaces/Services.md)

#### Inherited from

[`SPVStore`](SPVStore.md).[`services`](SPVStore.md#services)

#### Defined in

[pre-config/1sat-web.ts:15](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/pre-config/1sat-web.ts#L15)

***

### stores

> **stores**: [`Stores`](../interfaces/Stores.md)

#### Inherited from

[`SPVStore`](SPVStore.md).[`stores`](SPVStore.md#stores)

#### Defined in

[pre-config/1sat-web.ts:16](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/pre-config/1sat-web.ts#L16)

***

### subscribe

> **subscribe**: `boolean` = `false`

#### Inherited from

[`SPVStore`](SPVStore.md).[`subscribe`](SPVStore.md#subscribe)

#### Defined in

[spv-store.ts:54](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L54)

***

### syncTags?

> `optional` **syncTags**: `Set`\<`string`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`syncTags`](SPVStore.md#synctags)

#### Defined in

[spv-store.ts:52](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L52)

## Methods

### broadcast()

> **broadcast**(`tx`, `source`): `Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Parameters

• **tx**: `Transaction`

• **source**: `string` = `""`

#### Returns

`Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`broadcast`](SPVStore.md#broadcast)

#### Defined in

[spv-store.ts:74](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L74)

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`destroy`](SPVStore.md#destroy)

#### Defined in

[spv-store.ts:59](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L59)

***

### getBackupLogs()

> **getBackupLogs**(): `Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

#### Returns

`Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getBackupLogs`](SPVStore.md#getbackuplogs)

#### Defined in

[spv-store.ts:270](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L270)

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

[spv-store.ts:224](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L224)

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

[spv-store.ts:216](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L216)

***

### getBlocksBackup()

> **getBlocksBackup**(): `Promise`\<`number`[][]\>

#### Returns

`Promise`\<`number`[][]\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getBlocksBackup`](SPVStore.md#getblocksbackup)

#### Defined in

[spv-store.ts:240](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L240)

***

### getChaintip()

> **getChaintip**(): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getChaintip`](SPVStore.md#getchaintip)

#### Defined in

[spv-store.ts:220](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L220)

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

[spv-store.ts:203](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L203)

***

### getSyncedBlock()

> **getSyncedBlock**(): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getSyncedBlock`](SPVStore.md#getsyncedblock)

#### Defined in

[spv-store.ts:212](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L212)

***

### getTx()

> **getTx**(`txid`): `Promise`\<`undefined` \| `Transaction`\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| `Transaction`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`getTx`](SPVStore.md#gettx)

#### Defined in

[spv-store.ts:197](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L197)

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

[spv-store.ts:189](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L189)

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

[spv-store.ts:193](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L193)

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

[spv-store.ts:207](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L207)

***

### refreshSpends()

> **refreshSpends**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`refreshSpends`](SPVStore.md#refreshspends)

#### Defined in

[spv-store.ts:115](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L115)

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

[spv-store.ts:274](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L274)

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

[spv-store.ts:253](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L253)

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

[spv-store.ts:244](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L244)

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

[spv-store.ts:180](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L180)

***

### sync()

> **sync**(`resync`, `parseMode`): `Promise`\<`void`\>

#### Parameters

• **resync**: `boolean` = `false`

• **parseMode**: `undefined` \| [`ParseMode`](../enumerations/ParseMode.md) = `...`

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`SPVStore`](SPVStore.md).[`sync`](SPVStore.md#sync)

#### Defined in

[spv-store.ts:119](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L119)

***

### init()

> `static` **init**(`accountId`, `indexers`, `owners`, `network`, `startSync`, `syncTags`?, `parseMode`?): `Promise`\<[`SPVStore`](SPVStore.md)\>

#### Parameters

• **accountId**: `string`

• **indexers**: [`Indexer`](Indexer.md)[]

• **owners**: `Set`\<`string`\> = `...`

• **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

• **startSync**: `boolean` = `false`

• **syncTags?**: `Set`\<`string`\>

• **parseMode?**: [`ParseMode`](../enumerations/ParseMode.md)

#### Returns

`Promise`\<[`SPVStore`](SPVStore.md)\>

#### Defined in

[pre-config/1sat-web.ts:24](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/pre-config/1sat-web.ts#L24)
