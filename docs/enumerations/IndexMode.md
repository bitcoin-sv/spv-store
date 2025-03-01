[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / IndexMode

# Enumeration: IndexMode

Enum representing the different modes of indexing.

## Enumeration Members

### Trust

> **Trust**: `1`

Rely on an external indexer.

#### Defined in

[models/indexer.ts:44](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L44)

***

### TrustAndVerify

> **TrustAndVerify**: `3`

Initially rely on an external indexer, but also load and verify all data locally. This will allow P2P transactions with other parties using VERIFY mode.

#### Defined in

[models/indexer.ts:48](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L48)

***

### Verify

> **Verify**: `2`

Verify all data locally. This requires all dependent data to be indexed as well.

#### Defined in

[models/indexer.ts:46](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/models/indexer.ts#L46)
