import { useCallback } from "react";
import { useFormContext } from "#page/search-page/context";
import { Badge, createStyles } from "@mantine/core";

import type { FC, MouseEventHandler } from "react";
import type { Tag } from "@prisma/client";

const useStyles = createStyles({
  root: {
    cursor: "pointer"
  }
});

export interface Props {
  tag: Tag;
}

const Component: FC<Props> = props => {
  const { tag } = props;
  const { classes } = useStyles();
  const form = useFormContext();
  const onClick: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.preventDefault();
      if (!form.values.andTags.includes(tag.name)) {
        form.insertListItem("andTags", tag.name);
      }
    },
    [form, tag.name]
  );
  return (
    <Badge className={classes.root} onClick={onClick}>
      {tag.name}
    </Badge>
  );
};

Component.displayName = "SearchPage/Panel/ResultSection/Badge";
export default Component;
