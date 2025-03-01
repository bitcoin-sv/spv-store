[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / ParseMode

# Enumeration: ParseMode

Enum representing the different modes of indexing.

## Enumeration Members

### Dependency

> **Dependency**: `1`

Parse as dependency. Supress events.

#### Defined in

[models/indexer.ts:29](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L29)

***

### OutputsOnly

> **OutputsOnly**: `-1`

Parse outputs only.

#### Defined in

[models/indexer.ts:25](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L25)

***

### Persist

> **Persist**: `2`

Parse and queue all dependencies for ingestion.

#### Defined in

[models/indexer.ts:31](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L31)

***

### PersistSummary

> **PersistSummary**: `3`

Process source transaction tree

#### Defined in

[models/indexer.ts:33](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L33)

***

### Preview

> **Preview**: `0`

Parse for preview. Do not save.

#### Defined in

[models/indexer.ts:27](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L27)
