import { useCallback, useContext } from "react";
import { Badge, Center, createStyles } from "@mantine/core";
import { IconHash, IconKey } from "@tabler/icons-react";
import { useFormContext } from "#page/search-page/context";
import Context from "./context";

import type { FC } from "react";

const useStyles = createStyles({
  root: {
    textTransform: "none",
    cursor: "pointer",
    justifyContent: "flex-start"
  }
});

export interface Props {
  index: number;
  tag: string;
}

const Component: FC<Props> = props => {
  const { tag, index } = props;
  const { key, type } = useContext(Context);
  const form = useFormContext();
  const onClick = useCallback(() => {
    form.removeListItem(key, index);
  }, [form, key, index]);
  const { classes } = useStyles();
  return (
    <Badge
      size="lg"
      leftSection={
        <Center>{type === "tag" ? <IconHash /> : <IconKey />}</Center>
      }
      radius="sm"
      classNames={classes}
      onClick={onClick}
      fullWidth
    >
      {tag}
    </Badge>
  );
};

Component.displayName = "TagBadge";
export default Component;
