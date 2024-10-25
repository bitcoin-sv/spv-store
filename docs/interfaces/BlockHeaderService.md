[**spv-store v0.1.23**](../README.md) • **Docs**

***

[spv-store v0.1.23](../globals.md) / BlockHeaderService

# Interface: BlockHeaderService

## Methods

### getBlocks()

> **getBlocks**(`lastHeight`, `limit`): `Promise`\<[`BlockHeader`](BlockHeader.md)[]\>

#### Parameters

• **lastHeight**: `number`

• **limit**: `number`

#### Returns

`Promise`\<[`BlockHeader`](BlockHeader.md)[]\>

#### Defined in

[services/block-service.ts:4](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/services/block-service.ts#L4)

***

### getChaintip()

> **getChaintip**(): `Promise`\<[`BlockHeader`](BlockHeader.md)\>

#### Returns

`Promise`\<[`BlockHeader`](BlockHeader.md)\>

#### Defined in

[services/block-service.ts:5](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/services/block-service.ts#L5)
