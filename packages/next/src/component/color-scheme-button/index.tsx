import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

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
  const icon =
    colorScheme === "dark" ? (
      <IconSun size="1rem" />
    ) : (
      <IconMoonStars size="1rem" />
    );
  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size={buttonSize}
      variant={variant}
      className={className}
      color={color}
      title="Change color scheme"
    >
      {icon}
    </ActionIcon>
  );
};

Component.displayName = "ColorSchemeButton";
export default Component;
