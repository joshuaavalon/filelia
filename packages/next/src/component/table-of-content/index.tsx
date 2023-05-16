import { useCallback, useEffect, useMemo } from "react";
import { Box, Group, Stack, Text } from "@mantine/core";
import { TbList } from "react-icons/tb";
import { useStyles } from "./style";
import { getActiveElement, notEmpty } from "./utils";

import type { FC } from "react";
import type { Sx } from "@mantine/core";

export interface TableOfContentLink {
  label: string;
  link: string;
  order: number;
}

export interface Props {
  links: TableOfContentLink[];
  active: string;
  setActive: (active: string) => void;
  sx?: Sx;
}

const Component: FC<Props> = props => {
  const { links, active, setActive, sx } = props;
  const { classes, cx } = useStyles();

  const items = useMemo(
    () =>
      links.map(item => (
        <Box<"a">
          component="a"
          href={item.link}
          onClick={e => {
            e.preventDefault();
            document.querySelector(item.link)?.scrollIntoView({
              behavior: "smooth"
            });
          }}
          key={item.label}
          className={cx(classes.link, {
            [classes.linkActive]: active === item.link
          })}
          sx={theme => ({
            paddingLeft: `calc(${item.order} * ${theme.spacing.md})`
          })}
        >
          {item.label}
        </Box>
      )),
    [links, active, classes.linkActive, classes.link, cx]
  );

  const handleScroll = useCallback(() => {
    const elements = links
      .map(item => document.querySelector(item.link))
      .filter(notEmpty);
    const ids = elements.map(e => e.id);
    const index = getActiveElement(
      elements.map(e => e.getBoundingClientRect())
    );
    setActive(`#${ids[index]}`);
  }, [links, setActive]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  return (
    <Stack spacing={0} sx={sx}>
      <Group mb="md">
        <TbList size="1.1rem" />
        <Text>Table of contents</Text>
      </Group>
      {items}
    </Stack>
  );
};

Component.displayName = "TableOfContent";
export default Component;
