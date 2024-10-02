[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / BroadcastService

# Interface: BroadcastService

## Methods

### broadcast()

> **broadcast**(`tx`): `Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Defined in

[services/broadcast-service.ts:21](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/services/broadcast-service.ts#L21)

***

### status()

> **status**(`txid`): `Promise`\<`undefined` \| [`BroadcastStatusResponse`](BroadcastStatusResponse.md)\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| [`BroadcastStatusResponse`](BroadcastStatusResponse.md)\>

#### Defined in

[services/broadcast-service.ts:22](https://github.com/shruggr/ts-casemod-spv/blob/3ea4eaa98b52595d9cf79b03096c7b1d167ad808/src/services/broadcast-service.ts#L22)
