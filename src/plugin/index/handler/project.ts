import { validate as isUUID } from "uuid";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import schema, { $id } from "#json-schema/project/v1";

import type { Prisma } from "@prisma/client";
import type { IndexJsonOptions } from "./options.js";
import type { FileIndexResult } from "./file-indexer.js";

const projectChecker = TypeCompiler.Compile(schema);

export async function insertProject(
  opts: IndexJsonOptions,
  result: FileIndexResult
): Promise<void> {
  const { fastify, logger } = opts;

  const value = result.data;
  if (!projectChecker.Check(value)) {
    const errors = [...projectChecker.Errors(value)];
    logger.warn({ path: result.path, errors, value }, "Invalid data");
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
  await fastify.db.$transaction(async tx => {
    await tx.tag.deleteMany({ where: { id: value.id } });
    await tx.project.upsert({
      where: { id: value.id },
      update: {
        path: result.path,
        title: value.title,
        type: value.type,
        tags: {
          set: tags
        }
      },
      create: {
        id: value.id,
        title: value.title,
        type: value.type,
        path: result.path,
        tags: {
          connect: tags
        }
      }
    });
  });
}

export const projectId = $id;
