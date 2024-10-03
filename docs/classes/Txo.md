[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / Txo

# Class: Txo

Represents a transaction output (Txo).

## Constructors

### new Txo()

> **new Txo**(`outpoint`, `satoshis`, `script`, `status`, `block`): [`Txo`](Txo.md)

Creates an instance of Txo.

#### Parameters

• **outpoint**: [`Outpoint`](Outpoint.md)

The outpoint of the transaction output.

• **satoshis**: `bigint`

The amount of satoshis in the transaction output.

• **script**: `number`[]

The script associated with the transaction output.

• **status**: [`TxoStatus`](../enumerations/TxoStatus.md)

The status of the transaction output.

• **block**: [`Block`](Block.md) = `...`

The block containing the transaction output.

#### Returns

[`Txo`](Txo.md)

#### Defined in

[models/txo.ts:70](https://github.com/shruggr/ts-casemod-spv/blob/050b8a2b88441deb8165e8e49b26bc7bba8ae64e/src/models/txo.ts#L70)

## Properties

### block

> **block**: [`Block`](Block.md)

The block containing the transaction output.

#### Defined in

[models/txo.ts:75](https://github.com/shruggr/ts-casemod-spv/blob/050b8a2b88441deb8165e8e49b26bc7bba8ae64e/src/models/txo.ts#L75)

***

### data

> **data**: `object` = `{}`

A dictionary containing index data associated with each indexer tag.

#### Index Signature

 \[`tag`: `string`\]: [`IndexData`](IndexData.md)

#### Defined in

[models/txo.ts:33](https://github.com/shruggr/ts-casemod-spv/blob/050b8a2b88441deb8165e8e49b26bc7bba8ae64e/src/models/txo.ts#L33)

***

### deps

> **deps**: `string`[] = `[]`

A list of dependencies associated with the transaction output.

#### Defined in

[models/txo.ts:55](https://github.com/shruggr/ts-casemod-spv/blob/050b8a2b88441deb8165e8e49b26bc7bba8ae64e/src/models/txo.ts#L55)

***

### events

> **events**: `string`[] = `[]`

A list of events associated with the transaction output.

#### Defined in

[models/txo.ts:45](https://github.com/shruggr/ts-casemod-spv/blob/050b8a2b88441deb8165e8e49b26bc7bba8ae64e/src/models/txo.ts#L45)

***

### hasEvents

> **hasEvents**: `number` = `0`

A flag indicating whether the transaction output has events.

#### Defined in

[models/txo.ts:60](https://github.com/shruggr/ts-casemod-spv/blob/050b8a2b88441deb8165e8e49b26bc7bba8ae64e/src/models/txo.ts#L60)

***

### outpoint

> **outpoint**: [`Outpoint`](Outpoint.md)

The outpoint of the transaction output.

#### Defined in

[models/txo.ts:71](https://github.com/shruggr/ts-casemod-spv/blob/050b8a2b88441deb8165e8e49b26bc7bba8ae64e/src/models/txo.ts#L71)

***

### owner?

> `optional` **owner**: `string`

The owner of the transaction output. 
This is typically and address, but can be populated with any string. 
An indexer should not overwrite this field if it is already populated.

#### Defined in

[models/txo.ts:40](https://github.com/shruggr/ts-casemod-spv/blob/050b8a2b88441deb8165e8e49b26bc7bba8ae64e/src/models/txo.ts#L40)

***

### satoshis

> **satoshis**: `bigint`

The amount of satoshis in the transaction output.

#### Defined in

[models/txo.ts:72](https://github.com/shruggr/ts-casemod-spv/blob/050b8a2b88441deb8165e8e49b26bc7bba8ae64e/src/models/txo.ts#L72)

***

### script

> **script**: `number`[]

The script associated with the transaction output.

#### Defined in

[models/txo.ts:73](https://github.com/shruggr/ts-casemod-spv/blob/050b8a2b88441deb8165e8e49b26bc7bba8ae64e/src/models/txo.ts#L73)

***

### spend

> **spend**: `string` = `''`

The txid in which the output was spent, or and empty string if unspent.

#### Defined in

[models/txo.ts:28](https://github.com/shruggr/ts-casemod-spv/blob/050b8a2b88441deb8165e8e49b26bc7bba8ae64e/src/models/txo.ts#L28)

***

### status

> **status**: [`TxoStatus`](../enumerations/TxoStatus.md)

The status of the transaction output.

#### Defined in

[models/txo.ts:74](https://github.com/shruggr/ts-casemod-spv/blob/050b8a2b88441deb8165e8e49b26bc7bba8ae64e/src/models/txo.ts#L74)

***

### tags

> **tags**: `string`[] = `[]`

A list of tags associated with the transaction output.

#### Defined in

[models/txo.ts:50](https://github.com/shruggr/ts-casemod-spv/blob/050b8a2b88441deb8165e8e49b26bc7bba8ae64e/src/models/txo.ts#L50)
