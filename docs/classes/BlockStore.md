[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / BlockStore

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

[stores/block-store.ts:12](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/block-store.ts#L12)

## Properties

### emitter?

> `optional` **emitter**: `EventEmitter`

#### Defined in

[stores/block-store.ts:15](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/block-store.ts#L15)

***

### services

> **services**: [`Services`](../interfaces/Services.md)

#### Defined in

[stores/block-store.ts:14](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/block-store.ts#L14)

***

### storage

> **storage**: [`BlockStorage`](../interfaces/BlockStorage.md)

#### Defined in

[stores/block-store.ts:13](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/block-store.ts#L13)

## Methods

### currentHeight()

> **currentHeight**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Implementation of

`ChainTracker.currentHeight`

#### Defined in

[stores/block-store.ts:102](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/block-store.ts#L102)

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/block-store.ts:18](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/block-store.ts#L18)

***

### getChaintip()

> **getChaintip**(): `Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

Retrieves the current chaintip from the storage.

#### Returns

`Promise`\<`undefined` \| [`BlockHeader`](../interfaces/BlockHeader.md)\>

A promise that resolves to the current chaintip block header, or undefined if not available.

#### Defined in

[stores/block-store.ts:98](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/block-store.ts#L98)

***

### isValidRootForHeight()

> **isValidRootForHeight**(`root`, `height`): `Promise`\<`boolean`\>

Checks if the given root is valid for the specified block height.

#### Parameters

• **root**: `string`

The Merkle root to validate.

• **height**: `number`

The height of the block to check.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves to `true` if the root is valid for the given height, otherwise `false`.

#### Implementation of

`ChainTracker.isValidRootForHeight`

#### Defined in

[stores/block-store.ts:86](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/block-store.ts#L86)

***

### sync()

> **sync**(`returnOnChaintip`): `Promise`\<`void`\>

Synchronizes the block store with the blockchain.

#### Parameters

• **returnOnChaintip**: `boolean` = `true`

If true, the method will wait until the sync is complete before returning.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the synchronization is complete.

#### Defined in

[stores/block-store.ts:30](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/stores/block-store.ts#L30)
