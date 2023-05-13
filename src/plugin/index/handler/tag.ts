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
    logger.warn({ path: result.path, errors }, "Invalid data");
    return;
  }

  await fastify.db.$transaction(async tx => {
    await tx.tagAlias.deleteMany({ where: { id: value.id } });
    await tx.tag.upsert({
      where: { id: value.id },
      update: {
        categoryId: value.categoryId,
        alias: { create: value.alias.map(name => ({ name })) }
      },
      create: {
        categoryId: value.categoryId,
        alias: { create: value.alias.map(name => ({ name })) }
      }
    });
  });
}

export const tagId = $id;
