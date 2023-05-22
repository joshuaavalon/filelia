import { useState } from "react";
import Metadata from "#component/metadata";
import Layout from "#component/layout";
import Aside from "./aside";
import Panel from "./panel";
import { ProjectContext } from "./context";

import type { FC } from "react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { LoadProjectResult } from "#type";
import type { TableOfContentItem } from "#component/table-of-content";

export interface Props {
  result: LoadProjectResult;
  description: MDXRemoteSerializeResult | null;
}

const Component: FC<Props> = props => {
  const { result, description } = props;
  const [toc, setToc] = useState<TableOfContentItem[]>([]);
  return (
    <ProjectContext.Provider value={{ result, description }}>
      <Layout aside={<Aside toc={toc} />}>
        <Metadata title={result.data.title} />
        <Panel setToc={setToc} />
      </Layout>
    </ProjectContext.Provider>
  );
};

Component.displayName = "ProjectPage";
export default Component;
