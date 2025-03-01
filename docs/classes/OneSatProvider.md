[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / OneSatProvider

# Class: OneSatProvider

## Implements

- [`AccountService`](../interfaces/AccountService.md)
- [`BlockHeaderService`](../interfaces/BlockHeaderService.md)
- [`BroadcastService`](../interfaces/BroadcastService.md)
- [`TxnService`](../interfaces/TxnService.md)

## Constructors

### new OneSatProvider()

> **new OneSatProvider**(`network`, `accountId`?): [`OneSatProvider`](OneSatProvider.md)

#### Parameters

• **network**: [`Network`](../type-aliases/Network.md)

• **accountId?**: `string`

#### Returns

[`OneSatProvider`](OneSatProvider.md)

#### Defined in

[providers/1sat-provider.ts:41](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L41)

## Properties

### accountId?

> `optional` **accountId**: `string`

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`accountId`](../interfaces/AccountService.md#accountid)

#### Defined in

[providers/1sat-provider.ts:43](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L43)

***

### eventSource

> **eventSource**: `undefined` \| `EventSource`

#### Defined in

[providers/1sat-provider.ts:39](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L39)

***

### network

> **network**: [`Network`](../type-aliases/Network.md)

#### Defined in

[providers/1sat-provider.ts:42](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L42)

## Methods

### broadcast()

> **broadcast**(`tx`): `Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Implementation of

[`BroadcastService`](../interfaces/BroadcastService.md).[`broadcast`](../interfaces/BroadcastService.md#broadcast)

#### Defined in

[providers/1sat-provider.ts:58](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L58)

***

### fetchBeef()

> **fetchBeef**(`txid`): `Promise`\<`Transaction`\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`Transaction`\>

#### Implementation of

[`TxnService`](../interfaces/TxnService.md).[`fetchBeef`](../interfaces/TxnService.md#fetchbeef)

#### Defined in

[providers/1sat-provider.ts:101](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L101)

***

### fetchProof()

> **fetchProof**(`txid`): `Promise`\<`undefined` \| `MerklePath`\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| `MerklePath`\>

#### Implementation of

[`TxnService`](../interfaces/TxnService.md).[`fetchProof`](../interfaces/TxnService.md#fetchproof)

#### Defined in

[providers/1sat-provider.ts:111](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L111)

***

### getBlocks()

> **getBlocks**(`lastHeight`, `limit`): `Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)[]\>

#### Parameters

• **lastHeight**: `number`

• **limit**: `number` = `1000`

#### Returns

`Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)[]\>

#### Implementation of

[`BlockHeaderService`](../interfaces/BlockHeaderService.md).[`getBlocks`](../interfaces/BlockHeaderService.md#getblocks)

#### Defined in

[providers/1sat-provider.ts:119](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L119)

***

### getBsv2021Txo()

> **getBsv2021Txo**(`outpoint`): `Promise`\<`undefined` \| `RemoteBsv20`\>

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

#### Returns

`Promise`\<`undefined` \| `RemoteBsv20`\>

#### Defined in

[providers/1sat-provider.ts:172](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L172)

***

### getBsv20Details()

> **getBsv20Details**(`tick`): `Promise`\<`undefined` \| `RemoteBsv20`\>

#### Parameters

• **tick**: `string`

#### Returns

`Promise`\<`undefined` \| `RemoteBsv20`\>

#### Defined in

[providers/1sat-provider.ts:167](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L167)

***

### getChaintip()

> **getChaintip**(): `Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Returns

`Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Implementation of

[`BlockHeaderService`](../interfaces/BlockHeaderService.md).[`getChaintip`](../interfaces/BlockHeaderService.md#getchaintip)

#### Defined in

[providers/1sat-provider.ts:129](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L129)

***

### getInscriptionFile()

> **getInscriptionFile**(`outpoint`): `Promise`\<`undefined` \| [`File`](../interfaces/File.md)\>

#### Parameters

• **outpoint**: `string`

#### Returns

`Promise`\<`undefined` \| [`File`](../interfaces/File.md)\>

#### Defined in

[providers/1sat-provider.ts:192](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L192)

***

### getOriginAncestors()

> **getOriginAncestors**(`outpoints`): `Promise`\<`Ordinal`[]\>

#### Parameters

• **outpoints**: `string`[]

#### Returns

`Promise`\<`Ordinal`[]\>

#### Defined in

[providers/1sat-provider.ts:179](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L179)

***

### getTxo()

> **getTxo**(`outpoint`): `Promise`\<`undefined` \| `Ordinal`\>

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

#### Returns

`Promise`\<`undefined` \| `Ordinal`\>

#### Defined in

[providers/1sat-provider.ts:149](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L149)

***

### getTxos()

> **getTxos**(`outpoints`): `Promise`\<`Ordinal`[]\>

#### Parameters

• **outpoints**: [`Outpoint`](Outpoint.md)[]

#### Returns

`Promise`\<`Ordinal`[]\>

#### Defined in

[providers/1sat-provider.ts:156](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L156)

***

### register()

> **register**(`addresses`): `Promise`\<`void`\>

#### Parameters

• **addresses**: `string`[]

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`register`](../interfaces/AccountService.md#register)

#### Defined in

[providers/1sat-provider.ts:47](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L47)

***

### search()

> **search**(`q`): `Promise`\<`Ordinal`[]\>

#### Parameters

• **q**: [`Query`](../interfaces/Query.md)

#### Returns

`Promise`\<`Ordinal`[]\>

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`search`](../interfaces/AccountService.md#search)

#### Defined in

[providers/1sat-provider.ts:255](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L255)

***

### spends()

> **spends**(`outpoints`): `Promise`\<`string`[]\>

#### Parameters

• **outpoints**: `string`[]

#### Returns

`Promise`\<`string`[]\>

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`spends`](../interfaces/AccountService.md#spends)

#### Defined in

[providers/1sat-provider.ts:244](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L244)

***

### status()

> **status**(`txid`): `Promise`\<`undefined` \| [`BroadcastStatusResponse`](../interfaces/BroadcastStatusResponse.md)\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| [`BroadcastStatusResponse`](../interfaces/BroadcastStatusResponse.md)\>

#### Implementation of

[`BroadcastService`](../interfaces/BroadcastService.md).[`status`](../interfaces/BroadcastService.md#status)

#### Defined in

[providers/1sat-provider.ts:86](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L86)

***

### subscribe()

> **subscribe**(`cb`): `void`

#### Parameters

• **cb**

#### Returns

`void`

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`subscribe`](../interfaces/AccountService.md#subscribe)

#### Defined in

[providers/1sat-provider.ts:205](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L205)

***

### subscribed()

> **subscribed**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`subscribed`](../interfaces/AccountService.md#subscribed)

#### Defined in

[providers/1sat-provider.ts:201](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L201)

***

### syncTxLogs()

> **syncTxLogs**(`from`, `limit`, `reverse`): `Promise`\<[`TxSyncLog`](../interfaces/TxSyncLog.md)[]\>

#### Parameters

• **from**: `number` = `0`

• **limit**: `number` = `0`

• **reverse**: `boolean` = `false`

#### Returns

`Promise`\<[`TxSyncLog`](../interfaces/TxSyncLog.md)[]\>

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`syncTxLogs`](../interfaces/AccountService.md#synctxlogs)

#### Defined in

[providers/1sat-provider.ts:230](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L230)

***

### txosByAddress()

> **txosByAddress**(`address`, `unspent`): `Promise`\<`Ordinal`[]\>

#### Parameters

• **address**: `string`

• **unspent**: `boolean` = `true`

#### Returns

`Promise`\<`Ordinal`[]\>

#### Defined in

[providers/1sat-provider.ts:142](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L142)

***

### unsubscribe()

> **unsubscribe**(): `void`

#### Returns

`void`

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`unsubscribe`](../interfaces/AccountService.md#unsubscribe)

#### Defined in

[providers/1sat-provider.ts:223](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L223)

***

### utxos()

> **utxos**(`refresh`): `Promise`\<`Ordinal`[]\>

#### Parameters

• **refresh**: `boolean` = `false`

#### Returns

`Promise`\<`Ordinal`[]\>

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`utxos`](../interfaces/AccountService.md#utxos)

#### Defined in

[providers/1sat-provider.ts:135](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/providers/1sat-provider.ts#L135)
