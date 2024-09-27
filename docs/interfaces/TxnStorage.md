[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / TxnStorage

# Interface: TxnStorage

## Methods

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/txn-storage.ts:4](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/txn-storage.ts#L4)

***

### exists()

> **exists**(`txids`): `Promise`\<`boolean`[]\>

#### Parameters

• **txids**: `string`[]

#### Returns

`Promise`\<`boolean`[]\>

#### Defined in

[storage/txn-storage.ts:11](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/txn-storage.ts#L11)

***

### get()

> **get**(`txid`): `Promise`\<`undefined` \| [`Txn`](Txn.md)\>

#### Parameters

• **txid**: `string`

#### Returns

`Promise`\<`undefined` \| [`Txn`](Txn.md)\>

#### Defined in

[storage/txn-storage.ts:5](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/txn-storage.ts#L5)

***

### getByStatus()

> **getByStatus**(`status`, `toBlock`, `limit`): `Promise`\<[`Txn`](Txn.md)[]\>

#### Parameters

• **status**: [`TxnStatus`](../enumerations/TxnStatus.md)

• **toBlock**: `number`

• **limit**: `number`

#### Returns

`Promise`\<[`Txn`](Txn.md)[]\>

#### Defined in

[storage/txn-storage.ts:8](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/txn-storage.ts#L8)

***

### getMany()

> **getMany**(`txids`): `Promise`\<(`undefined` \| [`Txn`](Txn.md))[]\>

#### Parameters

• **txids**: `string`[]

#### Returns

`Promise`\<(`undefined` \| [`Txn`](Txn.md))[]\>

#### Defined in

[storage/txn-storage.ts:6](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/txn-storage.ts#L6)

***

### put()

> **put**(`txn`): `Promise`\<`void`\>

#### Parameters

• **txn**: [`Txn`](Txn.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/txn-storage.ts:9](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/txn-storage.ts#L9)

***

### putMany()

> **putMany**(`txns`): `Promise`\<`void`\>

#### Parameters

• **txns**: [`Txn`](Txn.md)[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[storage/txn-storage.ts:10](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/storage/txn-storage.ts#L10)
