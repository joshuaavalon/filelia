import { useContext, useMemo } from "react";
import {
  IconBinaryTree2,
  IconCalendar,
  IconQuestionMark
} from "@tabler/icons-react";
import * as Icons from "@tabler/icons-react";
import ListPanel from "#component/list-panel";
import Context from "../context";

import type { FC, MouseEventHandler } from "react";
import type { Icon } from "@tabler/icons-react";
import type { ListPanelItem } from "#component/list-panel";

const iconList = Object.keys(Icons)
  .filter(key => key.startsWith("Icon"))
  .reduce((map, key) => {
    const icon = Icons[key as keyof typeof Icons] as Icon;
    if (icon) {
      map.set(key, icon);
    }
    return map;
  }, new Map<string, Icon>());

export interface Props {
  className?: string;
}

function wrapOnClick(
  url?: string
): MouseEventHandler<HTMLLIElement> | undefined {
  if (!url) {
    return undefined;
  }
  return () => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) {
      newWindow.opener = null;
    }
  };
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
    for (const metadata of data.metadata) {
      const Icon = iconList.get(metadata.icon ?? "") ?? IconQuestionMark;
      items.push({
        key: metadata.label,
        value: metadata.value,
        onClick: wrapOnClick(metadata.link),
        icon: <Icon size="1rem" />
      });
    }
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
