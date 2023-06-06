import { useEffect, useMemo } from "react";
import Metadata from "#component/metadata";
import Layout from "#component/layout";
import mapQuery from "#utils/map-query";
import Aside from "./aside";
import Panel from "./panel";
import { FormProvider, useForm } from "./context";

import type { FC } from "react";
import type { ParsedUrlQuery } from "querystring";
import type { SearchProject } from "@filelia/plugin-api";

export interface Props {
  className?: string;
  query: ParsedUrlQuery;
  projects: SearchProject[];
  page: number;
  totalPage: number;
}

const Component: FC<Props> = props => {
  const { query, projects, page, totalPage, className } = props;
  const initialValues = useMemo(() => {
    const {
      andTags = [],
      orTags = [],
      notTags = [],
      andKeywords = [],
      orKeywords = [],
      notKeywords = []
    } = mapQuery(query);
    return { andTags, orTags, notTags, andKeywords, orKeywords, notKeywords };
  }, [query]);
  const form = useForm({ initialValues });
  useEffect(() => {
    // Force Update
    form.setValues(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);
  return (
    <FormProvider form={form}>
      <Layout aside={<Aside />} asideScrollable={false} className={className}>
        <Metadata title="Search" />
        <Panel projects={projects} page={page} totalPage={totalPage} />
      </Layout>
    </FormProvider>
  );
};

Component.displayName = "SearchPage";
export default Component;
