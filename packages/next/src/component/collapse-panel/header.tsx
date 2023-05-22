import { createStyles, Group, Text } from "@mantine/core";

import type { FC, MouseEventHandler, ReactNode } from "react";

const useStyle = createStyles(theme => {
  const colors = theme.fn.variant({
    color: theme.primaryColor,
    variant: "outline"
  });
  return {
    group: {
      cursor: "pointer",
      "&:hover": {
        background: colors.background,
        color: colors.color
      }
    },
    text: {
      fontSize: theme.fontSizes.md
    }
  };
});

export interface Props {
  icon?: ReactNode;
  label: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Component: FC<Props> = props => {
  const { onClick, label, icon } = props;
  const { classes } = useStyle();
  return (
    <Group onClick={onClick} className={classes.group}>
      {icon}
      <Text>{label}</Text>
    </Group>
  );
};

Component.displayName = "CollapsePanelHeader";
export default Component;
