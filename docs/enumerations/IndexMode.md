[**spv-store v0.1.23**](../README.md) • **Docs**

***

[spv-store v0.1.23](../globals.md) / IndexMode

# Enumeration: IndexMode

Enum representing the different modes of indexing.

## Enumeration Members

### Trust

> **Trust**: `1`

Rely on an external indexer.

#### Defined in

[models/indexer.ts:30](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/indexer.ts#L30)

***

### TrustAndVerify

> **TrustAndVerify**: `3`

Initially rely on an external indexer, but also load and verify all data locally. This will allow P2P transactions with other parties using VERIFY mode.

#### Defined in

[models/indexer.ts:34](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/indexer.ts#L34)

***

### Verify

> **Verify**: `2`

Verify all data locally. This requires all dependent data to be indexed as well.

#### Defined in

[models/indexer.ts:32](https://github.com/bitcoin-sv/spv-store/blob/63abe80bc44b9b9c7e00ccf1d6227aea5ee85646/src/models/indexer.ts#L32)
