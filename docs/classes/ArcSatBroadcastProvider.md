[**spv-store v0.1.44**](../README.md) • **Docs**

***

[spv-store v0.1.44](../globals.md) / ArcSatBroadcastProvider

# Class: ArcSatBroadcastProvider

## Implements

- [`BroadcastService`](../interfaces/BroadcastService.md)

## Constructors

### new ArcSatBroadcastProvider()

> **new ArcSatBroadcastProvider**(`baseUrl`, `apiKey`?): [`ArcSatBroadcastProvider`](ArcSatBroadcastProvider.md)

#### Parameters

• **baseUrl**: `string`

• **apiKey?**: `string`

#### Returns

[`ArcSatBroadcastProvider`](ArcSatBroadcastProvider.md)

#### Defined in

[providers/arc-broadcast-service.ts:14](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/arc-broadcast-service.ts#L14)

## Properties

### apiKey?

> `optional` **apiKey**: `string`

#### Defined in

[providers/arc-broadcast-service.ts:16](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/arc-broadcast-service.ts#L16)

***

### baseUrl

> **baseUrl**: `string`

#### Defined in

[providers/arc-broadcast-service.ts:15](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/arc-broadcast-service.ts#L15)

## Methods

### batchFetch()

> **batchFetch**(`txids`): `Promise`\<`Transaction`[]\>

#### Parameters

• **txids**: `string`[]

#### Returns

`Promise`\<`Transaction`[]\>

#### Defined in

[providers/arc-broadcast-service.ts:66](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/arc-broadcast-service.ts#L66)

***

### broadcast()

> **broadcast**(`tx`): `Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Parameters

• **tx**: `Transaction`

#### Returns

`Promise`\<`BroadcastResponse` \| `BroadcastFailure`\>

#### Implementation of

[`BroadcastService`](../interfaces/BroadcastService.md).[`broadcast`](../interfaces/BroadcastService.md#broadcast)

#### Defined in

[providers/arc-broadcast-service.ts:18](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/arc-broadcast-service.ts#L18)

***

### fetch()

> **fetch**(`txid`): `Promise`\<`Transaction`\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`Transaction`\>

#### Defined in

[providers/arc-broadcast-service.ts:62](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/arc-broadcast-service.ts#L62)

***

### status()

> **status**(`txid`): `Promise`\<`undefined` \| [`BroadcastStatusResponse`](../interfaces/BroadcastStatusResponse.md)\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| [`BroadcastStatusResponse`](../interfaces/BroadcastStatusResponse.md)\>

#### Implementation of

[`BroadcastService`](../interfaces/BroadcastService.md).[`status`](../interfaces/BroadcastService.md#status)

#### Defined in

[providers/arc-broadcast-service.ts:38](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/providers/arc-broadcast-service.ts#L38)
