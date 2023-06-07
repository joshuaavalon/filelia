import { dirname, join } from "node:path";
import { Prisma } from "@prisma/client";
import { ValidationError } from "@filelia/error";
import { loadJsonYaml, validateProject } from "#utils";

import type { FastifyInstance } from "fastify";
import type { Project, Tag } from "@prisma/client";
import type { Project as Data } from "@filelia/schema";

export type { Project as Data } from "@filelia/schema";

export interface SearchProjectsQuery {
  andTags: string[];
  orTags: string[];
  notTags: string[];
  andKeywords: string[];
  orKeywords: string[];
  notKeywords: string[];
}

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
  const { andTags, notTags, orTags, andKeywords, orKeywords, notKeywords } =
    query;
  const orTagsWhere =
    orTags.length > 0
      ? Prisma.sql`t.name IN (${Prisma.join(orTags)})`
      : Prisma.sql`1 = 1`;
  const notTagsWhere =
    notTags.length > 0
      ? Prisma.sql`t.name NOT IN (${Prisma.join(notTags)})`
      : Prisma.sql`1 = 1`;
  const orNotTagsWhere =
    orTags.length > 0 || notTags.length > 0
      ? Prisma.sql`
          p.id IN (
            SELECT p.id FROM project p
            LEFT JOIN _ProjectToTag pt ON pt.A = p.id
            LEFT JOIN tag t ON t.id = pt.B
            WHERE ${orTagsWhere} AND ${notTagsWhere}
          )
        `
      : Prisma.sql`1 = 1`;
  const andTagsWhere =
    andTags.length > 0
      ? Prisma.sql`
            p.id IN (
              SELECT p.id FROM project p
              LEFT JOIN _ProjectToTag pt ON pt.A = p.id
              LEFT JOIN tag t ON t.id = pt.B
              WHERE t.name IN (${Prisma.join(andTags)})
              GROUP BY p.id
              HAVING COUNT(*) = ${andTags.length}
            )
          `
      : Prisma.sql`1 = 1`;

  const andKeywordsWhere =
    andKeywords.length > 0
      ? Prisma.join(
          andKeywords.map(keyword => Prisma.sql`p.name MATCH ${keyword}`),
          " AND "
        )
      : Prisma.sql`1 = 1`;
  const orKeywordsWhere =
    orKeywords.length > 0
      ? Prisma.join(
          orKeywords.map(keyword => Prisma.sql`p.name MATCH ${keyword}`),
          " OR "
        )
      : Prisma.sql`1 = 1`;
  const andOrKeywordsWhere =
    orKeywords.length > 0 || andKeywords.length > 0
      ? Prisma.sql`
        p.id IN (
          SELECT p.id FROM project_fts p
          WHERE (${andKeywordsWhere}) AND (${orKeywordsWhere})
        )
      `
      : Prisma.sql`1 = 1`;
  const notKeywordsWhere =
    notKeywords.length > 0
      ? Prisma.sql`
          p.id NOT IN (
            SELECT p.id FROM project_fts p
            WHERE ${Prisma.join(
              notKeywords.map(keyword => Prisma.sql`p.name MATCH ${keyword}`),
              " OR "
            )}
          )
        `
      : Prisma.sql`1 = 1`;
  const [countResult, projectIdsResult] = await Promise.all([
    this.db.$queryRaw<{ cnt: bigint }[]>`
    SELECT COUNT(*) as cnt FROM project p
    WHERE
      ${orNotTagsWhere} AND
      ${andTagsWhere} AND
      ${andOrKeywordsWhere} AND
      ${notKeywordsWhere}
    `,
    this.db.$queryRaw<{ id: string }[]>`
    SELECT p.id FROM project p
    WHERE
      ${orNotTagsWhere} AND
      ${andTagsWhere} AND
      ${andOrKeywordsWhere} AND
      ${notKeywordsWhere}
    ORDER BY
      p.updated_at DESC,
      p.created_at DESC
    LIMIT ${take} OFFSET ${skip}
   `
  ]);
  const projects = await this.db.project.findMany({
    include: { tags: true },
    where: { id: { in: projectIdsResult.map(p => p.id) } }
  });
  const totalCount = Number(countResult[0].cnt);
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
