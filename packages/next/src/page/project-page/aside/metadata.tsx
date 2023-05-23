import { useContext, useMemo } from "react";
import { TbBinaryTree2, TbCalendar } from "react-icons/tb";
import ListPanel from "#component/list-panel";
import { ProjectContext } from "../context";

import type { FC } from "react";
import type { ListPanelItem } from "#component/list-panel";

export interface Props {}

const Component: FC<Props> = () => {
  const {
    result: { data }
  } = useContext(ProjectContext);
  const items = useMemo(() => {
    const items: ListPanelItem[] = [];
    items.push(
      {
        key: "Created At",
        value: data.createdAt,
        icon: <TbCalendar />
      },
      {
        key: "Updated At",
        value: data.updatedAt,
        icon: <TbCalendar />
      }
    );
    return items;
  }, [data]);
  return <ListPanel title="Metadata" icon={<TbBinaryTree2 />} items={items} />;
};

Component.displayName = "Metadata";
export default Component;
