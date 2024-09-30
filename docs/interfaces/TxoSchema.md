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

[storage/idb/idb-txos.ts:23](https://github.com/shruggr/ts-casemod-spv/blob/dc142b85a7bc32ae7c572ff1fa62fa3ec80b91ea/src/storage/idb/idb-txos.ts#L23)

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

[storage/idb/idb-txos.ts:37](https://github.com/shruggr/ts-casemod-spv/blob/dc142b85a7bc32ae7c572ff1fa62fa3ec80b91ea/src/storage/idb/idb-txos.ts#L37)

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

[storage/idb/idb-txos.ts:30](https://github.com/shruggr/ts-casemod-spv/blob/dc142b85a7bc32ae7c572ff1fa62fa3ec80b91ea/src/storage/idb/idb-txos.ts#L30)

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

[storage/idb/idb-txos.ts:13](https://github.com/shruggr/ts-casemod-spv/blob/dc142b85a7bc32ae7c572ff1fa62fa3ec80b91ea/src/storage/idb/idb-txos.ts#L13)
