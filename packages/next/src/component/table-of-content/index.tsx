import { useCallback, useEffect } from "react";
import { Collapse, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "./header";
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
  const [opened, { toggle }] = useDisclosure(true);

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
    <Stack sx={sx}>
      <Header onClick={toggle} />
      <Collapse in={opened}>
        <Items items={items} active={active} />
      </Collapse>
    </Stack>
  );
};

Component.displayName = "TableOfContent";
export default Component;
