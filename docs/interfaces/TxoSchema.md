[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / TxoSchema

# Interface: TxoSchema

## Extends

- `DBSchema`

## Properties

### ingestQueue

> **ingestQueue**: `object`

#### indexes

> **indexes**: `object`

#### indexes.status

> **status**: [`number`, `number`, `number`]

#### key

> **key**: `string`

#### value

> **value**: [`Ingest`](Ingest.md)

#### Defined in

[storage/idb/idb-txos.ts:24](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/storage/idb/idb-txos.ts#L24)

***

### state

> **state**: `object`

#### key

> **key**: `string`

#### value

> **value**: `object`

#### value.key

> **key**: `string`

#### value.value

> **value**: `string`

#### Defined in

[storage/idb/idb-txos.ts:38](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/storage/idb/idb-txos.ts#L38)

***

### txLog

> **txLog**: `object`

#### indexes

> **indexes**: `object`

#### indexes.height

> **height**: [`number`, `number`]

#### key

> **key**: `string`

#### value

> **value**: [`TxLog`](../classes/TxLog.md)

#### Defined in

[storage/idb/idb-txos.ts:31](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/storage/idb/idb-txos.ts#L31)

***

### txos

> **txos**: `object`

#### indexes

> **indexes**: `object`

#### indexes.deps

> **deps**: `string`

#### indexes.events

> **events**: `string`

#### indexes.spend

> **spend**: [`string`, `number`]

#### indexes.tags

> **tags**: `string`

#### key

> **key**: [`string`, `number`]

#### value

> **value**: [`Txo`](../classes/Txo.md)

#### Defined in

[storage/idb/idb-txos.ts:14](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/storage/idb/idb-txos.ts#L14)
