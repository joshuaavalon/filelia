import type { FastifyInstance } from "fastify";

export async function isIndexing(server: FastifyInstance): Promise<boolean> {
  const index = await server.db.keyValue.findUnique({
    where: { key: "index" }
  });
  return Boolean(index);
}
