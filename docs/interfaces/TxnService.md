[**spv-store v0.1.23**](../README.md) • **Docs**

***

[spv-store v0.1.23](../globals.md) / TxnService

# Interface: TxnService

## Methods

### fetchProof()

> **fetchProof**(`txid`): `Promise`\<`undefined` \| `number`[]\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| `number`[]\>

#### Defined in

[services/txn-service.ts:6](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/services/txn-service.ts#L6)

***

### fetchTxn()

> **fetchTxn**(`txid`): `Promise`\<[`Txn`](Txn.md)\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<[`Txn`](Txn.md)\>

#### Defined in

[services/txn-service.ts:4](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/services/txn-service.ts#L4)
