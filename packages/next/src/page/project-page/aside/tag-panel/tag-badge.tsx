import { useCallback } from "react";
import { useRouter } from "next/router";
import { Badge, Center, createStyles } from "@mantine/core";
import { IconHash } from "@tabler/icons-react";

import type { FC } from "react";

const useStyles = createStyles({
  root: {
    textTransform: "none",
    cursor: "pointer"
  }
});

export interface Props {
  tag: string;
}

const Component: FC<Props> = props => {
  const { tag } = props;
  const { classes } = useStyles();
  const router = useRouter();
  const onClick = useCallback(() => {
    if (!tag) {
      return;
    }
    router.push({ pathname: "/search", query: { andTags: tag } });
  }, [tag, router]);
  return (
    <Badge
      size="lg"
      leftSection={
        <Center>
          <IconHash size="1rem" />
        </Center>
      }
      radius="sm"
      onClick={onClick}
      classNames={classes}
    >
      {tag}
    </Badge>
  );
};

Component.displayName = "TagBadge";
export default Component;
