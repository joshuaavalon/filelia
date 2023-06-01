import SearchPage from "#page/search-page";
import getColorScheme from "#utils/get-color-scheme";
import mapQuery from "#utils/map-query";
import parseQueryInt from "#utils/query/parse-query-int";

import type { ParsedUrlQuery } from "querystring";
import type { GetServerSideProps } from "next";
import type { Prisma, PrismaClient } from "@prisma/client";
import type { SearchProject } from "#type";

interface Props {
  query: ParsedUrlQuery;
  projects: SearchProject[];
  page: number;
  totalPage: number;
}

export default function Page(props: Props): JSX.Element {
  const { query, projects, page, totalPage } = props;
  return (
    <SearchPage
      query={query}
      projects={projects}
      page={page}
      totalPage={totalPage}
    />
  );
}

function getCurrentPage(pageQuery: string[]): number {
  if (pageQuery.length < 1) {
    return 1;
  }
  try {
    const p = parseInt(pageQuery[pageQuery.length - 1]);
    return isNaN(p) || p - 1 < 1 ? 1 : p;
  } catch {
    return 1;
  }
}

function arraysNotEmpty(...arrays: string[][]): boolean {
  return arrays.some(arr => arr.length > 0);
}

interface Query {
  size: string[];
  filters: string[];
  globalFilter: string[];
  sorting: string[];
}

function mapWhere(query: Query): Prisma.TagWhereInput {
  const { andTags, orTags, notTags, andKeywords, orKeywords, notKeywords } =
    query;
  const wheres: Prisma.ProjectWhereInput[] = [];
  andTags.forEach(tag => {
    wheres.push({
      tags: { some: { name: { equals: tag } } }
    });
  });
  if (orTags.length > 0) {
    wheres.push({
      tags: {
        some: { name: { in: orTags } }
      }
    });
  }
  if (notTags.length > 0) {
    wheres.push({
      tags: {
        some: { name: { in: notTags } }
      }
    });
  }
  andKeywords.forEach(keyword => {
    wheres.push({
      OR: [
        { name: { contains: keyword } },
        { tags: { some: { name: { contains: keyword } } } }
      ]
    });
  });
  orKeywords.forEach(keyword => {
    wheres.push({
      OR: [
        { name: { contains: keyword } },
        { tags: { some: { name: { contains: keyword } } } }
      ]
    });
  });
  notKeywords.forEach(keyword => {
    wheres.push({
      name: { not: { contains: keyword } },
      OR: [{ tags: { some: { name: { not: { contains: keyword } } } } }]
    });
  });

  return {
    AND: wheres
  };
}

async function getCount(
  db: PrismaClient,
  where: Prisma.ProjectWhereInput
): Promise<number> {
  return db.project.count({ where });
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const { req, query } = ctx;
  const {
    filters = [],
    globalFilter = [],
    sorting = [],
    page: pageQuery = []
  } = mapQuery(query);
  const page = parseQueryInt(query.page, { gte: 1, default: 1 });
  const size = parseQueryInt(query.size, { gte: 10, lte: 50, default: 10 });
  let totalPage = 0;

  let projects: SearchProject[] = [];

  if (
    arraysNotEmpty(
      andTags,
      orTags,
      notTags,
      andKeywords,
      orKeywords,
      notKeywords
    )
  ) {
    const take = 10;
    const skip = (page - 1) * take;
    const { db, loadProject } = req.fastify();
    const where = mapWhere({
      andTags,
      orTags,
      notTags,
      andKeywords,
      orKeywords,
      notKeywords
    });
    const [count, result] = await Promise.all([
      getCount(db, where),
      db.project.findMany({
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
        skip
      })
    ]);
    totalPage = Math.ceil(count / take);
    projects = await Promise.all(
      result
        .sort((a, b) => {
          if (a._count.tags !== b._count.tags) {
            return b._count.tags - a._count.tags;
          }
          if (a.updatedAt.getTime() !== b.updatedAt.getTime()) {
            return b.updatedAt.getTime() - a.updatedAt.getTime();
          }
          return b.createdAt.getTime() - a.createdAt.getTime();
        })
        .map(async r => {
          const { id, path, tags, createdAt, updatedAt, name } = r;
          const f = await loadProject(id);
          return {
            id,
            path,
            tags,
            name,
            createdAt: createdAt.toISOString().split("T")[0],
            updatedAt: updatedAt.toISOString().split("T")[0],
            data: f?.data
          };
        })
    );
  }

  return {
    props: {
      query,
      colorScheme: getColorScheme(req),
      projects,
      totalPage,
      page
    }
  };
};
