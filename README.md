# SPV-Store

**SPV-Store** is a modular engine to used to locally store and index Bitcoin transaction history with pluggable support for custom indexers, persistance layers, and API providers.

## Usage

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

## Indexers
Indexers parse transactions and identify if a transaction output fits a specified set of rules. If a match is identified, the indexer can extract pertinant data from the transaction and save that data in a fashion where it can be retrieved and searched.
[indexers/index.ts](./src/indexers/index.ts)

## Storage
[storage/index.ts](./src/storage/index.ts)

## Services
[services/index.ts](./src/services/index.ts)