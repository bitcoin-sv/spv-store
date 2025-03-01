[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / SPVStore

# Class: SPVStore

## Extended by

- [`OneSatWebSPV`](OneSatWebSPV.md)

## Constructors

### new SPVStore()

> **new SPVStore**(`services`, `stores`, `events`, `startSync`, `syncTags`?, `parseMode`?, `subscribe`?): [`SPVStore`](SPVStore.md)

#### Parameters

• **services**: [`Services`](../interfaces/Services.md)

• **stores**: [`Stores`](../interfaces/Stores.md)

• **events**: `EventEmitter` = `...`

• **startSync**: `boolean` = `false`

• **syncTags?**: `Set`\<`string`\>

• **parseMode?**: [`ParseMode`](../enumerations/ParseMode.md)

• **subscribe?**: `boolean` = `false`

#### Returns

[`SPVStore`](SPVStore.md)

#### Defined in

[spv-store.ts:47](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L47)

## Properties

### events

> **events**: `EventEmitter`

#### Defined in

[spv-store.ts:50](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L50)

***

### parseMode?

> `optional` **parseMode**: [`ParseMode`](../enumerations/ParseMode.md)

#### Defined in

[spv-store.ts:53](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L53)

***

### services

> **services**: [`Services`](../interfaces/Services.md)

#### Defined in

[spv-store.ts:48](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L48)

***

### stores

> **stores**: [`Stores`](../interfaces/Stores.md)

#### Defined in

[spv-store.ts:49](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L49)

***

### subscribe

> **subscribe**: `boolean` = `false`

#### Defined in

[spv-store.ts:54](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L54)

***

### syncTags?

> `optional` **syncTags**: `Set`\<`string`\>

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

#### Defined in

[spv-store.ts:74](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L74)

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[spv-store.ts:59](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L59)

***

### getBackupLogs()

> **getBackupLogs**(): `Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

#### Returns

`Promise`\<[`Ingest`](../interfaces/Ingest.md)[]\>

#### Defined in

[spv-store.ts:270](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L270)

***

### getBackupTx()

> **getBackupTx**(`txid`): `Promise`\<`undefined` \| `number`[]\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| `number`[]\>

#### Defined in

[spv-store.ts:224](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L224)

***

### getBlock()

> **getBlock**(`height`): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Parameters

• **height**: `number`

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Defined in

[spv-store.ts:216](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L216)

***

### getBlocksBackup()

> **getBlocksBackup**(): `Promise`\<`number`[][]\>

#### Returns

`Promise`\<`number`[][]\>

#### Defined in

[spv-store.ts:240](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L240)

***

### getChaintip()

> **getChaintip**(): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Defined in

[spv-store.ts:220](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L220)

***

### getRecentTxs()

> **getRecentTxs**(`limit`): `Promise`\<[`TxLog`](TxLog.md)[]\>

#### Parameters

• **limit**: `number` = `100`

#### Returns

`Promise`\<[`TxLog`](TxLog.md)[]\>

#### Defined in

[spv-store.ts:203](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L203)

***

### getSyncedBlock()

> **getSyncedBlock**(): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Defined in

[spv-store.ts:212](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L212)

***

### getTx()

> **getTx**(`txid`): `Promise`\<`undefined` \| `Transaction`\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| `Transaction`\>

#### Defined in

[spv-store.ts:197](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L197)

***

### getTxo()

> **getTxo**(`outpoint`): `Promise`\<`undefined` \| [`Txo`](Txo.md)\>

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

#### Returns

`Promise`\<`undefined` \| [`Txo`](Txo.md)\>

#### Defined in

[spv-store.ts:189](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L189)

***

### getTxos()

> **getTxos**(`outpoints`): `Promise`\<(`undefined` \| [`Txo`](Txo.md))[]\>

#### Parameters

• **outpoints**: [`Outpoint`](Outpoint.md)[]

#### Returns

`Promise`\<(`undefined` \| [`Txo`](Txo.md))[]\>

#### Defined in

[spv-store.ts:193](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L193)

***

### parseTx()

> **parseTx**(`tx`): `Promise`\<[`IndexContext`](../interfaces/IndexContext.md)\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<[`IndexContext`](../interfaces/IndexContext.md)\>

#### Defined in

[spv-store.ts:207](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L207)

***

### refreshSpends()

> **refreshSpends**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[spv-store.ts:115](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L115)

***

### restoreBackupLogs()

> **restoreBackupLogs**(`logs`): `Promise`\<`void`\>

#### Parameters

• **logs**: [`Ingest`](../interfaces/Ingest.md)[]

#### Returns

`Promise`\<`void`\>

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

#### Defined in

[spv-store.ts:253](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L253)

***

### restoreBlocks()

> **restoreBlocks**(`data`): `Promise`\<`void`\>

#### Parameters

• **data**: `number`[]

#### Returns

`Promise`\<`void`\>

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

#### Defined in

[spv-store.ts:119](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/spv-store.ts#L119)
