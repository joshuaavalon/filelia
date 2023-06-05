import { Readable } from "node:stream";
import { createHash } from "node:crypto";
import { Buffer } from "node:buffer";

import type { FastifyReply, FastifyRequest } from "fastify";

async function toBuffer(rs: Readable): Promise<Buffer> {
  const buffers = [];
  for await (const data of rs) {
    buffers.push(data);
  }
  return Buffer.concat(buffers);
}

function createEtag(buffer: Buffer): string {
  return createHash("sha256").update(buffer).digest("hex");
}

interface SendImageOptions {
  cache?: boolean;
}

export async function sendImage(
  req: FastifyRequest,
  res: FastifyReply,
  data: Readable | Buffer,
  opts: SendImageOptions = {}
): Promise<FastifyReply> {
  const { cache = true } = opts;
  const buffer = Buffer.isBuffer(data) ? data : await toBuffer(data);
  const etag = createEtag(buffer);
  if (cache) {
    if (req.headers["if-none-match"] === etag) {
      res.status(304).send();
      return res;
    }
  }
  const fastify = res.server;
  const { mime } = await fastify.detectImage(Readable.from(buffer));
  res.raw.writeHead(200, {
    "Content-Type": mime,
    "Cache-Control": cache ? "public, max-age=3600" : "public, no-cache",
    "Content-Length": Buffer.byteLength(buffer),
    ETag: etag
  });
  res.hijack();
  Readable.from(buffer).pipe(res.raw);
  return res;
}

export async function sendText(
  req: FastifyRequest,
  res: FastifyReply,
  data: string,
  opts: SendImageOptions = {}
): Promise<void> {
  const { cache = true } = opts;
  const etag = createHash("sha256").update(data, "utf-8").digest("hex");
  if (cache) {
    if (req.headers["if-none-match"] === etag) {
      res.status(304).send();
      return;
    }
  }
  res
    .code(200)
    .header("Content-Type", "text/plain; charset=utf-8")
    .header(
      "Cache-Control",
      cache ? "public, max-age=3600" : "public, no-cache"
    )
    .header("ETag", etag)
    .send(data);
}

export async function sendJson(
  req: FastifyRequest,
  res: FastifyReply,
  json: Record<string, unknown>
): Promise<FastifyReply> {
  const data = JSON.stringify(json);
  const etag = createHash("sha256").update(data, "utf-8").digest("hex");
  return res
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .header("Cache-Control", "public, no-cache")
    .header("ETag", etag)
    .send(json);
}
