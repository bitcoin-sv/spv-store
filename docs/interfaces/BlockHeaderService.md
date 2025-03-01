[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / BlockHeaderService

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

[services/block-service.ts:4](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/services/block-service.ts#L4)

***

### getChaintip()

> **getChaintip**(): `Promise`\<[`BlockHeader`](BlockHeader.md)\>

#### Returns

`Promise`\<[`BlockHeader`](BlockHeader.md)\>

#### Defined in

[services/block-service.ts:5](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/services/block-service.ts#L5)
