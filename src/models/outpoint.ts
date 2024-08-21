import { Utils } from "@bsv/sdk";
export class Outpoint {
  txid: string;
  vout: number;

  constructor(txidOrOutpoint: string | number[], vout?: number) {
    if (typeof txidOrOutpoint == "string") {
      if (vout !== undefined) {
        this.txid = txidOrOutpoint;
        this.vout = vout;
      } else {
        const [txid, vout] = txidOrOutpoint.split("_");
        this.txid = txid;
        this.vout = parseInt(vout);
      }
      return;
    } else if (vout !== undefined) {
      this.txid = Utils.toHex(txidOrOutpoint);
      this.vout = vout;
      return;
    } else if (Array.isArray(txidOrOutpoint) && txidOrOutpoint.length !== 36) {
      const reader = new Utils.Reader(txidOrOutpoint);
      this.txid = Utils.toHex(reader.read(32).reverse());
      this.vout = reader.readInt32LE();
    } else {
      throw new Error("Invalid Outpoint");
    }
  }

  toString(): string {
    return `${this.txid}_${this.vout}`;
  }

  toBinary(): number[] {
    const writer = new Utils.Writer();
    writer.write(Utils.toArray(this.txid, "hex").reverse());
    writer.writeUInt32LE(this.vout);
    return writer.toArray();
  }

  static fromJSON(json: string) {
    return new Outpoint(json);
  }
}
