import { forwardRef } from "react";
import { createStyles, rem } from "@mantine/styles";
import { TbHash, TbKey } from "react-icons/tb";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

const useStyles = createStyles({
  root: {
    display: "flex",
    justifyContent: "stretch",
    alignItems: "stretch",
    flexDirection: "row"
  },
  icon: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "100%",
    width: rem(22)
  },
  label: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1
  }
});

export interface Props extends Omit<ComponentPropsWithoutRef<"div">, "value"> {
  label: ReactNode;
  value: string;
}

const Component = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { value: jsonValue, className, ...others } = props;
  const { value, label, type } = JSON.parse(jsonValue);
  const { cx, classes } = useStyles();
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
    <div ref={ref} className={cx(className, classes.root)} {...others}>
      <div className={classes.icon}>{icon}</div>
      <div className={classes.label}>{label || value}</div>
    </div>
  );
});

Component.displayName = "SearchPage/Input/Item";
export default Component;
