[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / TxnService

# Interface: TxnService

## Methods

### fetchBeef()

> **fetchBeef**(`txid`): `Promise`\<`Transaction`\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

[services/txn-service.ts:5](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/services/txn-service.ts#L5)

***

### fetchProof()

> **fetchProof**(`txid`): `Promise`\<`undefined` \| `MerklePath`\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| `MerklePath`\>

#### Defined in

[services/txn-service.ts:6](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/services/txn-service.ts#L6)
