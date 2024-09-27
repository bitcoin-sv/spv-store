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

[services/broadcast-service.ts:21](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/services/broadcast-service.ts#L21)

***

### status()

> **status**(`txid`): `Promise`\<`undefined` \| [`BroadcastStatusResponse`](BroadcastStatusResponse.md)\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| [`BroadcastStatusResponse`](BroadcastStatusResponse.md)\>

#### Defined in

[services/broadcast-service.ts:22](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/services/broadcast-service.ts#L22)
