import { CloseButton } from "@mantine/core";
import { TbHash, TbKey } from "react-icons/tb";
import useStyles from "./value.styles";

import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import type { DefaultProps } from "@mantine/core";
import type {
  MantineNumberSize,
  MantineSize,
  Selectors
} from "@mantine/styles";

export type ValueStylesNames = Selectors<typeof useStyles>;

export interface Props
  extends DefaultProps<ValueStylesNames>,
    ComponentPropsWithoutRef<"div"> {
  label: string;
  onRemove: () => void;
  disabled: boolean;
  readOnly: boolean;
  size: MantineSize;
  radius: MantineNumberSize;
  variant: string;
  value: string;
}

const buttonSizes: Record<string, MantineNumberSize> = {
  xs: 16,
  sm: 22,
  md: 24,
  lg: 26,
  xl: 30
};

const Component: FC<Props> = props => {
  const {
    classNames,
    styles,
    className,
    onRemove,
    disabled,
    readOnly,
    size,
    radius = "sm",
    variant,
    unstyled,
    value: jsonValue,
    ...others
  } = props;
  const { classes, cx } = useStyles(
    { disabled, readOnly, radius },
    { name: "MultiSelect", classNames, styles, unstyled, size, variant }
  );
  const { label, type } = JSON.parse(jsonValue);
  console.log(jsonValue);
  let icon: ReactNode;
  switch (type) {
    case "tag":
      icon = <TbHash />;
      break;
    case "keyword":
      icon = <TbKey />;
      break;
    default:
      icon = undefined;
  }
  return (
    <div className={cx(classes.defaultValue, className)} {...others}>
      {icon}
      <span className={classes.defaultValueLabel}>{label}</span>

      {!disabled && !readOnly && (
        <CloseButton
          aria-hidden
          onMouseDown={onRemove}
          size={buttonSizes[size]}
          radius={2}
          color="blue"
          variant="transparent"
          iconSize="70%"
          className={classes.defaultValueRemove}
          tabIndex={-1}
          unstyled={unstyled}
        />
      )}
    </div>
  );
};

Component.displayName = "SearchPage/Input/Value";
export default Component;
