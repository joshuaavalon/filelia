import { useMemo } from "react";
import { createStyles, List } from "@mantine/core";
import CollapsePanel from "#component/collapse-panel";
import Item from "./item";

import type { FC, ReactNode } from "react";
import type { Sx } from "@mantine/core";
import type { ListPanelItem } from "./item";

export type { ListPanelItem } from "./item";

const useStyle = createStyles(theme => ({
  itemIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: theme.fontSizes.md
  },
  itemWrapper: {
    alignItems: "stretch !important",
    width: "100%",
    "& :nth-of-type(2)": {
      flex: 1
    }
  }
}));

export interface Props {
  title: string;
  icon?: ReactNode;
  sx?: Sx;
  items: ListPanelItem[];
  className?: string;
}

const Component: FC<Props> = props => {
  const { title, icon, sx, items, className } = props;
  const { classes } = useStyle();
  const listItems = useMemo(
    () => items.map(item => <Item key={item.key} item={item} />),
    [items]
  );
  return (
    <CollapsePanel title={title} icon={icon} sx={sx} className={className}>
      <List classNames={classes} spacing="xs">
        {listItems}
      </List>
    </CollapsePanel>
  );
};

Component.displayName = "ListPanel";
export default Component;
