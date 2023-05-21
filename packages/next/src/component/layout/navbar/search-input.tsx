import type { DefaultProps } from "@mantine/core";
import { createStyles, Group, rem, Text, UnstyledButton } from "@mantine/core";
import { TbSearch } from "react-icons/tb";

import type { ComponentPropsWithoutRef, FC } from "react";

const useStyles = createStyles(theme => ({
  root: {
    width: "100%",
    height: rem(34),
    paddingLeft: theme.spacing.sm,
    paddingRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors.dark[5], 0.85)
          : theme.fn.rgba(theme.colors.gray[0], 0.35)
    }
  }
}));

export interface Props
  extends DefaultProps,
    ComponentPropsWithoutRef<"button"> {}

const Component: FC<Props> = props => {
  const { className, ...others } = props;
  const { classes, cx } = useStyles();
  return (
    <UnstyledButton {...others} className={cx(classes.root, className)}>
      <Group spacing="xs">
        <TbSearch size="1rem" />
        <Text size="sm" color="dimmed" pr={80}>
          Search
        </Text>
      </Group>
    </UnstyledButton>
  );
};

Component.displayName = "SearchInput";
export default Component;
