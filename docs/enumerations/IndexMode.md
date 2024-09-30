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

[models/indexer.ts:14](https://github.com/shruggr/ts-casemod-spv/blob/dc142b85a7bc32ae7c572ff1fa62fa3ec80b91ea/src/models/indexer.ts#L14)

***

### TrustAndVerify

> **TrustAndVerify**: `3`

Initially rely on an external indexer, but also load and verify all data locally. This will allow P2P transactions with other parties using VERIFY mode.

#### Defined in

[models/indexer.ts:18](https://github.com/shruggr/ts-casemod-spv/blob/dc142b85a7bc32ae7c572ff1fa62fa3ec80b91ea/src/models/indexer.ts#L18)

***

### Verify

> **Verify**: `2`

Verify all data locally. This requires all dependent data to be indexed as well.

#### Defined in

[models/indexer.ts:16](https://github.com/shruggr/ts-casemod-spv/blob/dc142b85a7bc32ae7c572ff1fa62fa3ec80b91ea/src/models/indexer.ts#L16)
