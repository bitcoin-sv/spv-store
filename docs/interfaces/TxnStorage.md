[**spv-store v0.1.73**](../README.md) • **Docs**

***

[spv-store v0.1.73](../globals.md) / TxnStorage

# Interface: TxnStorage

Interface representing a transaction storage system.

## Methods

### destroy()

> **destroy**(): `Promise`\<`void`\>

Destroys the storage instance, releasing any resources held.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the storage is destroyed.

#### Defined in

[storage/txn-storage.ts:11](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/txn-storage.ts#L11)

***

### exists()

> **exists**(`txids`): `Promise`\<`boolean`[]\>

Checks if transactions exist by their IDs.

#### Parameters

• **txids**: `string`[]

An array of transaction IDs to check.

#### Returns

`Promise`\<`boolean`[]\>

A promise that resolves to an array of booleans indicating the existence of each transaction.

#### Defined in

[storage/txn-storage.ts:53](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/txn-storage.ts#L53)

***

### get()

> **get**(`txid`): `Promise`\<`undefined` \| [`Txn`](Txn.md)\>

Retrieves a transaction by its ID.

#### Parameters

• **txid**: `string`

The ID of the transaction to retrieve.

#### Returns

`Promise`\<`undefined` \| [`Txn`](Txn.md)\>

A promise that resolves to the transaction if found, or undefined if not found.

#### Defined in

[storage/txn-storage.ts:18](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/txn-storage.ts#L18)

***

### getByStatus()

> **getByStatus**(`status`, `toBlock`, `limit`): `Promise`\<[`Txn`](Txn.md)[]\>

Retrieves transactions by their status up to a specified block number, with an optional limit on the number of transactions.

#### Parameters

• **status**: [`TxnStatus`](../enumerations/TxnStatus.md)

The status of the transactions to retrieve.

• **toBlock**: `number`

The block number up to which to retrieve transactions.

• **limit**: `number`

The maximum number of transactions to retrieve.

#### Returns

`Promise`\<[`Txn`](Txn.md)[]\>

A promise that resolves to an array of transactions matching the criteria.

#### Defined in

[storage/txn-storage.ts:34](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/txn-storage.ts#L34)

***

### getMany()

> **getMany**(`txids`): `Promise`\<(`undefined` \| [`Txn`](Txn.md))[]\>

Retrieves multiple transactions by their IDs.

#### Parameters

• **txids**: `string`[]

An array of transaction IDs to retrieve.

#### Returns

`Promise`\<(`undefined` \| [`Txn`](Txn.md))[]\>

A promise that resolves to an array of transactions, with undefined for any transactions not found.

#### Defined in

[storage/txn-storage.ts:25](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/txn-storage.ts#L25)

***

### put()

> **put**(`txn`): `Promise`\<`void`\>

Stores a transaction.

#### Parameters

• **txn**: [`Txn`](Txn.md)

The transaction to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the transaction is stored.

#### Defined in

[storage/txn-storage.ts:41](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/txn-storage.ts#L41)

***

### putMany()

> **putMany**(`txns`): `Promise`\<`void`\>

Stores multiple transactions.   *

#### Parameters

• **txns**: [`Txn`](Txn.md)[]

An array of transactions to store.

#### Returns

`Promise`\<`void`\>

A promise that resolves when all transactions are stored.

#### Defined in

[storage/txn-storage.ts:46](https://github.com/bitcoin-sv/spv-store/blob/9735342843cd2ea4b04983988f1fa98b59c98947/src/storage/txn-storage.ts#L46)
