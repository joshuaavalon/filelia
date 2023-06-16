import {
  ActionIcon,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

import type { FC } from "react";
import type { ActionIconProps, MantineNumberSize } from "@mantine/core";

export interface Props {
  buttonSize?: MantineNumberSize;
  variant?: ActionIconProps["variant"];
  color?: ActionIconProps["color"];
  className?: string;
}

const Component: FC<Props> = props => {
  const { buttonSize, variant, className, color } = props;
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const Icon = colorScheme === "dark" ? IconSun : IconMoon;
  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size={buttonSize}
      variant={variant}
      className={className}
      color={color}
      title="Change color scheme"
    >
      <Icon size={theme.fontSizes.md} />
    </ActionIcon>
  );
};

Component.displayName = "ColorSchemeButton";
export default Component;
