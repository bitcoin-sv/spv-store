[**spv-store v0.1.44**](../README.md) • **Docs**

***

[spv-store v0.1.44](../globals.md) / TxoLookup

# Class: TxoLookup

## Constructors

### new TxoLookup()

> **new TxoLookup**(`tag`, `id`?, `value`?, `owner`?): [`TxoLookup`](TxoLookup.md)

Constructs a new instance of the search model.

#### Parameters

• **tag**: `string`

Tag of the indexer to be searched.

• **id?**: `string`

Optional ID of the field to be searched. Required if value populated.

• **value?**: `string`

Optional value of the field to be searched.

• **owner?**: `string`

Optional owner of the transaction output.

#### Returns

[`TxoLookup`](TxoLookup.md)

#### Defined in

[models/search.ts:17](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/search.ts#L17)

## Properties

### id?

> `optional` **id**: `string`

Optional ID of the field to be searched. Required if value populated.

#### Defined in

[models/search.ts:19](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/search.ts#L19)

***

### owner?

> `optional` **owner**: `string`

Optional owner of the transaction output.

#### Defined in

[models/search.ts:21](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/search.ts#L21)

***

### tag

> **tag**: `string`

Tag of the indexer to be searched.

#### Defined in

[models/search.ts:18](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/search.ts#L18)

***

### value?

> `optional` **value**: `string`

Optional value of the field to be searched.

#### Defined in

[models/search.ts:20](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/search.ts#L20)

## Methods

### toQueryKey()

> **toQueryKey**(): `string`

#### Returns

`string`

#### Defined in

[models/search.ts:24](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/search.ts#L24)

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

[models/search.ts:28](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/search.ts#L28)
