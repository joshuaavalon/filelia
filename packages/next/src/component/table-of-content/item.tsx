import { Box, createStyles, rem } from "@mantine/core";

import type { FC } from "react";
import type { TableOfContentItem } from "./type";

const useStyles = createStyles(theme => ({
  link: {
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
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
    }
  },

  linkActive: {
    fontWeight: 500,
    borderLeftColor:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 6 : 7],
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 2 : 7],

    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0]
    }
  }
}));

export interface Props {
  item: TableOfContentItem;
  active: string;
}

const Component: FC<Props> = props => {
  const { item, active } = props;
  const { href, label } = item;
  const { classes, cx } = useStyles();

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
      className={cx(classes.link, {
        [classes.linkActive]: active === href
      })}
      sx={theme => ({
        paddingLeft: `calc(${item.order} * ${theme.spacing.md})`
      })}
    >
      {label}
    </Box>
  );
};

Component.displayName = "TableOfContentItem";
export default Component;
