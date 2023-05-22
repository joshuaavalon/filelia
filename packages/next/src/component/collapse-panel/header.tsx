import { createStyles, Group, Text, UnstyledButton } from "@mantine/core";

import type { FC, MouseEventHandler, ReactNode } from "react";

const useStyle = createStyles(theme => {
  const colors = theme.fn.variant({
    color: theme.primaryColor,
    variant: "outline"
  });
  return {
    text: {
      fontSize: theme.fontSizes.md
    },
    button: {
      ...theme.fn.hover({ color: colors.color })
    }
  };
});

export interface Props {
  icon?: ReactNode;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Component: FC<Props> = props => {
  const { onClick, label, icon } = props;
  const { classes } = useStyle();
  return (
    <UnstyledButton onClick={onClick} className={classes.button}>
      <Group>
        {icon}
        <Text>{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

Component.displayName = "CollapsePanelHeader";
export default Component;
