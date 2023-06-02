import { createStyles, List, ThemeIcon } from "@mantine/core";

import type { FC, MouseEventHandler, ReactNode } from "react";

interface StyleProps {
  onClick?: MouseEventHandler<HTMLLIElement>;
}

const useStyles = createStyles((theme, props: StyleProps) => ({
  root: {
    cursor: props.onClick ? "pointer" : undefined
  },
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
  onClick?: MouseEventHandler<HTMLLIElement>;
}

export interface Props {
  item: ListPanelItem;
}

const Component: FC<Props> = props => {
  const {
    item: { key, icon, value, onClick }
  } = props;
  const { classes } = useStyles({ onClick });
  return (
    <List.Item
      className={classes.root}
      icon={<ThemeIcon variant="default">{icon}</ThemeIcon>}
      onClick={onClick}
    >
      <div className={classes.item}>
        <div className={classes.value}>{value}</div>
        <div className={classes.key}>{key}</div>
      </div>
    </List.Item>
  );
};

Component.displayName = "ListPanelItem";
export default Component;
