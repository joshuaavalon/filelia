import { validate as isUUID } from "uuid";
import { ValidationError } from "#error";

import type { IndexJsonOptions } from "./options.js";
import type { FileIndexResult } from "./file-indexer.js";

const type = "filelia::tag::v1" as const;

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
    const tagCategories = await tx.tagCategory.findMany({
      where: isUUID(value.category)
        ? {
            id: value.category
          }
        : {
            alias: { some: { name: value.category } }
          }
    });
    if (tagCategories.length !== 1) {
      throw new Error(`Invalid tag category ${value.category}`);
    }
    await tx.tagAlias.deleteMany({ where: { id: value.id } });
    const alias = value.alias.map((name, priority) => ({ name, priority }));
    await tx.tag.upsert({
      where: { id: value.id },
      update: {
        categoryId: tagCategories[0].id,
        alias: { create: alias }
      },
      create: {
        id: value.id,
        categoryId: tagCategories[0].id,
        alias: { create: alias }
      }
    });
  });
}

export default { insert, type };
