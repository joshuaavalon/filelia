import { ValidationError } from "#error";

import type { IndexJsonOptions } from "./options.js";
import type { FileIndexResult } from "./file-indexer.js";

const type = "filelia::tag-category::v1" as const;

export async function insert(
  opts: IndexJsonOptions,
  result: FileIndexResult
): Promise<void> {
  const { fastify, logger } = opts;
  const value = result.data;
  const validate = fastify.validateFunc(type);
  if (!validate(value)) {
    logger.warn(
      {
        path: result.path,
        value,
        err: new ValidationError(validate.errors, validate.schema)
      },
      "Invalid data"
    );
    return;
  }
  await fastify.db.$transaction(async tx => {
    await tx.tag.deleteMany({ where: { categoryId: value.id } });
    await tx.tagCategoryAlias.deleteMany({ where: { id: value.id } });
    const alias = value.alias.map((name, priority) => ({ name, priority }));
    await tx.tagCategory.upsert({
      where: { id: value.id },
      update: {
        alias: { create: alias },
        color: value.color ? value.color : null
      },
      create: {
        id: value.id,
        alias: { create: alias },
        color: value.color ? value.color : null
      }
    });
  });
}

export default { insert, type };
