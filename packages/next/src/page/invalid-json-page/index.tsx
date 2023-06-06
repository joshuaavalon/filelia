import { useState } from "react";
import Metadata from "#component/metadata";
import Layout from "#component/layout";
import TableOfContent from "#component/table-of-content";
import Panel from "./panel";

import type { FC } from "react";
import type { FindProjectByIdResultSuccess } from "@filelia/plugin-api";
import type { TableOfContentItem } from "#component/table-of-content";

export interface Props {
  className?: string;
  project: FindProjectByIdResultSuccess;
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
  const { json, schemaResult, project, className } = props;
  const [active, setActive] = useState(toc[0].href);
  return (
    <Layout
      aside={
        <TableOfContent items={toc} active={active} setActive={setActive} />
      }
      className={className}
    >
      <Metadata title={project.data.title} />
      <Panel project={project} json={json} schemaResult={schemaResult} />
    </Layout>
  );
};

Component.displayName = "InvalidJsonPanel";
export default Component;
