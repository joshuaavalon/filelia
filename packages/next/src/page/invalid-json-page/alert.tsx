import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

import type { FC } from "react";
import type { FindProjectByIdResultSuccess } from "@filelia/plugin-api";

export interface Props {
  project: FindProjectByIdResultSuccess;
}

const Component: FC<Props> = props => {
  const { project } = props;
  return (
    <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
      The JSON does not match the schema.
      <br />
      <br />
      {`${project.project.path}`}
    </Alert>
  );
};

Component.displayName = "Alert";
export default Component;
