[**spv-store v0.1.44**](../README.md) • **Docs**

***

[spv-store v0.1.44](../globals.md) / ParseMode

# Enumeration: ParseMode

Enum representing the different modes of indexing.

## Enumeration Members

### Deep

> **Deep**: `3`

Process source transaction tree

#### Defined in

[models/indexer.ts:21](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/indexer.ts#L21)

***

### Dependency

> **Dependency**: `1`

Parse as dependency.

#### Defined in

[models/indexer.ts:17](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/indexer.ts#L17)

***

### Persist

> **Persist**: `2`

Parse and queue all dependencies for ingestion.

#### Defined in

[models/indexer.ts:19](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/indexer.ts#L19)

***

### Preview

> **Preview**: `0`

Parse for preview. Do not load dependencies.

#### Defined in

[models/indexer.ts:15](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/models/indexer.ts#L15)
