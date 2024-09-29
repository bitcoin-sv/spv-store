[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / Bsv21Indexer

# Class: Bsv21Indexer

## Extends

- [`Indexer`](Indexer.md)

## Constructors

### new Bsv21Indexer()

> **new Bsv21Indexer**(`owners`, `mode`, `network`): [`Bsv21Indexer`](Bsv21Indexer.md)

#### Parameters

• **owners**: `Set`\<`string`\> = `...`

• **mode**: [`IndexMode`](../enumerations/IndexMode.md)

• **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

#### Returns

[`Bsv21Indexer`](Bsv21Indexer.md)

#### Overrides

[`Indexer`](Indexer.md).[`constructor`](Indexer.md#constructors)

#### Defined in

[indexers/bsv21.ts:50](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv21.ts#L50)

## Properties

### mode

> **mode**: [`IndexMode`](../enumerations/IndexMode.md)

#### Inherited from

[`Indexer`](Indexer.md).[`mode`](Indexer.md#mode)

#### Defined in

[indexers/bsv21.ts:52](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv21.ts#L52)

***

### name

> **name**: `string` = `"Bsv21s"`

#### Overrides

[`Indexer`](Indexer.md).[`name`](Indexer.md#name)

#### Defined in

[indexers/bsv21.ts:47](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv21.ts#L47)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

#### Inherited from

[`Indexer`](Indexer.md).[`network`](Indexer.md#network)

#### Defined in

[indexers/bsv21.ts:53](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv21.ts#L53)

***

### owners

> **owners**: `Set`\<`string`\>

#### Inherited from

[`Indexer`](Indexer.md).[`owners`](Indexer.md#owners)

#### Defined in

[indexers/bsv21.ts:51](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv21.ts#L51)

***

### provider

> **provider**: `OneSatProvider`

#### Defined in

[indexers/bsv21.ts:49](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv21.ts#L49)

***

### tag

> **tag**: `string` = `"bsv21"`

#### Overrides

[`Indexer`](Indexer.md).[`tag`](Indexer.md#tag)

#### Defined in

[indexers/bsv21.ts:46](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv21.ts#L46)

## Methods

### parse()

> **parse**(`ctx`, `vout`): `Promise`\<`undefined` \| [`IndexData`](IndexData.md)\>

#### Parameters

• **ctx**: [`IndexContext`](IndexContext.md)

• **vout**: `number`

#### Returns

`Promise`\<`undefined` \| [`IndexData`](IndexData.md)\>

#### Overrides

[`Indexer`](Indexer.md).[`parse`](Indexer.md#parse)

#### Defined in

[indexers/bsv21.ts:59](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv21.ts#L59)

***

### preSave()

> **preSave**(`ctx`): `Promise`\<`void`\>

#### Parameters

• **ctx**: [`IndexContext`](IndexContext.md)

#### Returns

`Promise`\<`void`\>

#### Overrides

[`Indexer`](Indexer.md).[`preSave`](Indexer.md#presave)

#### Defined in

[indexers/bsv21.ts:99](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv21.ts#L99)

***

### sync()

> **sync**(`txoStore`, `ingestQueue`): `Promise`\<`void`\>

#### Parameters

• **txoStore**: [`TxoStore`](TxoStore.md)

• **ingestQueue**

#### Returns

`Promise`\<`void`\>

#### Overrides

[`Indexer`](Indexer.md).[`sync`](Indexer.md#sync)

#### Defined in

[indexers/bsv21.ts:175](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv21.ts#L175)

***

### parseEvent()

> `static` **parseEvent**(`event`): `object`

#### Parameters

• **event**: `string`

#### Returns

`object`

##### id

> **id**: `string`

##### idx

> **idx**: `number`

##### satoshis

> **satoshis**: `bigint`

##### sort

> **sort**: `number`

##### spent

> **spent**: `boolean`

##### tag

> **tag**: `string`

##### value

> **value**: `string`

##### vout

> **vout**: `number`

#### Inherited from

[`Indexer`](Indexer.md).[`parseEvent`](Indexer.md#parseevent)

#### Defined in

[models/indexer.ts:35](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/models/indexer.ts#L35)
