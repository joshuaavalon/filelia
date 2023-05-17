import { useState } from "react";
import Metadata from "#component/metadata";
import Layout from "#component/layout";
import TableOfContent from "#component/table-of-content";
import Panel from "./panel";

import type { FC } from "react";
import type { Project } from "#type";
import type { TableOfContentLink } from "#component/table-of-content";

export interface Props {
  project: Project;
  json: unknown;
  schemaResult: {
    schema: unknown;
    errorsStr: string;
  }[];
}

const links: TableOfContentLink[] = [
  {
    label: "Error",
    link: "#error",
    order: 1
  },
  {
    label: "JSON",
    link: "#json",
    order: 1
  },
  {
    label: "Schema",
    link: "#schema",
    order: 1
  }
];

const Component: FC<Props> = props => {
  const { json, schemaResult, project } = props;
  const [active, setActive] = useState(links[0].link);
  return (
    <Layout
      aside={
        <TableOfContent links={links} active={active} setActive={setActive} />
      }
    >
      <Metadata title={project.title} />
      <Panel project={project} json={json} schemaResult={schemaResult} />
    </Layout>
  );
};

Component.displayName = "InvalidJsonPanel";
export default Component;
