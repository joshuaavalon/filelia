import type { Project } from "@filelia/schema";
import type { IndexJsonOptions } from "./options.js";
import type { FileIndexResult } from "./file-indexer.js";

export async function insert(
  opts: IndexJsonOptions,
  result: FileIndexResult<Project>
): Promise<void> {
  const {
    fastify: { db }
  } = opts;
  const { data } = result;
  const tags = data.tags.map(name => ({
    where: { name },
    create: { name }
  }));
  await db.project.upsert({
    where: { id: data.id },
    update: {
      path: result.path,
      name: result.data.title,
      tags: {
        connectOrCreate: tags
      },
      createdAt: new Date(result.data.createdAt),
      updatedAt: new Date(result.data.updatedAt)
    },
    create: {
      id: data.id,
      path: result.path,
      name: result.data.title,
      tags: {
        connectOrCreate: tags
      },
      createdAt: new Date(result.data.createdAt),
      updatedAt: new Date(result.data.updatedAt)
    }
  });
}

export default { insert };
