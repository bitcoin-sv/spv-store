[**spv-store v0.1.23**](../README.md) • **Docs**

***

[spv-store v0.1.23](../globals.md) / ParseMode

# Enumeration: ParseMode

Enum representing the different modes of indexing.

## Enumeration Members

### Deep

> **Deep**: `3`

Process source transaction tree

#### Defined in

[models/indexer.ts:20](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/indexer.ts#L20)

***

### Dependency

> **Dependency**: `1`

Parse as dependency.

#### Defined in

[models/indexer.ts:16](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/indexer.ts#L16)

***

### Persist

> **Persist**: `2`

Parse and queue all dependencies for ingestion.

#### Defined in

[models/indexer.ts:18](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/indexer.ts#L18)

***

### Preview

> **Preview**: `0`

Parse for preview. Do not load dependencies.

#### Defined in

[models/indexer.ts:14](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/indexer.ts#L14)
