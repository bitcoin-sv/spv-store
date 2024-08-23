import type { Event } from "./event";
import type { Outpoint } from "./outpoint";

export class IndexData {
  tag?: string;

  constructor(
    public data?: any,
    public events: Event[] = [],
    public deps: Outpoint[] = [],
  ) { }
}
