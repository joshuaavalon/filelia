import { validate as isUUID } from "uuid";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import schema, { $id } from "#json-schema/tag/v1";

import type { IndexJsonOptions } from "./options.js";
import type { FileIndexResult } from "./file-indexer.js";

const tagChecker = TypeCompiler.Compile(schema);

export async function insertTag(
  opts: IndexJsonOptions,
  result: FileIndexResult
): Promise<void> {
  const { fastify, logger } = opts;

  const value = result.data;
  if (!tagChecker.Check(value)) {
    const errors = [...tagChecker.Errors(value)];
    logger.warn({ path: result.path, errors, value }, "Invalid data");
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
    await tx.tag.upsert({
      where: { id: value.id },
      update: {
        categoryId: tagCategories[0].id,
        alias: { create: value.alias.map(name => ({ name })) }
      },
      create: {
        id: value.id,
        categoryId: tagCategories[0].id,
        alias: { create: value.alias.map(name => ({ name })) }
      }
    });
  });
}

export const tagId = $id;
