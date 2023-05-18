import { useState } from "react";
import Metadata from "#component/metadata";
import Layout from "#component/layout";
import TableOfContent from "#component/table-of-content";
import Panel from "./panel";

import type { FC } from "react";
import type { Project } from "#type";
import type { TableOfContentItem } from "#component/table-of-content";

export interface Props {
  project: Project;
  json: unknown;
  schemaResult: {
    schema: unknown;
    errorsStr: string;
  }[];
}

const toc: TableOfContentItem[] = [
  {
    label: "JSON",
    href: "#json",
    order: 1
  },
  {
    label: "Error",
    href: "#error",
    order: 1
  },
  {
    label: "Schema",
    href: "#schema",
    order: 1
  }
];

const Component: FC<Props> = props => {
  const { json, schemaResult, project } = props;
  const [active, setActive] = useState(toc[0].href);
  return (
    <Layout
      aside={
        <TableOfContent items={toc} active={active} setActive={setActive} />
      }
    >
      <Metadata title={project.title} />
      <Panel project={project} json={json} schemaResult={schemaResult} />
    </Layout>
  );
};

Component.displayName = "InvalidJsonPanel";
export default Component;
