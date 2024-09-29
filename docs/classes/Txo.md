[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / Txo

# Class: Txo

## Constructors

### new Txo()

> **new Txo**(`outpoint`, `satoshis`, `script`, `status`, `block`): [`Txo`](Txo.md)

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

• **satoshis**: `bigint`

• **script**: `number`[]

• **status**: [`TxoStatus`](../enumerations/TxoStatus.md)

• **block**: [`Block`](Block.md) = `...`

#### Returns

[`Txo`](Txo.md)

#### Defined in

[models/txo.ts:21](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/models/txo.ts#L21)

## Properties

### block

> **block**: [`Block`](Block.md)

#### Defined in

[models/txo.ts:26](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/models/txo.ts#L26)

***

### data

> **data**: `object` = `{}`

#### Index Signature

 \[`tag`: `string`\]: [`IndexData`](IndexData.md)

#### Defined in

[models/txo.ts:14](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/models/txo.ts#L14)

***

### deps

> **deps**: `string`[] = `[]`

#### Defined in

[models/txo.ts:18](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/models/txo.ts#L18)

***

### events

> **events**: `string`[] = `[]`

#### Defined in

[models/txo.ts:16](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/models/txo.ts#L16)

***

### hasEvents

> **hasEvents**: `number` = `0`

#### Defined in

[models/txo.ts:19](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/models/txo.ts#L19)

***

### outpoint

> **outpoint**: [`Outpoint`](Outpoint.md)

#### Defined in

[models/txo.ts:22](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/models/txo.ts#L22)

***

### owner?

> `optional` **owner**: `string`

#### Defined in

[models/txo.ts:15](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/models/txo.ts#L15)

***

### satoshis

> **satoshis**: `bigint`

#### Defined in

[models/txo.ts:23](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/models/txo.ts#L23)

***

### script

> **script**: `number`[]

#### Defined in

[models/txo.ts:24](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/models/txo.ts#L24)

***

### spend

> **spend**: `string` = `''`

#### Defined in

[models/txo.ts:13](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/models/txo.ts#L13)

***

### status

> **status**: [`TxoStatus`](../enumerations/TxoStatus.md)

#### Defined in

[models/txo.ts:25](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/models/txo.ts#L25)

***

### tags

> **tags**: `string`[] = `[]`

#### Defined in

[models/txo.ts:17](https://github.com/shruggr/ts-casemod-spv/blob/02da5207bded388f76e8bebbed39ca525a18e420/src/models/txo.ts#L17)
