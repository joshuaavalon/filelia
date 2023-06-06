import { useState } from "react";
import Metadata from "#component/metadata";
import Layout from "#component/layout";
import Aside from "./aside";
import Panel from "./panel";
import Context from "./context";

import type { FC } from "react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { FindProjectByIdResultSuccess } from "@filelia/plugin-api";
import type { TableOfContentItem } from "#component/table-of-content";

export interface Props {
  className?: string;
  result: FindProjectByIdResultSuccess;
  description: MDXRemoteSerializeResult | null;
}

const Component: FC<Props> = props => {
  const { result, description, className } = props;
  const items: TableOfContentItem[] = [];
  if (result.data.gallery.length > 0) {
    items.push({
      href: "#gallery",
      label: "Gallery",
      order: 1
    });
  }
  items.push({ href: "#description", label: "Description", order: 1 });
  const [toc, setToc] = useState<TableOfContentItem[]>(items);
  return (
    <Context.Provider value={{ result, description }}>
      <Layout aside={<Aside toc={toc} />} className={className}>
        <Metadata title={result.data.title} />
        <Panel setToc={setToc} />
      </Layout>
    </Context.Provider>
  );
};

Component.displayName = "ProjectPage";
export default Component;
