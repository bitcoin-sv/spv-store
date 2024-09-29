[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / Bsv20Indexer

# Class: Bsv20Indexer

## Extends

- [`Indexer`](Indexer.md)

## Constructors

### new Bsv20Indexer()

> **new Bsv20Indexer**(`owners`, `mode`, `network`): [`Bsv20Indexer`](Bsv20Indexer.md)

#### Parameters

• **owners**: `Set`\<`string`\> = `...`

• **mode**: [`IndexMode`](../enumerations/IndexMode.md)

• **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

#### Returns

[`Bsv20Indexer`](Bsv20Indexer.md)

#### Overrides

[`Indexer`](Indexer.md).[`constructor`](Indexer.md#constructors)

#### Defined in

[indexers/bsv20.ts:44](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv20.ts#L44)

## Properties

### mode

> **mode**: [`IndexMode`](../enumerations/IndexMode.md)

#### Inherited from

[`Indexer`](Indexer.md).[`mode`](Indexer.md#mode)

#### Defined in

[indexers/bsv20.ts:46](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv20.ts#L46)

***

### name

> **name**: `string` = `"Bsv20s"`

#### Overrides

[`Indexer`](Indexer.md).[`name`](Indexer.md#name)

#### Defined in

[indexers/bsv20.ts:41](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv20.ts#L41)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

#### Inherited from

[`Indexer`](Indexer.md).[`network`](Indexer.md#network)

#### Defined in

[indexers/bsv20.ts:47](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv20.ts#L47)

***

### owners

> **owners**: `Set`\<`string`\>

#### Inherited from

[`Indexer`](Indexer.md).[`owners`](Indexer.md#owners)

#### Defined in

[indexers/bsv20.ts:45](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv20.ts#L45)

***

### provider

> **provider**: `OneSatProvider`

#### Defined in

[indexers/bsv20.ts:43](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv20.ts#L43)

***

### tag

> **tag**: `string` = `"bsv20"`

#### Overrides

[`Indexer`](Indexer.md).[`tag`](Indexer.md#tag)

#### Defined in

[indexers/bsv20.ts:40](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv20.ts#L40)

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

[indexers/bsv20.ts:53](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv20.ts#L53)

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

[indexers/bsv20.ts:87](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv20.ts#L87)

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

[indexers/bsv20.ts:109](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/indexers/bsv20.ts#L109)

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
