import { createStyles, List, ThemeIcon } from "@mantine/core";

import type { FC, ReactNode } from "react";

const useStyles = createStyles(theme => ({
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    alignItems: "stretch"
  },
  key: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: theme.fontSizes.xs,
    color: theme.fn.dimmed(),
    lineHeight: theme.fontSizes.xs
  },
  value: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: theme.fontSizes.md,
    lineHeight: theme.fontSizes.md
  }
}));

export interface ListPanelItem {
  key: string;
  icon?: ReactNode;
  value: ReactNode;
}

export interface Props {
  item: ListPanelItem;
}

const Component: FC<Props> = props => {
  const {
    item: { key, icon, value }
  } = props;
  const { classes } = useStyles();
  return (
    <List.Item icon={<ThemeIcon variant="default">{icon}</ThemeIcon>}>
      <div className={classes.item}>
        <div className={classes.value}>{value}</div>
        <div className={classes.key}>{key}</div>
      </div>
    </List.Item>
  );
};

Component.displayName = "ListPanelItem";
export default Component;
