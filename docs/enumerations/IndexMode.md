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

[models/indexer.ts:14](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/models/indexer.ts#L14)

***

### TrustAndVerify

> **TrustAndVerify**: `3`

Initially rely on an external indexer, but also load and verify all data locally. This will allow P2P transactions with other parties using VERIFY mode.

#### Defined in

[models/indexer.ts:18](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/models/indexer.ts#L18)

***

### Verify

> **Verify**: `2`

Verify all data locally. This requires all dependent data to be indexed as well.

#### Defined in

[models/indexer.ts:16](https://github.com/shruggr/ts-casemod-spv/blob/68dc275688b04f6a33c5c6063e9fd70d6c8a63ef/src/models/indexer.ts#L16)
