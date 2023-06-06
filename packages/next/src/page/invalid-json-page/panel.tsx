import { Fragment, useMemo } from "react";
import { Flex } from "@mantine/core";
import JsonSection from "#component/json-section";
import Alert from "./alert";

import type { FC } from "react";
import type { FindProjectByIdResultSuccess } from "@filelia/plugin-api";

export interface Props {
  project: FindProjectByIdResultSuccess;
  json: unknown;
  schemaResult: {
    schema: unknown;
    errorsStr: string;
  }[];
}

const Component: FC<Props> = props => {
  const { json, project, schemaResult } = props;
  const result = useMemo(
    () =>
      schemaResult.map((result, i) => {
        const { schema, errorsStr } = result;
        const errors = JSON.parse(errorsStr);
        return (
          <Fragment key={`result-${i}`}>
            <JsonSection title="Error" json={errors} link="error" />
            <JsonSection title="Schema" json={schema} link="schema" />
          </Fragment>
        );
      }),
    [schemaResult]
  );
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
      <JsonSection title="JSON" json={json} link="json" />
      {result}
    </Flex>
  );
};

Component.displayName = "Panel";
export default Component;
