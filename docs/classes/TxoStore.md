[**spv-store v0.0.1**](../README.md) • **Docs**

***

[spv-store v0.0.1](../globals.md) / TxoStore

# Class: TxoStore

## Constructors

### new TxoStore()

> **new TxoStore**(`storage`, `services`, `stores`, `indexers`, `owners`, `events`?): [`TxoStore`](TxoStore.md)

#### Parameters

• **storage**: [`TxoStorage`](../interfaces/TxoStorage.md)

• **services**: [`Services`](../interfaces/Services.md)

• **stores**: [`Stores`](../interfaces/Stores.md)

• **indexers**: [`Indexer`](Indexer.md)[]

• **owners**: `Set`\<`string`\>

• **events?**: `EventEmitter`

#### Returns

[`TxoStore`](TxoStore.md)

#### Defined in

[stores/txo-store.ts:17](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L17)

## Properties

### events?

> `optional` **events**: `EventEmitter`

#### Defined in

[stores/txo-store.ts:23](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L23)

***

### indexers

> **indexers**: [`Indexer`](Indexer.md)[]

#### Defined in

[stores/txo-store.ts:21](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L21)

***

### owners

> **owners**: `Set`\<`string`\>

#### Defined in

[stores/txo-store.ts:22](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L22)

***

### services

> **services**: [`Services`](../interfaces/Services.md)

#### Defined in

[stores/txo-store.ts:19](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L19)

***

### storage

> **storage**: [`TxoStorage`](../interfaces/TxoStorage.md)

#### Defined in

[stores/txo-store.ts:18](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L18)

***

### stores

> **stores**: [`Stores`](../interfaces/Stores.md)

#### Defined in

[stores/txo-store.ts:20](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L20)

## Methods

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:26](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L26)

***

### ingest()

> **ingest**(`tx`, `source`, `fromRemote`, `isDep`, `ingestParents`, `outputs`?): `Promise`\<[`IndexContext`](IndexContext.md)\>

#### Parameters

• **tx**: `Transaction`

• **source**: `string` = `""`

• **fromRemote**: `boolean` = `false`

• **isDep**: `boolean` = `false`

• **ingestParents**: `boolean` = `true`

• **outputs?**: `number`[]

#### Returns

`Promise`\<[`IndexContext`](IndexContext.md)\>

#### Defined in

[stores/txo-store.ts:127](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L127)

***

### parse()

> **parse**(`tx`, `previewOnly`, `outputs`?, `fromRemote`?, `resolveInputs`?): `Promise`\<[`IndexContext`](IndexContext.md)\>

#### Parameters

• **tx**: `Transaction`

• **previewOnly**: `boolean` = `true`

• **outputs?**: `number`[]

• **fromRemote?**: `boolean` = `false`

• **resolveInputs?**: `boolean` = `false`

#### Returns

`Promise`\<[`IndexContext`](IndexContext.md)\>

#### Defined in

[stores/txo-store.ts:41](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L41)

***

### processConfirms()

> **processConfirms**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:269](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L269)

***

### processDownloads()

> **processDownloads**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:201](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L201)

***

### processImmutable()

> **processImmutable**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:307](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L307)

***

### processIngests()

> **processIngests**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:237](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L237)

***

### processQueue()

> **processQueue**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:190](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L190)

***

### queue()

> **queue**(`ingests`): `Promise`\<`void`\>

#### Parameters

• **ingests**: [`Ingest`](../interfaces/Ingest.md)[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:185](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L185)

***

### search()

> **search**(`lookup`, `sort`, `limit`, `from`?): `Promise`\<[`TxoResults`](../interfaces/TxoResults.md)\>

#### Parameters

• **lookup**: [`TxoLookup`](TxoLookup.md)

• **sort**: [`TxoSort`](../enumerations/TxoSort.md) = `TxoSort.DESC`

• **limit**: `number` = `100`

• **from?**: `string`

#### Returns

`Promise`\<[`TxoResults`](../interfaces/TxoResults.md)\>

#### Defined in

[stores/txo-store.ts:32](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L32)

***

### syncTxLogs()

> **syncTxLogs**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:349](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L349)

***

### updateQueueStats()

> **updateQueueStats**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[stores/txo-store.ts:181](https://github.com/shruggr/ts-casemod-spv/blob/d2d8e139fbd295fc0999df738863fea71ede7818/src/stores/txo-store.ts#L181)
