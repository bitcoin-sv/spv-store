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

[stores/txn-store.ts:33](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/stores/txn-store.ts#L33)

## Properties

### events?

> `optional` **events**: `EventEmitter`

#### Defined in

[stores/txn-store.ts:37](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/stores/txn-store.ts#L37)

***

### services

> **services**: [`Services`](../interfaces/Services.md)

#### Defined in

[stores/txn-store.ts:35](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/stores/txn-store.ts#L35)

***

### storage

> **storage**: [`TxnStorage`](../interfaces/TxnStorage.md)

#### Defined in

[stores/txn-store.ts:34](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/stores/txn-store.ts#L34)

***

### stores

> **stores**: [`Stores`](../interfaces/Stores.md)

#### Defined in

[stores/txn-store.ts:36](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/stores/txn-store.ts#L36)

## Methods

### broadcast()

> **broadcast**(`tx`): `Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Defined in

[stores/txn-store.ts:46](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/stores/txn-store.ts#L46)

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:40](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/stores/txn-store.ts#L40)

***

### ensureTxns()

> **ensureTxns**(`txids`): `Promise`\<`void`\>

#### Parameters

• **txids**: `string`[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:186](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/stores/txn-store.ts#L186)

***

### loadTx()

> **loadTx**(`txid`, `fromRemote`): `Promise`\<`undefined` \| `Transaction`\>

#### Parameters

• **txid**: `string`

• **fromRemote**: `boolean` = `false`

#### Returns

`Promise`\<`undefined` \| `Transaction`\>

#### Defined in

[stores/txn-store.ts:58](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/stores/txn-store.ts#L58)

***

### processConfirmed()

> **processConfirmed**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:144](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/stores/txn-store.ts#L144)

***

### processMempool()

> **processMempool**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:108](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/stores/txn-store.ts#L108)

***

### processQueue()

> **processQueue**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:100](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/stores/txn-store.ts#L100)

***

### saveTx()

> **saveTx**(`tx`): `Promise`\<`void`\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:79](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/stores/txn-store.ts#L79)
