import { useMemo } from "react";
import { Stack } from "@mantine/core";
import Item from "./item";

import type { FC } from "react";
import type { TableOfContentItem } from "./type";

export interface Props {
  items: TableOfContentItem[];
  active: string;
}

const Component: FC<Props> = props => {
  const { items, active } = props;
  const itemList = useMemo(
    () =>
      items.map(item => <Item key={item.label} item={item} active={active} />),
    [items, active]
  );
  return <Stack spacing={0}>{itemList}</Stack>;
};

Component.displayName = "TableOfContent/Items";
export default Component;
