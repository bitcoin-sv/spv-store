[**spv-store v0.1.24**](../README.md) • **Docs**

***

[spv-store v0.1.24](../globals.md) / IndexData

# Class: IndexData

Represents the data structure used by the indexer to store parsed data,
emitted events, and dependencies.

## Constructors

### new IndexData()

> **new IndexData**(`data`?, `events`?, `deps`?): [`IndexData`](IndexData.md)

Creates an instance of IndexData.

#### Parameters

• **data?**: `any`

An arbitrary data object to be used by the indexer to store parsed data.

• **events?**: [`Event`](../interfaces/Event.md)[] = `[]`

An array of events emitted by the indexer in regard to the output. Events can be searched.

• **deps?**: [`Outpoint`](Outpoint.md)[] = `[]`

An array of outpoints that this output depends on.

#### Returns

[`IndexData`](IndexData.md)

#### Defined in

[models/index-data.ts:16](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/index-data.ts#L16)

## Properties

### data?

> `optional` **data**: `any`

An arbitrary data object to be used by the indexer to store parsed data.

#### Defined in

[models/index-data.ts:17](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/index-data.ts#L17)

***

### deps

> **deps**: [`Outpoint`](Outpoint.md)[] = `[]`

An array of outpoints that this output depends on.

#### Defined in

[models/index-data.ts:17](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/index-data.ts#L17)

***

### events

> **events**: [`Event`](../interfaces/Event.md)[] = `[]`

An array of events emitted by the indexer in regard to the output. Events can be searched.

#### Defined in

[models/index-data.ts:17](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/models/index-data.ts#L17)
