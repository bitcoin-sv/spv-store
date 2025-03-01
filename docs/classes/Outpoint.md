[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / Outpoint

# Class: Outpoint

## Constructors

### new Outpoint()

> **new Outpoint**(`txidOrOutpoint`, `vout`?): [`Outpoint`](Outpoint.md)

#### Parameters

• **txidOrOutpoint**: `string` \| [`Outpoint`](Outpoint.md) \| `number`[]

• **vout?**: `number`

#### Returns

[`Outpoint`](Outpoint.md)

#### Defined in

[models/outpoint.ts:6](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/outpoint.ts#L6)

## Properties

### txid

> **txid**: `string`

#### Defined in

[models/outpoint.ts:3](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/outpoint.ts#L3)

***

### vout

> **vout**: `number`

#### Defined in

[models/outpoint.ts:4](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/outpoint.ts#L4)

## Methods

### toBEBinary()

> **toBEBinary**(): `number`[]

#### Returns

`number`[]

#### Defined in

[models/outpoint.ts:43](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/outpoint.ts#L43)

***

### toBinary()

> **toBinary**(): `number`[]

#### Returns

`number`[]

#### Defined in

[models/outpoint.ts:36](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/outpoint.ts#L36)

***

### toJSON()

> **toJSON**(): `string`

#### Returns

`string`

#### Defined in

[models/outpoint.ts:50](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/outpoint.ts#L50)

***

### toString()

> **toString**(): `string`

#### Returns

`string`

#### Defined in

[models/outpoint.ts:32](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/outpoint.ts#L32)
