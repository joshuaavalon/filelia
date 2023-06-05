import { Buffer } from "node:buffer";
import type { Readable } from "node:stream";

export async function toBuffer(rs: Readable): Promise<Buffer> {
  const buffers = [];
  for await (const data of rs) {
    buffers.push(data);
  }
  return Buffer.concat(buffers);
}
