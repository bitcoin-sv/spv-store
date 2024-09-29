[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / BlockStore

# Class: BlockStore

## Implements

- `default`

## Constructors

### new BlockStore()

> **new BlockStore**(`storage`, `services`, `emitter`?): [`BlockStore`](BlockStore.md)

#### Parameters

• **storage**: [`BlockStorage`](../interfaces/BlockStorage.md)

• **services**: [`Services`](../interfaces/Services.md)

• **emitter?**: `EventEmitter`

#### Returns

[`BlockStore`](BlockStore.md)

#### Defined in

[stores/block-store.ts:12](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/stores/block-store.ts#L12)

## Properties

### emitter?

> `optional` **emitter**: `EventEmitter`

#### Defined in

[stores/block-store.ts:15](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/stores/block-store.ts#L15)

***

### services

> **services**: [`Services`](../interfaces/Services.md)

#### Defined in

[stores/block-store.ts:14](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/stores/block-store.ts#L14)

***

### storage

> **storage**: [`BlockStorage`](../interfaces/BlockStorage.md)

#### Defined in

[stores/block-store.ts:13](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/stores/block-store.ts#L13)

## Methods

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/block-store.ts:18](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/stores/block-store.ts#L18)

***

### getChaintip()

> **getChaintip**(): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

#### Defined in

[stores/block-store.ts:76](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/stores/block-store.ts#L76)

***

### isValidRootForHeight()

> **isValidRootForHeight**(`root`, `height`): `Promise`\<`boolean`\>

#### Parameters

• **root**: `string`

• **height**: `number`

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

`ChainTracker.isValidRootForHeight`

#### Defined in

[stores/block-store.ts:71](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/stores/block-store.ts#L71)

***

### sync()

> **sync**(`returnOnChaintip`): `Promise`\<`void`\>

#### Parameters

• **returnOnChaintip**: `boolean` = `true`

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/block-store.ts:24](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/stores/block-store.ts#L24)
