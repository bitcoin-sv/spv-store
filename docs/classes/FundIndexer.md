[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / FundIndexer

# Class: FundIndexer

## Extends

- [`Indexer`](Indexer.md)

## Constructors

### new FundIndexer()

> **new FundIndexer**(`owners`, `mode`, `network`): [`FundIndexer`](FundIndexer.md)

#### Parameters

• **owners**: `Set`\<`string`\> = `...`

• **mode**: [`IndexMode`](../enumerations/IndexMode.md)

• **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

#### Returns

[`FundIndexer`](FundIndexer.md)

#### Inherited from

[`Indexer`](Indexer.md).[`constructor`](Indexer.md#constructors)

#### Defined in

[models/indexer.ts:17](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/models/indexer.ts#L17)

## Properties

### mode

> **mode**: [`IndexMode`](../enumerations/IndexMode.md)

#### Inherited from

[`Indexer`](Indexer.md).[`mode`](Indexer.md#mode)

#### Defined in

[models/indexer.ts:19](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/models/indexer.ts#L19)

***

### name

> **name**: `string` = `"Funds"`

#### Overrides

[`Indexer`](Indexer.md).[`name`](Indexer.md#name)

#### Defined in

[indexers/fund.ts:19](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/indexers/fund.ts#L19)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

#### Inherited from

[`Indexer`](Indexer.md).[`network`](Indexer.md#network)

#### Defined in

[models/indexer.ts:20](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/models/indexer.ts#L20)

***

### owners

> **owners**: `Set`\<`string`\>

#### Inherited from

[`Indexer`](Indexer.md).[`owners`](Indexer.md#owners)

#### Defined in

[models/indexer.ts:18](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/models/indexer.ts#L18)

***

### tag

> **tag**: `string` = `"fund"`

#### Overrides

[`Indexer`](Indexer.md).[`tag`](Indexer.md#tag)

#### Defined in

[indexers/fund.ts:18](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/indexers/fund.ts#L18)

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

[indexers/fund.ts:21](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/indexers/fund.ts#L21)

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

[indexers/fund.ts:33](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/indexers/fund.ts#L33)

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

[indexers/fund.ts:54](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/indexers/fund.ts#L54)

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

[models/indexer.ts:35](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/models/indexer.ts#L35)
