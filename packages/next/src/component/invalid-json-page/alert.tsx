import { Alert } from "@mantine/core";
import { TbAlertCircle } from "react-icons/tb";

import type { FC } from "react";
import type { Project } from "#type";

export interface Props {
  project: Project;
}

const Component: FC<Props> = props => {
  const { project } = props;
  return (
    <Alert icon={<TbAlertCircle size="1rem" />} title="Error" color="red">
      The JSON does not match the schema.
      <br />
      <br />
      {`${project.path}`}
    </Alert>
  );
};

Component.displayName = "Alert";
export default Component;
