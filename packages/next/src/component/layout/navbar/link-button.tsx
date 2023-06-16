import {
  createStyles,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton
} from "@mantine/core";

import type { FC, MouseEventHandler, ReactNode } from "react";

const useStyles = createStyles(theme => ({
  root: {
    display: "block",
    width: "100%",
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
    }
  }
}));

export interface Props {
  icon: ReactNode;
  color: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Component: FC<Props> = props => {
  const { icon, color, children, onClick } = props;
  const { classes } = useStyles();
  return (
    <UnstyledButton className={classes.root} onClick={onClick}>
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text size="sm">{children}</Text>
      </Group>
    </UnstyledButton>
  );
};

Component.displayName = "Layout/Navbar/LinkButton";
export default Component;
