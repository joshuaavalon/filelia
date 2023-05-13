import { insertPerson, personId } from "./person.js";
import { insertTag, tagId } from "./tag.js";
import { insertTagCategory, tagCategoryId } from "./tag-category.js";
import { insertProject, projectId } from "./project.js";
import FileIndexer from "./file-indexer.js";

import type { FileIndexResult } from "./file-indexer.js";
import type { IndexJsonOptions } from "./options.js";

export async function indexJson(opts: IndexJsonOptions): Promise<void> {
  const { logger, path } = opts;
  const indexer = new FileIndexer({ logger });
  const resultList = await indexer.index(path);
  const personResult: FileIndexResult[] = [];
  const tagCategoryResult: FileIndexResult[] = [];
  const tagResult: FileIndexResult[] = [];
  const projectResult: FileIndexResult[] = [];

  for (const result of resultList) {
    if (!result || typeof result !== "object" || !("$schema" in result)) {
      continue;
    }
    switch (result.$schema) {
      case personId:
        personResult.push(result);
        break;
      case tagCategoryId:
        tagCategoryResult.push(result);
        break;
      case tagId:
        tagResult.push(result);
        break;
      case projectId:
        projectResult.push(result);
        break;
    }
  }
  for (const result of personResult) {
    await insertPerson(opts, result);
  }
  for (const result of tagCategoryResult) {
    await insertTagCategory(opts, result);
  }
  for (const result of tagResult) {
    await insertTag(opts, result);
  }
  for (const result of projectResult) {
    await insertProject(opts, result);
  }
}
