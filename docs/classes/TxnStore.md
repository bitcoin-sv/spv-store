[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / TxnStore

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

[stores/txn-store.ts:53](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txn-store.ts#L53)

## Properties

### events?

> `optional` **events**: `EventEmitter`

#### Defined in

[stores/txn-store.ts:57](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txn-store.ts#L57)

***

### services

> **services**: [`Services`](../interfaces/Services.md)

#### Defined in

[stores/txn-store.ts:55](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txn-store.ts#L55)

***

### storage

> **storage**: [`TxnStorage`](../interfaces/TxnStorage.md)

#### Defined in

[stores/txn-store.ts:54](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txn-store.ts#L54)

***

### stores

> **stores**: [`Stores`](../interfaces/Stores.md)

#### Defined in

[stores/txn-store.ts:56](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txn-store.ts#L56)

## Methods

### broadcast()

> **broadcast**(`tx`): `Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Defined in

[stores/txn-store.ts:66](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txn-store.ts#L66)

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:60](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txn-store.ts#L60)

***

### loadTx()

> **loadTx**(`txid`): `Promise`\<`Transaction`\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

[stores/txn-store.ts:78](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txn-store.ts#L78)

***

### processConfirmed()

> **processConfirmed**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:184](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txn-store.ts#L184)

***

### processMempool()

> **processMempool**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:144](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txn-store.ts#L144)

***

### processQueue()

> **processQueue**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:136](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txn-store.ts#L136)

***

### saveTx()

> **saveTx**(`tx`): `Promise`\<`void`\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txn-store.ts:113](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/txn-store.ts#L113)
