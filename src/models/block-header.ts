import { Utils } from "@bsv/sdk";

export interface BlockHeader {
  hash: string;
  height: number;
  prevHash: string;
  time: number;
  version: number;
  merkleroot: string;
  bits: number;
  nonce: number;
}

export function blockHeaderBytes(header: BlockHeader): number[] {
  const writer = new Utils.Writer();
  writer.writeInt32LE(header.version);
  writer.write([...Buffer.from(header.prevHash, "hex").reverse()])
  writer.write([...Buffer.from(header.merkleroot, "hex").reverse()]);
  writer.writeUInt32LE(header.time);
  writer.write(Utils.toArray(header.bits, "hex"));
  writer.writeUInt32LE(header.nonce);
  return writer.toArray();
}
