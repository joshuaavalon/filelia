import { TypeCompiler } from "@sinclair/typebox/compiler";
import schema, { $id } from "#json-schema/person/v1";
import site from "#json-schema/common/site/v1";

import type { IndexJsonOptions } from "./options.js";
import type { FileIndexResult } from "./file-indexer.js";

const personChecker = TypeCompiler.Compile(schema, [site]);

export async function insertPerson(
  opts: IndexJsonOptions,
  result: FileIndexResult
): Promise<void> {
  const { fastify, logger } = opts;

  const value = result.data;
  if (!personChecker.Check(value)) {
    const errors = [...personChecker.Errors(value)];
    logger.warn({ path: result.path, errors, value }, "Invalid data");
    return;
  }

  await fastify.db.$transaction(async tx => {
    await tx.site.deleteMany({ where: { personId: value.id } });
    await tx.person.upsert({
      where: { id: value.id },
      update: {
        name: value.name,
        sites: { create: value.sites }
      },
      create: {
        id: value.id,
        name: value.name,
        sites: { create: value.sites }
      }
    });
  });
}

export const personId = $id;
