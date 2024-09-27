[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / TxoLookup

# Class: TxoLookup

## Constructors

### new TxoLookup()

> **new TxoLookup**(`tag`, `id`?, `value`?, `owner`?): [`TxoLookup`](TxoLookup.md)

#### Parameters

• **tag**: `string`

• **id?**: `string`

• **value?**: `string`

• **owner?**: `string`

#### Returns

[`TxoLookup`](TxoLookup.md)

#### Defined in

[models/search.ts:9](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/models/search.ts#L9)

## Properties

### id?

> `optional` **id**: `string`

#### Defined in

[models/search.ts:11](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/models/search.ts#L11)

***

### owner?

> `optional` **owner**: `string`

#### Defined in

[models/search.ts:13](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/models/search.ts#L13)

***

### tag

> **tag**: `string`

#### Defined in

[models/search.ts:10](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/models/search.ts#L10)

***

### value?

> `optional` **value**: `string`

#### Defined in

[models/search.ts:12](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/models/search.ts#L12)

## Methods

### toQueryKey()

> **toQueryKey**(): `string`

#### Returns

`string`

#### Defined in

[models/search.ts:16](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/models/search.ts#L16)

***

### buildQueryKey()

> `static` **buildQueryKey**(`tag`, `id`?, `value`?): `string`

#### Parameters

• **tag**: `string`

• **id?**: `string`

• **value?**: `string`

#### Returns

`string`

#### Defined in

[models/search.ts:20](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/models/search.ts#L20)
