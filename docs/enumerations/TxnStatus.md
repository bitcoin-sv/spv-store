[**spv-store v0.1.24**](../README.md) • **Docs**

***

[spv-store v0.1.24](../globals.md) / TxnStatus

# Enumeration: TxnStatus

Enum representing the various statuses a transaction can have.

## Enumeration Members

### BROADCASTED

> **BROADCASTED**: `1`

The transaction has been broadcasted to the network.

#### Defined in

[stores/txn-store.ts:44](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/stores/txn-store.ts#L44)

***

### CONFIRMED

> **CONFIRMED**: `2`

The transaction has been confirmed by the network, but could still be re-orged

#### Defined in

[stores/txn-store.ts:45](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/stores/txn-store.ts#L45)

***

### IMMUTABLE

> **IMMUTABLE**: `3`

The transaction is 6 blocks deep and is considered immutable.

#### Defined in

[stores/txn-store.ts:46](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/stores/txn-store.ts#L46)

***

### PENDING

> **PENDING**: `0`

The transaction is pending and awaiting further action.

#### Defined in

[stores/txn-store.ts:43](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/stores/txn-store.ts#L43)

***

### REJECTED

> **REJECTED**: `-1`

The transaction has been rejected.

#### Defined in

[stores/txn-store.ts:42](https://github.com/bitcoin-sv/spv-store/blob/03686d41c08cfcf21568a9b1fd3404a8ac07fb36/src/stores/txn-store.ts#L42)
