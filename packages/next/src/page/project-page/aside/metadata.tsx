import { useContext, useMemo } from "react";
import { IconBinaryTree2, IconCalendar } from "@tabler/icons-react";
import ListPanel from "#component/list-panel";
import Context from "../context";

import type { FC } from "react";
import type { ListPanelItem } from "#component/list-panel";

export interface Props {
  className?: string;
}

const Component: FC<Props> = props => {
  const { className } = props;
  const {
    result: { data }
  } = useContext(Context);
  const items = useMemo(() => {
    const items: ListPanelItem[] = [];
    items.push(
      {
        key: "Created At",
        value: data.createdAt,
        icon: <IconCalendar size="1rem" />
      },
      {
        key: "Updated At",
        value: data.updatedAt,
        icon: <IconCalendar size="1rem" />
      }
    );
    return items;
  }, [data]);
  return (
    <ListPanel
      title="Metadata"
      icon={<IconBinaryTree2 />}
      items={items}
      className={className}
    />
  );
};

Component.displayName = "Metadata";
export default Component;
