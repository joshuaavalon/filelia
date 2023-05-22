import { useCallback, useEffect } from "react";
import { TbList } from "react-icons/tb";
import CollapsePanel from "#component/collapse-panel";
import Items from "./items";
import { getActiveElement, notEmpty } from "./utils";

import type { FC } from "react";
import type { Sx } from "@mantine/core";
import type { TableOfContentItem } from "./type";

export type { TableOfContentItem } from "./type";

export interface Props {
  items: TableOfContentItem[];
  active: string;
  setActive: (active: string) => void;
  sx?: Sx;
}

const Component: FC<Props> = props => {
  const { items, active, setActive, sx } = props;
  const handleScroll = useCallback(() => {
    const elements = items
      .map(item => document.querySelector(item.href))
      .filter(notEmpty);
    const ids = elements.map(e => e.id);
    const index = getActiveElement(
      elements.map(e => e.getBoundingClientRect())
    );
    setActive(`#${ids[index]}`);
  }, [items, setActive]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  return (
    <CollapsePanel title="Table of contents" icon={<TbList />} sx={sx}>
      <Items items={items} active={active} />
    </CollapsePanel>
  );
};

Component.displayName = "TableOfContent";
export default Component;
