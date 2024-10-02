[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / TxnService

# Interface: TxnService

## Methods

### fetchProof()

> **fetchProof**(`txid`): `Promise`\<`undefined` \| `number`[]\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| `number`[]\>

#### Defined in

[services/txn-service.ts:7](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/services/txn-service.ts#L7)

***

### fetchTxn()

> **fetchTxn**(`txid`): `Promise`\<[`Txn`](Txn.md)\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<[`Txn`](Txn.md)\>

#### Defined in

[services/txn-service.ts:5](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/services/txn-service.ts#L5)

***

### fetchTxns()

> **fetchTxns**(`txids`): `Promise`\<[`Txn`](Txn.md)[]\>

#### Parameters

• **txids**: `string`[]

#### Returns

`Promise`\<[`Txn`](Txn.md)[]\>

#### Defined in

[services/txn-service.ts:6](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/services/txn-service.ts#L6)
