**spv-store v0.1.23** • [**Docs**](globals.md)

***

# SPV-Store

**SPV-Store** is a modular engine to used to locally store and index Bitcoin transaction history with pluggable support for custom indexers, persistance layers, and API providers.

## Usage

### Install
`npm install spv-store`

### Instantiate
Initialize for use in web browser with OneSat API provider
```
import {
    Bsv21Indexer,
    FundIndexer,
    Indexer,
    IndexMode,
    InscriptionIndexer,
    LockIndexer,
    MapIndexer,
    OneSatWebSPV,
    OrdLockIndexer,
    OriginIndexer,
} from 'spv-store';

const owners = new Set<string>([bsvAddress, identityAddress, ordAddress, /*...other owners */]);

const indexers: Indexer[] = [
    new FundIndexer(owners, IndexMode.TrustAndVerify),
    new LockIndexer(owners, IndexMode.TrustAndVerify),
    new OrdLockIndexer(owners, IndexMode.TrustAndVerify),
    new InscriptionIndexer(owners, IndexMode.TrustAndVerify),
    new MapIndexer(owners, IndexMode.Verify),
    new OriginIndexer(owners, IndexMode.TrustAndVerify),
    new Bsv21Indexer(owners, IndexMode.Trust),
];
const startSync = true
const oneSatSPV = await OneSatWebSPV.init(
    'accountId',
    indexers,
    owners,
    startSync,
);
```

### Broadcast
```
const tx = Transaction.fromHex('010000....')
const txResponse = await oneSatSPV.broadcast(tx)
```

### Search UTXOs
```
// funding utxos
const fundResults = await oneSatSPV.search(new TxoLookup('fund'));

// lock utxo
const lockTxos = await oneSatSPV.search(new TxoLookup('lock'));

// load all jpeg inscriptions
const ordinals = await oneSatSPV.search(new TxoLookup('origin', 'type', 'image/jpeg'), TxoSort.DESC, 0);

```

## Extensibility
### Indexers
Indexers parse transactions and identify if a transaction output fits a specified set of rules. If a match is identified, the indexer can extract pertinant data from the transaction and save that data in a fashion where it can be retrieved and searched.
- [Indexer](./src/indexers/indexer.ts)

### Storage
- [Block Storage](_media/block-storage.ts)
- [Transaction Storage](_media/txn-storage.ts)
- [Txo Storage](_media/txo-storage.ts)

### Services
- [Block Service](_media/block-service.ts)
- [Broadcast Service](_media/broadcast-service.ts)
- [Inventory Service](./src/services/inv-service.ts)
- [Transaction Service](_media/txn-service.ts)
