import { Utils } from "@bsv/sdk";

export interface BlockHeader {
  hash: string;
  height: number;
  prevHash: string;
  time: number;
  version: number;
  merkleRoot: string;
  bits: string;
  nonce: number;
}

export const BLOCK_HEADER_SIZE = 116;

export function blockHeaderBytes(header: BlockHeader): number[] {
  const writer = new Utils.Writer();
  writeBlockHeader(writer, header);
  return writer.toArray();
}

export function writeBlockHeader(writer: Utils.Writer, header: BlockHeader) {
  writer.writeUInt32LE(header.height);
  writer.write(Utils.toArray(header.hash, "hex"));
  writer.writeUInt32LE(header.version);
  writer.write(Utils.toArray(header.prevHash, "hex").reverse())
  writer.write(Utils.toArray(header.merkleRoot, "hex").reverse());
  writer.writeUInt32LE(header.time);
  writer.write(Utils.toArray(header.bits, "hex"));
  writer.writeUInt32LE(header.nonce);
}

export function blockHeaderFromReader(reader: Utils.Reader): BlockHeader {
  return {
    height: reader.readUInt32LE(),
    hash: Utils.toHex(reader.read(32)),
    version: reader.readUInt32LE(),
    prevHash: Utils.toHex(reader.read(32).reverse()),
    merkleRoot: Utils.toHex(reader.read(32).reverse()),
    time: reader.readUInt32LE(),
    bits: Utils.toHex(reader.read(4)),
    nonce: reader.readUInt32LE(),
  };
}
