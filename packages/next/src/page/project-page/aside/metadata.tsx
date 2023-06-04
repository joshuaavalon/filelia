import { useContext, useMemo } from "react";
import {
  IconBinaryTree2,
  IconBrandGumroad,
  IconBrandPatreon,
  IconCalendar,
  IconPhoto,
  IconQuestionMark,
  IconUser
} from "@tabler/icons-react";
import ListPanel from "#component/list-panel";
import Context from "../context";
import type { FC, MouseEventHandler } from "react";
import type { ListPanelItem } from "#component/list-panel";

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
      let Icon = IconQuestionMark;
      switch (metadata.icon) {
        case "user":
          Icon = IconUser;
          break;
        case "patreon":
          Icon = IconBrandPatreon;
          break;
        case "photo":
          Icon = IconPhoto;
          break;
        case "gumroad":
          Icon = IconBrandGumroad;
          break;
        default:
          Icon = IconQuestionMark;
      }
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
