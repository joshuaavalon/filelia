import { ValidationError } from "#error";

import type { IndexJsonOptions } from "./options.js";
import type { FileIndexResult } from "./file-indexer.js";

const type = "filelia::person::v1";

async function insert(
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

export default { insert, type };
