import { Type } from "@sinclair/typebox";
import TagsPage from "#page/tags-page";
import getColorScheme from "#utils/get-color-scheme";
import { parseQueryInt, parseQueryJson, parseQueryString } from "#utils/query";

import type { GetServerSideProps } from "next";
import type { Prisma, PrismaClient } from "@prisma/client";
import type {
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState
} from "mantine-react-table";
import type { SearchTag } from "#type";

interface Props {
  className?: string;
  filters: MRT_ColumnFiltersState;
  globalFilter: string;
  sorting: MRT_SortingState;
  pagination: MRT_PaginationState;
  tags: SearchTag[];
  rowCount: number;
}

export default function Page(props: Props): JSX.Element {
  const {
    filters,
    globalFilter,
    pagination,
    sorting,
    tags,
    rowCount,
    className
  } = props;
  return (
    <TagsPage
      columnFilters={filters}
      globalFilter={globalFilter}
      pagination={pagination}
      sorting={sorting}
      tags={tags}
      rowCount={rowCount}
      className={className}
    />
  );
}

const filtersSchema = Type.Array(
  Type.Object({ id: Type.String(), value: Type.Unknown() })
);

const sortingSchema = Type.Array(
  Type.Object({ id: Type.String(), desc: Type.Boolean() })
);

interface Query {
  filters: MRT_ColumnFiltersState;
  globalFilter: string;
}

function mapWhere(query: Query): Prisma.TagWhereInput {
  const { filters, globalFilter } = query;
  const wheres: Prisma.TagWhereInput[] = [];
  filters.forEach(filter => {
    if (filter.id === "name" && typeof filter.value === "string") {
      wheres.push({ name: { contains: filter.value } });
    }
  });
  if (globalFilter) {
    wheres.push({ name: { contains: globalFilter } });
  }
  return {
    AND: wheres
  };
}

async function getCount(
  db: PrismaClient,
  where: Prisma.TagWhereInput
): Promise<number> {
  return db.tag.count({ where });
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const { req, query } = ctx;
  const filters = parseQueryJson(query.filters, {
    default: [],
    schema: filtersSchema
  });
  const globalFilter = parseQueryString(query.globalFilter, { default: "" });
  const sorting = parseQueryJson(query.sorting, {
    default: [],
    schema: sortingSchema
  });
  const page = parseQueryInt(query.page, { gte: 1, default: 1 });
  const take = parseQueryInt(query.size, { gte: 5, lte: 100, default: 50 });
  const skip = (page - 1) * take;
  const { db } = req.fastify();
  const where = mapWhere({
    filters,
    globalFilter
  });
  const [rowCount, tags] = await Promise.all([
    getCount(db, where),
    db.tag.findMany({
      include: {
        _count: {
          select: {
            projects: true
          }
        }
      },
      where,
      take,
      skip,
      orderBy: sorting
        .filter(s => ["id", "name", "projectCount"].includes(s.id))
        .map(s => {
          if (s.id !== "projectCount") {
            return { [s.id]: s.desc ? "asc" : "desc" };
          }
          return { projects: { _count: s.desc ? "asc" : "desc" } };
        })
    })
  ]);

  return {
    props: {
      filters,
      globalFilter,
      sorting,
      colorScheme: getColorScheme(req),
      tags: tags.map(({ _count, ...tag }) => ({
        ...tag,
        projectCount: _count.projects
      })),
      pagination: {
        pageIndex: page - 1,
        pageSize: take
      },
      rowCount
    }
  };
};
