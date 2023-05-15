import { Flex, Title } from "@mantine/core";
import { Prism } from "@mantine/prism";
import Alert from "./alert";

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
      <Title order={2}>Raw JSON</Title>
      <Prism language="json" withLineNumbers>
        {JSON.stringify(json, null, 2)}
      </Prism>
    </Flex>
  );
};

Component.displayName = "UnsupportedProjectPanel";
export default Component;
