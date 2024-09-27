**spv-store v0.0.1** • [**Docs**](globals.md)

***

# SPV-Store

**SPV-Store** is a modular engine to used to locally store and index Bitcoin transaction history with pluggable support for custom indexers, persistance layers, and API providers.

## Indexers
Indexers parse transactions and identify if a transaction output fits a specified set of rules. If a match is identified, the indexer can extract pertinant data from the transaction and save that data in a fashion where it can be retrieved and searched.

## Txos
The fundimental building blocks of a Bitcoin transactions are transaction outputs (Txos). At the lowest level, transaction outputs contain some amount of bitcoin, and the rules by which those bitcoins can be spent. Outputs of one transaction are t

## Owner

## Persistance

## APIs
