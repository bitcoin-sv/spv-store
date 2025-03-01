[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / IndexContext

# Interface: IndexContext

Represents the context of an index operation.

 IndexContext

## Properties

### block

> **block**: [`Block`](../classes/Block.md)

The block containing the transaction.

#### Defined in

[models/index-context.ts:62](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/index-context.ts#L62)

***

### spends

> **spends**: [`Txo`](../classes/Txo.md)[]

The spent transaction outputs (inputs).

#### Defined in

[models/index-context.ts:63](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/index-context.ts#L63)

***

### store

> **store**: [`TxoStore`](../classes/TxoStore.md)

#### Defined in

[models/index-context.ts:66](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/index-context.ts#L66)

***

### summary

> **summary**: `object`

The summary of the transaction after indexing.

#### Index Signature

 \[`tag`: `string`\]: [`IndexSummary`](../type-aliases/IndexSummary.md)

#### Defined in

[models/index-context.ts:65](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/index-context.ts#L65)

***

### tx

> **tx**: `Transaction`

The transaction being indexed.

#### Defined in

[models/index-context.ts:60](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/index-context.ts#L60)

***

### txid

> **txid**: `string`

The unique identifier of the transaction.

#### Defined in

[models/index-context.ts:61](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/index-context.ts#L61)

***

### txos

> **txos**: [`Txo`](../classes/Txo.md)[]

The transaction outputs.

#### Defined in

[models/index-context.ts:64](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/index-context.ts#L64)
