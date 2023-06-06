import { dirname, join } from "node:path";
import { ValidationError } from "@filelia/error";
import { loadJsonYaml, validateProject } from "#utils";
import { mapWhere } from "./map-where.js";

import type { FastifyInstance } from "fastify";
import type { Project, Tag } from "@prisma/client";
import type { Project as Data } from "@filelia/schema";
import type { SearchProjectsQuery } from "./map-where.js";

export type { SearchProjectsQuery } from "./map-where.js";
export type { Project as Data } from "@filelia/schema";

export interface SearchProjectsOptions {
  take: number;
  skip: number;
  query: SearchProjectsQuery;
}

export interface SearchProject {
  baseDir: string | null;
  data: Data | null;
  project: Pick<Project, "id" | "path" | "name"> & {
    tags: Tag[];
    updatedAt: string;
  };
}

export interface SearchProjectsResult {
  totalCount: number;
  result: SearchProject[];
}

export async function searchProjects(
  this: FastifyInstance,
  opts: SearchProjectsOptions
): Promise<SearchProjectsResult> {
  const { query, take, skip } = opts;
  const { andTags, notTags } = query;
  const where = mapWhere(query);
  const [totalCount, projects] = await Promise.all([
    this.db.project.count({ where }),
    this.db.project.findMany({
      include: {
        _count: {
          select: {
            tags: { where: { name: { in: andTags, notIn: notTags } } }
          }
        },
        tags: true
      },
      where,
      take,
      skip,
      orderBy: [
        { tags: { _count: "desc" } },
        { updatedAt: "desc" },
        { createdAt: "desc" }
      ]
    })
  ]);
  const result = await Promise.all(
    projects.map(async (project): Promise<SearchProject> => {
      const { id, path, name, tags } = project;
      const updatedAt = project.updatedAt.toISOString().split("T")[0];
      try {
        const content = await loadJsonYaml(path);
        const validate = validateProject();
        if (!validate(content)) {
          throw new ValidationError(validate.errors, validate.schema);
        }
        const baseDir = join(dirname(project.path), content.baseDir ?? ".");
        return {
          project: { id, path, name, tags, updatedAt },
          baseDir,
          data: content
        };
      } catch (err) {
        this.log.warn({ path, err }, "Failed to load project");
        return {
          project: { id, path, name, tags, updatedAt },
          baseDir: null,
          data: null
        };
      }
    })
  );
  return { totalCount, result };
}
