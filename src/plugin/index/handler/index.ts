import person from "./person.js";
import tag from "./tag.js";
import tagCategory from "./tag-category.js";
import project from "./project.js";
import FileIndexer from "./file-indexer.js";

import type { FileIndexResult } from "./file-indexer.js";
import type { IndexJsonOptions } from "./options.js";

const handlers = {
  [person.type]: person.insert,
  [tag.type]: tag.insert,
  [tagCategory.type]: tagCategory.insert,
  [project.type]: project.insert
};

export async function indexJson(opts: IndexJsonOptions): Promise<void> {
  const { logger, path, fastify } = opts;
  const indexer = new FileIndexer({ logger });
  const resultList = await indexer.index(path);
  const resultMap = new Map<string, FileIndexResult[]>();

  const schemas = fastify.validateSchemas().filter(schema => schema.order >= 0);
  for (const result of resultList) {
    if (
      !result.data ||
      typeof result.data !== "object" ||
      !("filelia" in result.data) ||
      !Array.isArray(result.data.filelia)
    ) {
      continue;
    }

    for (const schema of schemas) {
      if (!result.data.filelia.includes(schema.type)) {
        continue;
      }
      const list = resultMap.get(schema.type) ?? [];
      list.push(result);
      resultMap.set(schema.type, list);
    }
  }
  for (const schema of schemas) {
    const handler = handlers[schema.type];
    if (!handler) {
      continue;
    }
    const list = resultMap.get(schema.type) ?? [];
    for (const result of list) {
      await handler(opts, result);
    }
  }
}
