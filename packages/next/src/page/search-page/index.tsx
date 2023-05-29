import { useMemo } from "react";
import Metadata from "#component/metadata";
import Layout from "#component/layout";
import Aside from "./aside";
import Panel from "./panel";
import Context, { FormProvider, useForm } from "./context";

import type { FC } from "react";
import type { ParsedUrlQuery } from "querystring";

function toArray(value: string | string[] | undefined): string[] {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

export interface Props {
  query: ParsedUrlQuery;
}

const Component: FC<Props> = props => {
  const { query } = props;
  const initialValues = useMemo(() => {
    const { tags, notTags, keywords, notKeywords } = query;
    return {
      tags: toArray(tags),
      notTags: toArray(notTags),
      keywords: toArray(keywords),
      notKeywords: toArray(notKeywords)
    };
  }, [query]);
  const form = useForm({ initialValues });
  return (
    <FormProvider form={form}>
      <Context.Provider value={{}}>
        <Layout aside={<Aside />} asideScrollable={false}>
          <Metadata title="Search" />
          <Panel />
        </Layout>
      </Context.Provider>
    </FormProvider>
  );
};

Component.displayName = "SearchPage";
export default Component;
