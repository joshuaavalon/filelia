import { useState } from "react";
import Metadata from "#component/metadata";
import Layout from "#component/layout";
import TableOfContent from "#component/table-of-content";
import TagPanel from "#component/tag-panel";
import Panel from "./panel";

import type { FC } from "react";
import type { Project } from "#type";
import type { TableOfContentLink } from "#component/table-of-content";

export interface Props {
  project: Project;
  json: unknown;
}

const links: TableOfContentLink[] = [
  {
    label: "JSON",
    link: "#json",
    order: 1
  }
];

const Component: FC<Props> = props => {
  const { json, project } = props;
  const [active, setActive] = useState(links[0].link);
  return (
    <Layout
      aside={
        <>
          <TableOfContent links={links} active={active} setActive={setActive} />
          <TagPanel
            tags={project.tags}
            sx={theme => ({ marginTop: theme.spacing.md })}
          />
        </>
      }
    >
      <Metadata title={project.title} />
      <Panel project={project} json={json} />
    </Layout>
  );
};

Component.displayName = "UnsupportedProjectPage";
export default Component;
