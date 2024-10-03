[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / TxnStore

# Class: TxnStore

## Constructors

### new TxnStore()

> **new TxnStore**(`storage`, `services`, `stores`, `events`?): [`TxnStore`](TxnStore.md)

#### Parameters

• **storage**: [`TxnStorage`](../interfaces/TxnStorage.md)

• **services**: [`Services`](../interfaces/Services.md)

• **stores**: [`Stores`](../interfaces/Stores.md)

• **events?**: `EventEmitter`

#### Returns

[`TxnStore`](TxnStore.md)

#### Defined in

[stores/txn-store.ts:53](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/stores/txn-store.ts#L53)

## Properties

### events?

> `optional` **events**: `EventEmitter`

#### Defined in

[stores/txn-store.ts:57](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/stores/txn-store.ts#L57)

***

### services

> **services**: [`Services`](../interfaces/Services.md)

#### Defined in

[stores/txn-store.ts:55](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/stores/txn-store.ts#L55)

***

### storage

> **storage**: [`TxnStorage`](../interfaces/TxnStorage.md)

#### Defined in

[stores/txn-store.ts:54](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/stores/txn-store.ts#L54)

***

### stores

> **stores**: [`Stores`](../interfaces/Stores.md)

#### Defined in

[stores/txn-store.ts:56](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/stores/txn-store.ts#L56)

## Methods

### broadcast()

> **broadcast**(`tx`): `Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Defined in

[stores/txn-store.ts:66](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/stores/txn-store.ts#L66)

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:60](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/stores/txn-store.ts#L60)

***

### ensureTxns()

> **ensureTxns**(`txids`): `Promise`\<`void`\>

#### Parameters

• **txids**: `string`[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:217](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/stores/txn-store.ts#L217)

***

### loadTx()

> **loadTx**(`txid`, `fromRemote`): `Promise`\<`undefined` \| `Transaction`\>

#### Parameters

• **txid**: `string`

• **fromRemote**: `boolean` = `false`

#### Returns

`Promise`\<`undefined` \| `Transaction`\>

#### Defined in

[stores/txn-store.ts:78](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/stores/txn-store.ts#L78)

***

### processConfirmed()

> **processConfirmed**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:170](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/stores/txn-store.ts#L170)

***

### processMempool()

> **processMempool**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:129](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/stores/txn-store.ts#L129)

***

### processQueue()

> **processQueue**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:121](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/stores/txn-store.ts#L121)

***

### saveTx()

> **saveTx**(`tx`): `Promise`\<`void`\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:100](https://github.com/shruggr/ts-casemod-spv/blob/e58946f83152e9deb265157899c0af08eff6c009/src/stores/txn-store.ts#L100)
