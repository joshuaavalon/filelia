import { Button, createStyles } from "@mantine/core";
import { IconChevronUp } from "@tabler/icons-react";

import type { FC, MouseEventHandler, ReactNode } from "react";

interface StylesProps {
  opened: boolean;
}
const useStyles = createStyles((theme, props: StylesProps) => ({
  icon: {
    fontSize: theme.fontSizes.xl
  },
  inner: {
    flexDirection: "row"
  },
  label: {
    flex: 1
  },
  rightIcon: {
    transition: "transform 200ms ease",
    transform: props.opened ? undefined : "rotate(180deg)"
  }
}));

export interface Props {
  opened: boolean;
  icon?: ReactNode;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Component: FC<Props> = props => {
  const { onClick, label, icon, opened } = props;
  const { classes } = useStyles({ opened });
  return (
    <Button
      onClick={onClick}
      variant="default"
      leftIcon={icon}
      classNames={classes}
      rightIcon={<IconChevronUp />}
    >
      {label}
    </Button>
  );
};

Component.displayName = "CollapsePanel/Header";
export default Component;
