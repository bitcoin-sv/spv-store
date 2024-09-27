[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / OrdLockIndexer

# Class: OrdLockIndexer

## Extends

- [`Indexer`](Indexer.md)

## Constructors

### new OrdLockIndexer()

> **new OrdLockIndexer**(`owners`, `mode`, `network`): [`OrdLockIndexer`](OrdLockIndexer.md)

#### Parameters

• **owners**: `Set`\<`string`\> = `...`

• **mode**: [`IndexMode`](../enumerations/IndexMode.md)

• **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

#### Returns

[`OrdLockIndexer`](OrdLockIndexer.md)

#### Inherited from

[`Indexer`](Indexer.md).[`constructor`](Indexer.md#constructors)

#### Defined in

[models/indexer.ts:17](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/models/indexer.ts#L17)

## Properties

### mode

> **mode**: [`IndexMode`](../enumerations/IndexMode.md)

#### Inherited from

[`Indexer`](Indexer.md).[`mode`](Indexer.md#mode)

#### Defined in

[models/indexer.ts:19](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/models/indexer.ts#L19)

***

### name

> **name**: `string` = `"Listings"`

#### Overrides

[`Indexer`](Indexer.md).[`name`](Indexer.md#name)

#### Defined in

[indexers/ordlock.ts:25](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/indexers/ordlock.ts#L25)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

#### Inherited from

[`Indexer`](Indexer.md).[`network`](Indexer.md#network)

#### Defined in

[models/indexer.ts:20](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/models/indexer.ts#L20)

***

### owners

> **owners**: `Set`\<`string`\>

#### Inherited from

[`Indexer`](Indexer.md).[`owners`](Indexer.md#owners)

#### Defined in

[models/indexer.ts:18](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/models/indexer.ts#L18)

***

### tag

> **tag**: `string` = `"list"`

#### Overrides

[`Indexer`](Indexer.md).[`tag`](Indexer.md#tag)

#### Defined in

[indexers/ordlock.ts:24](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/indexers/ordlock.ts#L24)

## Methods

### parse()

> **parse**(`ctx`, `vout`, `previewOnly`): `Promise`\<`undefined` \| [`IndexData`](IndexData.md)\>

#### Parameters

• **ctx**: [`IndexContext`](IndexContext.md)

• **vout**: `number`

• **previewOnly**: `boolean` = `false`

#### Returns

`Promise`\<`undefined` \| [`IndexData`](IndexData.md)\>

#### Overrides

[`Indexer`](Indexer.md).[`parse`](Indexer.md#parse)

#### Defined in

[indexers/ordlock.ts:27](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/indexers/ordlock.ts#L27)

***

### preSave()

> **preSave**(`ctx`): `Promise`\<`void`\>

#### Parameters

• **ctx**: [`IndexContext`](IndexContext.md)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Indexer`](Indexer.md).[`preSave`](Indexer.md#presave)

#### Defined in

[models/indexer.ts:31](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/models/indexer.ts#L31)

***

### sync()

> **sync**(`txoStore`, `ingestQueue`): `Promise`\<`void`\>

#### Parameters

• **txoStore**: [`TxoStore`](TxoStore.md)

• **ingestQueue**

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Indexer`](Indexer.md).[`sync`](Indexer.md#sync)

#### Defined in

[models/indexer.ts:49](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/models/indexer.ts#L49)

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

[models/indexer.ts:35](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/models/indexer.ts#L35)
