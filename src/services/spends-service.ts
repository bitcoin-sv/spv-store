import type { Outpoint } from "../models/outpoint";

export interface SpendsService {
  getSpend(outpoint: Outpoint): Promise<string | undefined>;
  getSpends(outpoints: Outpoint[]): Promise<(string | undefined)[]>;
}
