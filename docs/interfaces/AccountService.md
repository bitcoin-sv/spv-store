[**spv-store v0.1.24**](../README.md) • **Docs**

***

[spv-store v0.1.24](../globals.md) / AccountService

# Interface: AccountService

## Properties

### accountId?

> `optional` **accountId**: `string`

#### Defined in

[services/account-service.ts:12](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/services/account-service.ts#L12)

## Methods

### register()

> **register**(`addresses`): `Promise`\<`void`\>

#### Parameters

• **addresses**: `string`[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[services/account-service.ts:13](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/services/account-service.ts#L13)

***

### subscribe()

> **subscribe**(`cb`): `void`

#### Parameters

• **cb**

#### Returns

`void`

#### Defined in

[services/account-service.ts:16](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/services/account-service.ts#L16)

***

### subscribed()

> **subscribed**(): `boolean`

#### Returns

`boolean`

#### Defined in

[services/account-service.ts:15](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/services/account-service.ts#L15)

***

### syncTxLogs()

> **syncTxLogs**(`from`): `Promise`\<[`TxSyncLog`](TxSyncLog.md)[]\>

#### Parameters

• **from**: `number`

#### Returns

`Promise`\<[`TxSyncLog`](TxSyncLog.md)[]\>

#### Defined in

[services/account-service.ts:14](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/services/account-service.ts#L14)

***

### unsubscribe()

> **unsubscribe**(): `void`

#### Returns

`void`

#### Defined in

[services/account-service.ts:17](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/services/account-service.ts#L17)

***

### utxos()

> **utxos**(): `Promise`\<`Ordinal`[]\>

#### Returns

`Promise`\<`Ordinal`[]\>

#### Defined in

[services/account-service.ts:18](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/services/account-service.ts#L18)
