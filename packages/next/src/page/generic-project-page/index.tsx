import { useState } from "react";
import Metadata from "#component/metadata";
import Layout from "#component/layout";
import TableOfContent from "#component/table-of-content";
import TagPanel from "#component/tag-panel";
import Panel from "./panel";
import { GenericProjectContext } from "./context";

import type { FC } from "react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { Project } from "#type";
import type { TableOfContentItem } from "#component/table-of-content";
import type { GenericProject } from "./type";

export interface Props {
  project: Project;
  json: unknown;
  description: MDXRemoteSerializeResult | null;
}

const Component: FC<Props> = props => {
  const { json, project, description } = props;
  const genericProject = json as GenericProject;
  const [toc, setToc] = useState<TableOfContentItem[]>([]);
  const [active, setActive] = useState(toc.length > 0 ? toc[0].href : "");
  console.log({ toc });
  return (
    <GenericProjectContext.Provider
      value={{ project, genericProject, description }}
    >
      <Layout
        aside={
          <>
            <TableOfContent items={toc} active={active} setActive={setActive} />
            <TagPanel
              tags={project.tags}
              sx={theme => ({ marginTop: theme.spacing.md })}
            />
          </>
        }
      >
        <Metadata title={project.title} />
        <Panel setToc={setToc} />
      </Layout>
    </GenericProjectContext.Provider>
  );
};

Component.displayName = "GenericProjectPage";
export default Component;
