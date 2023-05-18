import { useState } from "react";
import Metadata from "#component/metadata";
import Layout from "#component/layout";
import TableOfContent from "#component/table-of-content";
import TagPanel from "#component/tag-panel";
import Panel from "./panel";

import type { FC } from "react";
import type { Project } from "#type";
import type { TableOfContentItem } from "#component/table-of-content";

export interface Props {
  project: Project;
  json: unknown;
}

const toc: TableOfContentItem[] = [
  {
    label: "JSON",
    href: "#json",
    order: 1
  }
];

const Component: FC<Props> = props => {
  const { json, project } = props;
  const [active, setActive] = useState(toc[0].href);
  return (
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
      <Panel project={project} json={json} />
    </Layout>
  );
};

Component.displayName = "UnsupportedProjectPage";
export default Component;
