[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / ParseMode

# Enumeration: ParseMode

Enum representing the different modes of indexing.

## Enumeration Members

### Dependency

> **Dependency**: `1`

Parse as dependency.

#### Defined in

[models/indexer.ts:16](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/models/indexer.ts#L16)

***

### Persist

> **Persist**: `2`

Parse and queue all dependencies for ingestion.

#### Defined in

[models/indexer.ts:18](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/models/indexer.ts#L18)

***

### Preview

> **Preview**: `0`

Parse for preview. Do not load dependencies.

#### Defined in

[models/indexer.ts:14](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/models/indexer.ts#L14)