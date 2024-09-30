import type { Event } from "./event";
import type { Outpoint } from "./outpoint";

/**
 * Represents the data structure used by the indexer to store parsed data,
 * emitted events, and dependencies.
 */
export class IndexData {
  /**
   * Creates an instance of IndexData.
   * 
   * @param data - An arbitrary data object to be used by the indexer to store parsed data.
   * @param events - An array of events emitted by the indexer in regard to the output. Events can be searched.
   * @param deps - An array of outpoints that this output depends on.
   */
  constructor(
    public data?: any, public events: Event[] = [], public deps: Outpoint[] = [],) { }
}
