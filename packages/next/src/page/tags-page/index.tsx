import Metadata from "#component/metadata";
import Layout from "#component/layout";
import Panel from "./panel";

import type { FC } from "react";
import type { ParsedUrlQuery } from "querystring";
import type { SearchTag } from "#type";

export interface Props {
  tags: SearchTag[];
  query: ParsedUrlQuery;
  page: number;
  totalPage: number;
}

const Component: FC<Props> = props => {
  const { tags, query, page, totalPage } = props;

  return (
    <Layout>
      <Metadata title="Tags" />
      <Panel tags={tags} page={page} totalPage={totalPage} />
    </Layout>
  );
};

Component.displayName = "TagsPage";
export default Component;
