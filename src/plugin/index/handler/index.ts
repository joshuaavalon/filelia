import { getJsonSchemas } from "#utils";
import person from "./person.js";
import tag from "./tag.js";
import tagCategory from "./tag-category.js";
import project from "./project.js";
import FileIndexer from "./file-indexer.js";

import type { FileIndexResult } from "./file-indexer.js";
import type { IndexJsonOptions } from "./options.js";

const schemas = (await getJsonSchemas())
  .filter(schema => schema.order <= 0)
  .sort((a, b) => a.order - b.order);

export async function indexJson(opts: IndexJsonOptions): Promise<void> {
  const { logger, path } = opts;
  const indexer = new FileIndexer({ logger });
  const resultList = await indexer.index(path);
  const resultMap = new Map<string, FileIndexResult[]>();

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
      break;
    }
  }
  const handlers = [person, tag, tagCategory, project];
  for (const schema of schemas) {
    for (const handler of handlers) {
      if (handler.type !== schema.type) {
        continue;
      }
      const list = resultMap.get(handler.type) ?? [];
      for (const result of list) {
        await handler.insert(opts, result);
      }
    }
  }
}
