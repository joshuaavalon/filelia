import SearchPage from "#page/search-page";
import getColorScheme from "#utils/get-color-scheme";
import mapQuery from "#utils/map-query";
import parseQueryInt from "#utils/query/parse-query-int";

import type { ParsedUrlQuery } from "querystring";
import type { GetServerSideProps } from "next";
import type { SearchProject } from "@filelia/plugin-api";

interface Props {
  className?: string;
  query: ParsedUrlQuery;
  projects: SearchProject[];
  page: number;
  totalPage: number;
}

export default function Page(props: Props): JSX.Element {
  const { query, projects, page, totalPage, className } = props;
  return (
    <SearchPage
      query={query}
      projects={projects}
      page={page}
      totalPage={totalPage}
      className={className}
    />
  );
}

function arraysNotEmpty(...arrays: string[][]): boolean {
  return arrays.some(arr => arr.length > 0);
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const { req, query } = ctx;
  const {
    andTags = [],
    orTags = [],
    notTags = [],
    andKeywords = [],
    orKeywords = [],
    notKeywords = []
  } = mapQuery(query);
  const page = parseQueryInt(query.page, { gte: 1, default: 1 });
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
    const take = 30;
    const skip = (page - 1) * take;
    const { totalCount, result } = await req.fastify().searchProjects({
      query: {
        andTags,
        orTags,
        notTags,
        andKeywords,
        orKeywords,
        notKeywords
      },
      skip,
      take
    });
    projects = result;
    totalPage = Math.ceil(totalCount / take);
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
