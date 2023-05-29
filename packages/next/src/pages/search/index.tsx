import SearchPage from "#page/search-page";
import getColorScheme from "#utils/get-color-scheme";

import type { ParsedUrlQuery } from "querystring";
import type { GetServerSideProps } from "next";
interface Props {
  query: ParsedUrlQuery;
}

export default function Page(props: Props): JSX.Element {
  const { query } = props;
  return <SearchPage query={query} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const { req, query } = ctx;
  return {
    props: { query, colorScheme: getColorScheme(req) }
  };
};
