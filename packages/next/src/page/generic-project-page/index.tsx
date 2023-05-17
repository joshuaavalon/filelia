import { useState } from "react";
import Metadata from "#component/metadata";
import Layout from "#component/layout";
import TableOfContent from "#component/table-of-content";
import TagPanel from "#component/tag-panel";
import Panel from "./panel";
import { GenericProjectContext } from "./context";

import type { FC } from "react";
import type { Project } from "#type";
import type { TableOfContentLink } from "#component/table-of-content";
import type { GenericProject } from "./type";

export interface Props {
  project: Project;
  json: unknown;
}

const links: TableOfContentLink[] = [];

const Component: FC<Props> = props => {
  const { json, project } = props;
  const [active, setActive] = useState(""); //links[0].link
  return (
    <GenericProjectContext.Provider
      value={{ project, json: json as GenericProject }}
    >
      <Layout
        aside={
          <>
            <TableOfContent
              links={links}
              active={active}
              setActive={setActive}
            />
            <TagPanel
              tags={project.tags}
              sx={theme => ({ marginTop: theme.spacing.md })}
            />
          </>
        }
      >
        <Metadata title={project.title} />
        <Panel />
      </Layout>
    </GenericProjectContext.Provider>
  );
};

Component.displayName = "GenericProjectPage";
export default Component;
