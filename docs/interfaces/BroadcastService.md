[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / BroadcastService

# Interface: BroadcastService

## Methods

### broadcast()

> **broadcast**(`tx`): `Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Defined in

[services/broadcast-service.ts:21](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/services/broadcast-service.ts#L21)

***

### status()

> **status**(`txid`): `Promise`\<`undefined` \| [`BroadcastStatusResponse`](BroadcastStatusResponse.md)\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| [`BroadcastStatusResponse`](BroadcastStatusResponse.md)\>

#### Defined in

[services/broadcast-service.ts:22](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/services/broadcast-service.ts#L22)
