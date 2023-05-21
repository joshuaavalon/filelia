import type { Static } from "@sinclair/typebox";
import type { Schemas } from "#plugin/validation/json-schema";
import type { IndexJsonOptions } from "./options.js";
import type { FileIndexResult } from "./file-indexer.js";

export async function insert(
  opts: IndexJsonOptions,
  result: FileIndexResult<Static<Schemas["project"]>>
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
      tags: {
        connectOrCreate: tags
      }
    },
    create: {
      id: data.id,
      path: result.path,
      tags: {
        connectOrCreate: tags
      }
    }
  });
}

export default { insert };
