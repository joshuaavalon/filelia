import { Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

import type { FastifyInstance } from "fastify";
import type { Static } from "@sinclair/typebox";

const metadataSchema = Type.Object({
  format: Type.String(),
  height: Type.Number(),
  width: Type.Number(),
  dataUrl: Type.String(),
  hash: Type.String(),
  transformHash: Type.Optional(Type.String())
});
const schemaValidator = TypeCompiler.Compile(metadataSchema);

export type Metadata = Static<typeof metadataSchema>;

export async function getMetadata(
  _fastify: FastifyInstance,
  _key: string
): Promise<Metadata | undefined> {
  // const cached = await fastify.cache.get(key);
  // if (schemaValidator.Check(cached)) {
  //   return cached;
  // }
  return undefined;
}

export async function setMetadata(
  fastify: FastifyInstance,
  key: string,
  metadata: Metadata
): Promise<void> {
  if (schemaValidator.Check(metadata)) {
    console.log("1");
  }
  // await fastify.cache.set(key, metadata);
}
