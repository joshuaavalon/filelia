import { useState } from "react";
import Metadata from "#component/metadata";
import Layout from "#component/layout";
import Panel from "./panel";
import Context from "./context";

import type { FC } from "react";
import type { ParsedUrlQuery } from "querystring";
import type { SelectItem } from "@mantine/core";

export interface Props {
  query: ParsedUrlQuery;
}

const Component: FC<Props> = props => {
  const { query } = props;
  const [searchItems, setSearchItems] = useState<SelectItem[]>([]);
  return (
    <Context.Provider value={{ searchItems, setSearchItems }}>
      <Layout>
        <Metadata title="Search" />
        <Panel />
      </Layout>
    </Context.Provider>
  );
};

Component.displayName = "SearchPage";
export default Component;
