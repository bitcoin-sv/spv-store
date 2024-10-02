[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / IndexMode

# Enumeration: IndexMode

Enum representing the different modes of indexing.

## Enumeration Members

### Trust

> **Trust**: `1`

Rely on an external indexer.

#### Defined in

[models/indexer.ts:28](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/models/indexer.ts#L28)

***

### TrustAndVerify

> **TrustAndVerify**: `3`

Initially rely on an external indexer, but also load and verify all data locally. This will allow P2P transactions with other parties using VERIFY mode.

#### Defined in

[models/indexer.ts:32](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/models/indexer.ts#L32)

***

### Verify

> **Verify**: `2`

Verify all data locally. This requires all dependent data to be indexed as well.

#### Defined in

[models/indexer.ts:30](https://github.com/shruggr/ts-casemod-spv/blob/eb07ea1ffa104a076983597e54d842fffa22bae3/src/models/indexer.ts#L30)
