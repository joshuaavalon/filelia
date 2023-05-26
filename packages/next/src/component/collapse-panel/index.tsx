import { Collapse, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CollapsePanelHeader from "./header";

import type { FC, ReactNode } from "react";
import type { Sx } from "@mantine/core";

export interface Props {
  icon?: ReactNode;
  title: string;
  sx?: Sx;
  children?: ReactNode;
  className?: string;
}

const Component: FC<Props> = props => {
  const { sx, children, title, icon, className } = props;
  const [opened, { toggle }] = useDisclosure(true);
  return (
    <Stack sx={sx} spacing="sm" className={className}>
      <CollapsePanelHeader
        onClick={toggle}
        label={title}
        icon={icon}
        opened={opened}
      />
      <Collapse in={opened}>{children}</Collapse>
    </Stack>
  );
};

Component.displayName = "CollapsePanel";
export default Component;
