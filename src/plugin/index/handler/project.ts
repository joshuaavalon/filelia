import { validate as isUUID } from "uuid";
import { ValidationError } from "#error";

import type { Prisma } from "@prisma/client";
import type { IndexJsonOptions } from "./options.js";
import type { FileIndexResult } from "./file-indexer.js";

const type = "filelia::project::v1";

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

  const tags: Prisma.TagWhereUniqueInput[] = await Promise.all(
    value.tags.map(async tag => {
      if (isUUID(tag)) {
        return {
          id: tag
        };
      }
      const [categoryAlias, ...tagAliasParts] = tag.split(":");
      const tagAlias = tagAliasParts.join(":");
      const tagList = await fastify.db.tag.findMany({
        where: {
          alias: { some: { name: tagAlias.trim() } },
          tagCategory: {
            alias: { some: { name: categoryAlias.trim() } }
          }
        }
      });
      if (tagList.length !== 1) {
        throw new Error(`Invalid tag ${tag}`);
      }
      return {
        id: tagList[0].id
      };
    })
  );
  const types = value.filelia.map(name => ({ name }));
  await fastify.db.$transaction(async tx => {
    await tx.projectType.deleteMany({ where: { id: value.id } });
    await tx.project.upsert({
      where: { id: value.id },
      update: {
        title: value.title,
        types: { create: types },
        path: result.path,
        tags: {
          set: tags
        }
      },
      create: {
        id: value.id,
        title: value.title,
        types: { create: types },
        path: result.path,
        tags: {
          connect: tags
        }
      }
    });
  });
}

export default { insert, type };
