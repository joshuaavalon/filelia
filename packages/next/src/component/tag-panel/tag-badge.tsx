import { Badge, Center } from "@mantine/core";
import { IconHash } from "@tabler/icons-react";

import type { FC } from "react";

export interface Props {
  tag: string;
}

const Component: FC<Props> = props => {
  const { tag } = props;
  return (
    <Badge
      size="lg"
      leftSection={
        <Center>
          <IconHash />
        </Center>
      }
      radius="sm"
      sx={{ textTransform: "none", cursor: "pointer" }}
    >
      {tag}
    </Badge>
  );
};

Component.displayName = "TagBadge";
export default Component;
