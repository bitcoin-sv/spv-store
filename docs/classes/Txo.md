[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / Txo

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

[models/txo.ts:75](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/txo.ts#L75)

## Properties

### block

> **block**: [`Block`](Block.md)

The block containing the transaction output.

#### Defined in

[models/txo.ts:80](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/txo.ts#L80)

***

### data

> **data**: `object` = `{}`

A dictionary containing index data associated with each indexer tag.

#### Index Signature

 \[`tag`: `string`\]: [`IndexData`](../interfaces/IndexData.md)

#### Defined in

[models/txo.ts:33](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/txo.ts#L33)

***

### deps

> **deps**: `string`[] = `[]`

A list of dependencies associated with the transaction output.

#### Defined in

[models/txo.ts:60](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/txo.ts#L60)

***

### events

> **events**: `string`[] = `[]`

A list of events associated with the transaction output.

#### Defined in

[models/txo.ts:45](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/txo.ts#L45)

***

### hasEvents

> **hasEvents**: `number` = `0`

A flag indicating whether the transaction output has events.

#### Defined in

[models/txo.ts:65](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/txo.ts#L65)

***

### logs

> **logs**: `string`[] = `[]`

A list of events associated with the transaction output.

#### Defined in

[models/txo.ts:50](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/txo.ts#L50)

***

### outpoint

> **outpoint**: [`Outpoint`](Outpoint.md)

The outpoint of the transaction output.

#### Defined in

[models/txo.ts:76](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/txo.ts#L76)

***

### owner?

> `optional` **owner**: `string`

The owner of the transaction output. 
This is typically and address, but can be populated with any string. 
An indexer should not overwrite this field if it is already populated.

#### Defined in

[models/txo.ts:40](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/txo.ts#L40)

***

### satoshis

> **satoshis**: `bigint`

The amount of satoshis in the transaction output.

#### Defined in

[models/txo.ts:77](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/txo.ts#L77)

***

### script

> **script**: `number`[]

The script associated with the transaction output.

#### Defined in

[models/txo.ts:78](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/txo.ts#L78)

***

### spend

> **spend**: `string` = `''`

The txid in which the output was spent, or and empty string if unspent.

#### Defined in

[models/txo.ts:28](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/txo.ts#L28)

***

### status

> **status**: [`TxoStatus`](../enumerations/TxoStatus.md)

The status of the transaction output.

#### Defined in

[models/txo.ts:79](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/txo.ts#L79)

***

### tags

> **tags**: `string`[] = `[]`

A list of tags associated with the transaction output.

#### Defined in

[models/txo.ts:55](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/txo.ts#L55)
