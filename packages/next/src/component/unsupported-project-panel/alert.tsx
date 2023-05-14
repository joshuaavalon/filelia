import { Alert, List, Text } from "@mantine/core";
import { TbAlertCircle } from "react-icons/tb";

import type { FC } from "react";
import type { Project } from "@prisma/client";

export interface Props {
  project: Project;
}

const Component: FC<Props> = props => {
  const { project } = props;
  return (
    <Alert icon={<TbAlertCircle size="1rem" />} title="Error" color="red">
      <Text>Unsupported Project</Text>
      <List size="sm">
        <List.Item>Type: {project.type}</List.Item>
        <List.Item>ID: {project.id}</List.Item>
      </List>
    </Alert>
  );
};

Component.displayName = "Alert";
export default Component;
