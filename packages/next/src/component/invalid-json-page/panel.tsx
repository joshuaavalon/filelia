import { Flex } from "@mantine/core";
import Alert from "./alert";
import JsonSection from "./json-section";

import type { FC } from "react";
import type { ErrorObject } from "ajv/dist/2019.js";
import type { Project } from "#type";

export interface Props {
  project: Project;
  schema: unknown;
  json: unknown;
  errors: ErrorObject[];
}

const Component: FC<Props> = props => {
  const { json, schema, errors, project } = props;
  return (
    <Flex
      gap="md"
      justify="center"
      align="stretch"
      direction="column"
      wrap="wrap"
      sx={{ overflow: "hidden" }}
    >
      <Alert project={project} />
      <JsonSection title="Error" json={errors} link="error" />
      <JsonSection title="JSON" json={json} link="json" />
      <JsonSection title="Schema" json={schema} link="schema" />
    </Flex>
  );
};

Component.displayName = "InvalidJsonPanel";
export default Component;
