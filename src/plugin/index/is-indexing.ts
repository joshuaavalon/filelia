import type { Server } from "#server";

export async function isIndexing(server: Server): Promise<boolean> {
  const index = await server.db.keyValue.findUnique({
    where: { key: "index" }
  });
  return Boolean(index);
}
