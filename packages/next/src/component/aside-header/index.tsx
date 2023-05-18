import { useCallback } from "react";
import { Group, Text } from "@mantine/core";

import type { FC, MouseEventHandler, ReactNode } from "react";
import type { MantineTheme } from "@mantine/core";

export interface Props {
  icon: ReactNode;
  label: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Component: FC<Props> = props => {
  const { onClick, label, icon } = props;
  const sx = useCallback(
    (theme: MantineTheme) => {
      const colors = theme.fn.variant({
        color: theme.primaryColor,
        variant: "outline"
      });
      return {
        cursor: onClick ? "pointer" : undefined,
        "&:hover": onClick
          ? {
              background: colors.background,
              color: colors.color
            }
          : undefined
      };
    },
    [onClick]
  );
  return (
    <Group onClick={onClick} sx={sx}>
      {icon}
      <Text>{label}</Text>
    </Group>
  );
};

Component.displayName = "AsideHeader";
export default Component;
