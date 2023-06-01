import { useCallback } from "react";
import { ActionIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconRefresh } from "@tabler/icons-react";

import type { FC, MouseEventHandler } from "react";
import type { ActionIconProps, MantineNumberSize } from "@mantine/core";

export interface Props {
  buttonSize?: MantineNumberSize;
  variant?: ActionIconProps["variant"];
  color?: ActionIconProps["color"];
  className?: string;
}

const Component: FC<Props> = props => {
  const { buttonSize, variant, className, color } = props;
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(async e => {
    e.preventDefault();
    const res = await fetch("/api/refresh", { method: "POST" });
    if (res.status !== 200) {
      notifications.show({
        title: "Error",
        message: "Unknown server error",
        color: "red"
      });
    }
    const result = await res.json();
    if (result.indexing) {
      notifications.show({
        title: "Warning",
        message: "Index is already refreshing",
        color: "yellow"
      });
    } else {
      notifications.show({
        title: "Success",
        message: "Index starts refreshing",
        color: "green"
      });
    }
  }, []);
  return (
    <ActionIcon
      size={buttonSize}
      variant={variant}
      color={color}
      className={className}
      title="Refresh index"
      onClick={onClick}
    >
      <IconRefresh size="1rem" />
    </ActionIcon>
  );
};

Component.displayName = "RefreshIndexButton";
export default Component;
