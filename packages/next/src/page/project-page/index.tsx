import { useState } from "react";
import Metadata from "#component/metadata";
import Layout from "#component/layout";
import TableOfContent from "#component/table-of-content";
import TagPanel from "#component/tag-panel";
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
  const [active, setActive] = useState(toc.length > 0 ? toc[0].href : "");
  return (
    <ProjectContext.Provider value={{ result, description }}>
      <Layout
        aside={
          <>
            <TableOfContent items={toc} active={active} setActive={setActive} />
            <TagPanel
              tags={result.data.tags}
              sx={theme => ({ marginTop: theme.spacing.md })}
            />
          </>
        }
      >
        <Metadata title={result.data.title} />
        <Panel setToc={setToc} />
      </Layout>
    </ProjectContext.Provider>
  );
};

Component.displayName = "ProjectPage";
export default Component;
