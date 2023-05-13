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
    logger.warn({ path: result.path, errors }, "Invalid data");
    return;
  }

  await fastify.db.$transaction(async tx => {
    await tx.tag.deleteMany({ where: { categoryId: value.id } });
    await tx.tagCategoryAlias.deleteMany({ where: { id: value.id } });
    await tx.tagCategory.upsert({
      where: { id: value.id },
      update: {
        alias: { create: value.alias.map(name => ({ name })) }
      },
      create: {
        alias: { create: value.alias.map(name => ({ name })) }
      }
    });
  });
}

export const tagCategoryId = $id;
