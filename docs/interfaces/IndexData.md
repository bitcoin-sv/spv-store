[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / IndexData

# Interface: IndexData

Represents the data structure used by the indexer to store parsed data,
emitted events, and dependencies.

## Properties

### data?

> `optional` **data**: `any`

#### Defined in

[models/index-data.ts:9](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/index-data.ts#L9)

***

### deps?

> `optional` **deps**: [`Outpoint`](../classes/Outpoint.md)[]

#### Defined in

[models/index-data.ts:11](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/index-data.ts#L11)

***

### events?

> `optional` **events**: [`Event`](Event.md)[]

#### Defined in

[models/index-data.ts:10](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/index-data.ts#L10)

***

### queue?

> `optional` **queue**: [`Outpoint`](../classes/Outpoint.md)[]

#### Defined in

[models/index-data.ts:12](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/index-data.ts#L12)
