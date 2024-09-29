[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / OriginIndexer

# Class: OriginIndexer

## Extends

- [`Indexer`](Indexer.md)

## Constructors

### new OriginIndexer()

> **new OriginIndexer**(`owners`, `mode`, `network`): [`OriginIndexer`](OriginIndexer.md)

#### Parameters

• **owners**: `Set`\<`string`\> = `...`

• **mode**: [`IndexMode`](../enumerations/IndexMode.md)

• **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

#### Returns

[`OriginIndexer`](OriginIndexer.md)

#### Inherited from

[`Indexer`](Indexer.md).[`constructor`](Indexer.md#constructors)

#### Defined in

[models/indexer.ts:17](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/models/indexer.ts#L17)

## Properties

### mode

> **mode**: [`IndexMode`](../enumerations/IndexMode.md)

#### Inherited from

[`Indexer`](Indexer.md).[`mode`](Indexer.md#mode)

#### Defined in

[models/indexer.ts:19](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/models/indexer.ts#L19)

***

### name

> **name**: `string` = `"Origins"`

#### Overrides

[`Indexer`](Indexer.md).[`name`](Indexer.md#name)

#### Defined in

[indexers/origin.ts:29](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/indexers/origin.ts#L29)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

#### Inherited from

[`Indexer`](Indexer.md).[`network`](Indexer.md#network)

#### Defined in

[models/indexer.ts:20](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/models/indexer.ts#L20)

***

### owners

> **owners**: `Set`\<`string`\>

#### Inherited from

[`Indexer`](Indexer.md).[`owners`](Indexer.md#owners)

#### Defined in

[models/indexer.ts:18](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/models/indexer.ts#L18)

***

### tag

> **tag**: `string` = `"origin"`

#### Overrides

[`Indexer`](Indexer.md).[`tag`](Indexer.md#tag)

#### Defined in

[indexers/origin.ts:28](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/indexers/origin.ts#L28)

## Methods

### fetchAncestors()

> **fetchAncestors**(`owner`, `outpoints`): `Promise`\<[`IndexQueue`](../type-aliases/IndexQueue.md)\>

#### Parameters

• **owner**: `string`

• **outpoints**: [`Outpoint`](Outpoint.md)[]

#### Returns

`Promise`\<[`IndexQueue`](../type-aliases/IndexQueue.md)\>

#### Defined in

[indexers/origin.ts:193](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/indexers/origin.ts#L193)

***

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

[indexers/origin.ts:31](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/indexers/origin.ts#L31)

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

[models/indexer.ts:31](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/models/indexer.ts#L31)

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

[indexers/origin.ts:100](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/indexers/origin.ts#L100)

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

[models/indexer.ts:35](https://github.com/shruggr/ts-casemod-spv/blob/e76938ede3d1388f9d1a1c2ddcbe0c172bd9233b/src/models/indexer.ts#L35)
