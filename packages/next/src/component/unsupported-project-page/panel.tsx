import { Flex } from "@mantine/core";
import Alert from "./alert";
import JsonSection from "./json-section";

import type { FC } from "react";
import type { Project } from "#type";

export interface Props {
  project: Project;
  json: unknown;
}

const Component: FC<Props> = props => {
  const { json } = props;
  return (
    <Flex
      gap="md"
      justify="center"
      align="stretch"
      direction="column"
      wrap="wrap"
    >
      <Alert />
      <JsonSection title="JSON" json={json} link="json" />
    </Flex>
  );
};

Component.displayName = "UnsupportedProjectPanel";
export default Component;
