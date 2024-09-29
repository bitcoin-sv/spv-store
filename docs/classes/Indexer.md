[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / Indexer

# Class: `abstract` Indexer

## Extended by

- [`Bsv20Indexer`](Bsv20Indexer.md)
- [`Bsv21Indexer`](Bsv21Indexer.md)
- [`FundIndexer`](FundIndexer.md)
- [`LockIndexer`](LockIndexer.md)
- [`InscriptionIndexer`](InscriptionIndexer.md)
- [`OpNSIndexer`](OpNSIndexer.md)
- [`OriginIndexer`](OriginIndexer.md)
- [`MapIndexer`](MapIndexer.md)
- [`OrdLockIndexer`](OrdLockIndexer.md)

## Constructors

### new Indexer()

> **new Indexer**(`owners`, `mode`, `network`): [`Indexer`](Indexer.md)

#### Parameters

• **owners**: `Set`\<`string`\> = `...`

• **mode**: [`IndexMode`](../enumerations/IndexMode.md)

• **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

#### Returns

[`Indexer`](Indexer.md)

#### Defined in

[models/indexer.ts:17](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/models/indexer.ts#L17)

## Properties

### mode

> **mode**: [`IndexMode`](../enumerations/IndexMode.md)

#### Defined in

[models/indexer.ts:19](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/models/indexer.ts#L19)

***

### name

> **name**: `string` = `""`

#### Defined in

[models/indexer.ts:15](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/models/indexer.ts#L15)

***

### network

> **network**: [`Network`](../type-aliases/Network.md) = `"mainnet"`

#### Defined in

[models/indexer.ts:20](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/models/indexer.ts#L20)

***

### owners

> **owners**: `Set`\<`string`\>

#### Defined in

[models/indexer.ts:18](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/models/indexer.ts#L18)

***

### tag

> **tag**: `string` = `""`

#### Defined in

[models/indexer.ts:14](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/models/indexer.ts#L14)

## Methods

### parse()

> **parse**(`ctx`, `vout`, `previewOnly`): `Promise`\<`undefined` \| [`IndexData`](IndexData.md)\>

#### Parameters

• **ctx**: [`IndexContext`](IndexContext.md)

• **vout**: `number`

• **previewOnly**: `boolean` = `false`

#### Returns

`Promise`\<`undefined` \| [`IndexData`](IndexData.md)\>

#### Defined in

[models/indexer.ts:23](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/models/indexer.ts#L23)

***

### preSave()

> **preSave**(`ctx`): `Promise`\<`void`\>

#### Parameters

• **ctx**: [`IndexContext`](IndexContext.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[models/indexer.ts:31](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/models/indexer.ts#L31)

***

### sync()

> **sync**(`txoStore`, `ingestQueue`): `Promise`\<`void`\>

#### Parameters

• **txoStore**: [`TxoStore`](TxoStore.md)

• **ingestQueue**

#### Returns

`Promise`\<`void`\>

#### Defined in

[models/indexer.ts:49](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/models/indexer.ts#L49)

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

#### Defined in

[models/indexer.ts:35](https://github.com/shruggr/ts-casemod-spv/blob/7c4f30ec55cedd3466531bc7310dc7c1601f1f8a/src/models/indexer.ts#L35)
