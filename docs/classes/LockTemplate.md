[**spv-store v0.1.44**](../README.md) • **Docs**

***

[spv-store v0.1.44](../globals.md) / LockTemplate

# Class: LockTemplate

OrdLock class implementing ScriptTemplate.

This class provides methods for interacting with OrdinalLock contract

## Constructors

### new LockTemplate()

> **new LockTemplate**(): [`LockTemplate`](LockTemplate.md)

#### Returns

[`LockTemplate`](LockTemplate.md)

## Methods

### lock()

> **lock**(`address`, `until`): `Script`

Creates a Lock script

#### Parameters

• **address**: `string`

• **until**: `number`

Block height when unlockable

#### Returns

`Script`

- A P2PKH locking script.

#### Defined in

[templates/lock.ts:30](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/templates/lock.ts#L30)

***

### unlock()

> **unlock**(`privateKey`, `signOutputs`, `anyoneCanPay`, `sourceSatoshis`?, `lockingScript`?): `object`

#### Parameters

• **privateKey**: `PrivateKey`

• **signOutputs**: `"all"` \| `"none"` \| `"single"` = `"all"`

• **anyoneCanPay**: `boolean` = `false`

• **sourceSatoshis?**: `number`

• **lockingScript?**: `Script`

#### Returns

`object`

##### estimateLength()

> **estimateLength**: (`tx`, `inputIndex`) => `Promise`\<`number`\>

###### Parameters

• **tx**: `Transaction`

• **inputIndex**: `number`

###### Returns

`Promise`\<`number`\>

##### sign()

> **sign**: (`tx`, `inputIndex`) => `Promise`\<`UnlockingScript`\>

###### Parameters

• **tx**: `Transaction`

• **inputIndex**: `number`

###### Returns

`Promise`\<`UnlockingScript`\>

#### Defined in

[templates/lock.ts:40](https://github.com/bitcoin-sv/spv-store/blob/e3a78734f6050d5b58a2dfc50b2ef9975d4564de/src/templates/lock.ts#L40)
