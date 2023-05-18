import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { TbMoonStars, TbSun } from "react-icons/tb";

import type { FC } from "react";
import type { ActionIconProps, MantineNumberSize } from "@mantine/core";

export interface Props {
  iconSize?: string | number;
  buttonSize?: MantineNumberSize;
  variant?: ActionIconProps["variant"];
  color?: ActionIconProps["color"];
  className?: string;
}

const Component: FC<Props> = props => {
  const { iconSize, buttonSize, variant, className, color } = props;
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const icon =
    colorScheme === "dark" ? (
      <TbSun size={iconSize} style={{ width: "75%", height: "75%" }} />
    ) : (
      <TbMoonStars size={iconSize} style={{ width: "75%", height: "75%" }} />
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
