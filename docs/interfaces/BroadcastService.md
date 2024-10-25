[**spv-store v0.1.23**](../README.md) • **Docs**

***

[spv-store v0.1.23](../globals.md) / BroadcastService

# Interface: BroadcastService

## Methods

### broadcast()

> **broadcast**(`tx`): `Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Defined in

[services/broadcast-service.ts:21](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/services/broadcast-service.ts#L21)

***

### status()

> **status**(`txid`): `Promise`\<`undefined` \| [`BroadcastStatusResponse`](BroadcastStatusResponse.md)\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| [`BroadcastStatusResponse`](BroadcastStatusResponse.md)\>

#### Defined in

[services/broadcast-service.ts:22](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/services/broadcast-service.ts#L22)
