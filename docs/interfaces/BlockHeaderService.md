[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / BlockHeaderService

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

[services/block-service.ts:4](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/services/block-service.ts#L4)

***

### getChaintip()

> **getChaintip**(): `Promise`\<[`BlockHeader`](BlockHeader.md)\>

#### Returns

`Promise`\<[`BlockHeader`](BlockHeader.md)\>

#### Defined in

[services/block-service.ts:5](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/services/block-service.ts#L5)
