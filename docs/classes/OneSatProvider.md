[**spv-store v0.1.44**](../README.md) • **Docs**

***

[spv-store v0.1.44](../globals.md) / OneSatProvider

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

[providers/1sat-provider.ts:35](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L35)

## Properties

### accountId?

> `optional` **accountId**: `string`

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`accountId`](../interfaces/AccountService.md#accountid)

#### Defined in

[providers/1sat-provider.ts:37](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L37)

***

### eventSource

> **eventSource**: `undefined` \| `EventSource`

#### Defined in

[providers/1sat-provider.ts:33](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L33)

***

### network

> **network**: [`Network`](../type-aliases/Network.md)

#### Defined in

[providers/1sat-provider.ts:36](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L36)

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

[providers/1sat-provider.ts:52](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L52)

***

### fetchProof()

> **fetchProof**(`txid`): `Promise`\<`undefined` \| `number`[]\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| `number`[]\>

#### Implementation of

[`TxnService`](../interfaces/TxnService.md).[`fetchProof`](../interfaces/TxnService.md#fetchproof)

#### Defined in

[providers/1sat-provider.ts:111](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L111)

***

### fetchTxn()

> **fetchTxn**(`txid`): `Promise`\<[`Txn`](../interfaces/Txn.md)\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<[`Txn`](../interfaces/Txn.md)\>

#### Implementation of

[`TxnService`](../interfaces/TxnService.md).[`fetchTxn`](../interfaces/TxnService.md#fetchtxn)

#### Defined in

[providers/1sat-provider.ts:95](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L95)

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

[providers/1sat-provider.ts:119](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L119)

***

### getBsv2021Txo()

> **getBsv2021Txo**(`outpoint`): `Promise`\<`undefined` \| `RemoteBsv20`\>

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

#### Returns

`Promise`\<`undefined` \| `RemoteBsv20`\>

#### Defined in

[providers/1sat-provider.ts:162](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L162)

***

### getBsv20Details()

> **getBsv20Details**(`tick`): `Promise`\<`undefined` \| `RemoteBsv20`\>

#### Parameters

• **tick**: `string`

#### Returns

`Promise`\<`undefined` \| `RemoteBsv20`\>

#### Defined in

[providers/1sat-provider.ts:157](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L157)

***

### getChaintip()

> **getChaintip**(): `Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Returns

`Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Implementation of

[`BlockHeaderService`](../interfaces/BlockHeaderService.md).[`getChaintip`](../interfaces/BlockHeaderService.md#getchaintip)

#### Defined in

[providers/1sat-provider.ts:126](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L126)

***

### getInscriptionFile()

> **getInscriptionFile**(`outpoint`): `Promise`\<`undefined` \| [`File`](../interfaces/File.md)\>

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

#### Returns

`Promise`\<`undefined` \| [`File`](../interfaces/File.md)\>

#### Defined in

[providers/1sat-provider.ts:190](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L190)

***

### getOriginAncestors()

> **getOriginAncestors**(`outpoints`): `Promise`\<`Ordinal`[]\>

#### Parameters

• **outpoints**: `string`[]

#### Returns

`Promise`\<`Ordinal`[]\>

#### Defined in

[providers/1sat-provider.ts:169](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L169)

***

### getTxo()

> **getTxo**(`outpoint`): `Promise`\<`undefined` \| `Ordinal`\>

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

#### Returns

`Promise`\<`undefined` \| `Ordinal`\>

#### Defined in

[providers/1sat-provider.ts:139](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L139)

***

### getTxos()

> **getTxos**(`outpoints`): `Promise`\<`Ordinal`[]\>

#### Parameters

• **outpoints**: [`Outpoint`](Outpoint.md)[]

#### Returns

`Promise`\<`Ordinal`[]\>

#### Defined in

[providers/1sat-provider.ts:146](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L146)

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

[providers/1sat-provider.ts:41](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L41)

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

[providers/1sat-provider.ts:80](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L80)

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

[providers/1sat-provider.ts:206](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L206)

***

### subscribed()

> **subscribed**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`subscribed`](../interfaces/AccountService.md#subscribed)

#### Defined in

[providers/1sat-provider.ts:202](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L202)

***

### syncTxLogs()

> **syncTxLogs**(`from`): `Promise`\<[`TxSyncLog`](../interfaces/TxSyncLog.md)[]\>

#### Parameters

• **from**: `number` = `0`

#### Returns

`Promise`\<[`TxSyncLog`](../interfaces/TxSyncLog.md)[]\>

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`syncTxLogs`](../interfaces/AccountService.md#synctxlogs)

#### Defined in

[providers/1sat-provider.ts:231](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L231)

***

### unsubscribe()

> **unsubscribe**(): `void`

#### Returns

`void`

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`unsubscribe`](../interfaces/AccountService.md#unsubscribe)

#### Defined in

[providers/1sat-provider.ts:224](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L224)

***

### utxos()

> **utxos**(): `Promise`\<`Ordinal`[]\>

#### Returns

`Promise`\<`Ordinal`[]\>

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`utxos`](../interfaces/AccountService.md#utxos)

#### Defined in

[providers/1sat-provider.ts:132](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/1sat-provider.ts#L132)
