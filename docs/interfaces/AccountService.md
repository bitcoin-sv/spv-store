[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / AccountService

# Interface: AccountService

## Properties

### accountId?

> `optional` **accountId**: `string`

#### Defined in

[services/account-service.ts:22](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/services/account-service.ts#L22)

## Methods

### register()

> **register**(`addresses`): `Promise`\<`void`\>

#### Parameters

• **addresses**: `string`[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[services/account-service.ts:23](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/services/account-service.ts#L23)

***

### search()

> **search**(`query`): `Promise`\<`Ordinal`[]\>

#### Parameters

• **query**: [`Query`](Query.md)

#### Returns

`Promise`\<`Ordinal`[]\>

#### Defined in

[services/account-service.ts:30](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/services/account-service.ts#L30)

***

### spends()

> **spends**(`outpoints`): `Promise`\<`string`[]\>

#### Parameters

• **outpoints**: `string`[]

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[services/account-service.ts:29](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/services/account-service.ts#L29)

***

### subscribe()

> **subscribe**(`cb`): `void`

#### Parameters

• **cb**

#### Returns

`void`

#### Defined in

[services/account-service.ts:26](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/services/account-service.ts#L26)

***

### subscribed()

> **subscribed**(): `boolean`

#### Returns

`boolean`

#### Defined in

[services/account-service.ts:25](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/services/account-service.ts#L25)

***

### syncTxLogs()

> **syncTxLogs**(`from`): `Promise`\<[`TxSyncLog`](TxSyncLog.md)[]\>

#### Parameters

• **from**: `number`

#### Returns

`Promise`\<[`TxSyncLog`](TxSyncLog.md)[]\>

#### Defined in

[services/account-service.ts:24](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/services/account-service.ts#L24)

***

### unsubscribe()

> **unsubscribe**(): `void`

#### Returns

`void`

#### Defined in

[services/account-service.ts:27](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/services/account-service.ts#L27)

***

### utxos()

> **utxos**(): `Promise`\<`Ordinal`[]\>

#### Returns

`Promise`\<`Ordinal`[]\>

#### Defined in

[services/account-service.ts:28](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/services/account-service.ts#L28)
