import { Box, createStyles, rem } from "@mantine/core";

import type { FC } from "react";
import type { TableOfContentItem } from "./type";

interface StyleProps {
  order: number;
}
const useStyles = createStyles((theme, props: StyleProps) => {
  const { order } = props;
  const isDark = theme.colorScheme === "dark";
  return {
    root: {
      ...theme.fn.focusStyles(),
      display: "block",
      textDecoration: "none",
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      lineHeight: 1.2,
      fontSize: theme.fontSizes.sm,
      padding: theme.spacing.xs,
      borderTopRightRadius: theme.radius.sm,
      borderBottomRightRadius: theme.radius.sm,
      borderLeft: `${rem(1)} solid ${
        isDark ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
      paddingLeft: `calc(${order} * ${theme.spacing.md})`,
      "&:hover": {
        backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[0]
      },
      '&[data-active="true"]': {
        fontWeight: 500,
        borderLeftColor: theme.colors[theme.primaryColor][isDark ? 6 : 7],
        color: theme.colors[theme.primaryColor][isDark ? 2 : 7],

        "&, &:hover": {
          backgroundColor: isDark
            ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
            : theme.colors[theme.primaryColor][0]
        }
      }
    }
  };
});

export interface Props {
  item: TableOfContentItem;
  active: string;
}

const Component: FC<Props> = props => {
  const { item, active } = props;
  const { href, label } = item;
  const { classes } = useStyles({
    order: item.order
  });
  return (
    <Box<"a">
      component="a"
      href={href}
      onClick={e => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({
          behavior: "smooth"
        });
      }}
      className={classes.root}
      data-active={active === href}
    >
      {label}
    </Box>
  );
};

Component.displayName = "TableOfContent/Item";
export default Component;
