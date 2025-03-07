import type { Event } from "./event";
import type { Outpoint } from "./outpoint";

/**
 * Represents the data structure used by the indexer to store parsed data,
 * emitted events, and dependencies.
 */
export interface IndexData {
  data?: any;
  events?: Event[];
  deps?: Outpoint[];
}
