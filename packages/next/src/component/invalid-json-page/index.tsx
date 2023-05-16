import { useState } from "react";
import Metadata from "#component/metadata";
import Layout from "#component/layout";
import TableOfContent from "#component/table-of-content";
import InvalidJsonPanel from "./panel";

import type { FC } from "react";
import type { ValueError } from "@sinclair/typebox/compiler";
import type { Project } from "#type";
import type { TableOfContentLink } from "#component/table-of-content";

export interface Props {
  project: Project;
  schema: unknown;
  json: unknown;
  errors: ValueError[];
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
  const { json, schema, errors, project } = props;
  const [active, setActive] = useState("#error");
  return (
    <Layout
      aside={
        <TableOfContent links={links} active={active} setActive={setActive} />
      }
    >
      <Metadata title={project.title} />
      <InvalidJsonPanel
        project={project}
        json={json}
        schema={schema}
        errors={errors}
      />
    </Layout>
  );
};

Component.displayName = "InvalidJsonPanel";
export default Component;
