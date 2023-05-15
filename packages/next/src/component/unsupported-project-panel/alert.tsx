import { Alert } from "@mantine/core";
import { TbAlertCircle } from "react-icons/tb";

import type { FC } from "react";

export interface Props {}

const Component: FC<Props> = () => (
  <Alert icon={<TbAlertCircle size="1rem" />} title="Error" color="red">
    Unsupported Project
  </Alert>
);

Component.displayName = "Alert";
export default Component;
