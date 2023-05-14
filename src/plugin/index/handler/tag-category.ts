import { TypeCompiler } from "@sinclair/typebox/compiler";
import schema, { $id } from "#json-schema/tag-category/v1";

import type { IndexJsonOptions } from "./options.js";
import type { FileIndexResult } from "./file-indexer.js";

const tagCategoryChecker = TypeCompiler.Compile(schema);

export async function insertTagCategory(
  opts: IndexJsonOptions,
  result: FileIndexResult
): Promise<void> {
  const { fastify, logger } = opts;

  const value = result.data;
  if (!tagCategoryChecker.Check(value)) {
    const errors = [...tagCategoryChecker.Errors(value)];
    logger.warn({ path: result.path, errors, value }, "Invalid data");
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

export const tagCategoryId = $id;
