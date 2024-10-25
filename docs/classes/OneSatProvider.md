[**spv-store v0.1.24**](../README.md) • **Docs**

***

[spv-store v0.1.24](../globals.md) / OneSatProvider

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

[providers/1sat-provider.ts:33](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L33)

## Properties

### accountId?

> `optional` **accountId**: `string`

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`accountId`](../interfaces/AccountService.md#accountid)

#### Defined in

[providers/1sat-provider.ts:35](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L35)

***

### eventSource

> **eventSource**: `undefined` \| `EventSource`

#### Defined in

[providers/1sat-provider.ts:31](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L31)

***

### network

> **network**: [`Network`](../type-aliases/Network.md)

#### Defined in

[providers/1sat-provider.ts:34](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L34)

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

[providers/1sat-provider.ts:50](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L50)

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

[providers/1sat-provider.ts:109](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L109)

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

[providers/1sat-provider.ts:93](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L93)

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

[providers/1sat-provider.ts:117](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L117)

***

### getBsv2021Txo()

> **getBsv2021Txo**(`outpoint`): `Promise`\<`undefined` \| `RemoteBsv20`\>

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

#### Returns

`Promise`\<`undefined` \| `RemoteBsv20`\>

#### Defined in

[providers/1sat-provider.ts:160](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L160)

***

### getBsv20Details()

> **getBsv20Details**(`tick`): `Promise`\<`undefined` \| `RemoteBsv20`\>

#### Parameters

• **tick**: `string`

#### Returns

`Promise`\<`undefined` \| `RemoteBsv20`\>

#### Defined in

[providers/1sat-provider.ts:155](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L155)

***

### getChaintip()

> **getChaintip**(): `Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Returns

`Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Implementation of

[`BlockHeaderService`](../interfaces/BlockHeaderService.md).[`getChaintip`](../interfaces/BlockHeaderService.md#getchaintip)

#### Defined in

[providers/1sat-provider.ts:124](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L124)

***

### getInscriptionFile()

> **getInscriptionFile**(`outpoint`): `Promise`\<`undefined` \| `number`[]\>

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

#### Returns

`Promise`\<`undefined` \| `number`[]\>

#### Defined in

[providers/1sat-provider.ts:187](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L187)

***

### getOriginAncestors()

> **getOriginAncestors**(`outpoints`): `Promise`\<[`IndexQueue`](../type-aliases/IndexQueue.md)\>

#### Parameters

• **outpoints**: [`Outpoint`](Outpoint.md)[]

#### Returns

`Promise`\<[`IndexQueue`](../type-aliases/IndexQueue.md)\>

#### Defined in

[providers/1sat-provider.ts:167](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L167)

***

### getTxo()

> **getTxo**(`outpoint`): `Promise`\<`undefined` \| `Ordinal`\>

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

#### Returns

`Promise`\<`undefined` \| `Ordinal`\>

#### Defined in

[providers/1sat-provider.ts:137](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L137)

***

### getTxos()

> **getTxos**(`outpoints`): `Promise`\<`Ordinal`[]\>

#### Parameters

• **outpoints**: [`Outpoint`](Outpoint.md)[]

#### Returns

`Promise`\<`Ordinal`[]\>

#### Defined in

[providers/1sat-provider.ts:144](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L144)

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

[providers/1sat-provider.ts:39](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L39)

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

[providers/1sat-provider.ts:78](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L78)

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

[providers/1sat-provider.ts:196](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L196)

***

### subscribed()

> **subscribed**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`subscribed`](../interfaces/AccountService.md#subscribed)

#### Defined in

[providers/1sat-provider.ts:192](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L192)

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

[providers/1sat-provider.ts:221](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L221)

***

### unsubscribe()

> **unsubscribe**(): `void`

#### Returns

`void`

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`unsubscribe`](../interfaces/AccountService.md#unsubscribe)

#### Defined in

[providers/1sat-provider.ts:214](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L214)

***

### utxos()

> **utxos**(): `Promise`\<`Ordinal`[]\>

#### Returns

`Promise`\<`Ordinal`[]\>

#### Implementation of

[`AccountService`](../interfaces/AccountService.md).[`utxos`](../interfaces/AccountService.md#utxos)

#### Defined in

[providers/1sat-provider.ts:130](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/providers/1sat-provider.ts#L130)
