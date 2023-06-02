import { access, constants } from "node:fs/promises";
import { ValidationError } from "#error";
import project from "./project.js";
import FileIndexer from "./file-indexer.js";

import type { IndexJsonOptions } from "./options.js";

export async function indexJson(opts: IndexJsonOptions): Promise<void> {
  const { logger, path, fastify } = opts;
  const indexer = new FileIndexer({ logger });
  const resultList = await indexer.index(path);

  for (const result of resultList) {
    const validate = fastify.validateFunc("project");
    if (!validate(result.data)) {
      logger.warn(
        {
          path: result.path,
          data: result.data,
          err: new ValidationError(validate.errors, validate.schema)
        },
        "Invalid data"
      );
      continue;
    }
    await project.insert(opts, { data: result.data, path: result.path });
  }

  const projects = await fastify.db.project.findMany({
    select: { id: true, path: true }
  });
  const projectIds = await Promise.all(
    projects.map(async project => {
      try {
        await access(project.path, constants.R_OK);
        return undefined;
      } catch (err) {
        return project.id;
      }
    })
  );
  const ids = projectIds.filter(id => Boolean(id)) as string[];
  await fastify.db.project.deleteMany({
    where: { id: { in: ids } }
  });
}
