import { useContext } from "react";
import { Aside, createStyles, ScrollArea } from "@mantine/core";
import { useResizing } from "#hook";
import LayoutContext from "./context";

import type { CSSProperties, FC, ReactNode } from "react";

const useStyles = createStyles(theme => ({
  aside: {
    [theme.fn.smallerThan("md")]: {
      transform: "translateX(var(--aside-translate-x))",
      transition: "transform var(--aside-transition-ms, 0) ease"
    }
  },
  root: {
    height: "100%",
    padding: theme.spacing.md
  },
  viewport: {
    "> div": {
      display: "block !important"
    }
  }
}));

export interface Props {
  children: ReactNode;
  scrollable?: boolean;
}

const Component: FC<Props> = props => {
  const { children, scrollable = true } = props;
  const {
    aside: [opened]
  } = useContext(LayoutContext);
  const {
    classes: { aside, viewport, root }
  } = useStyles();
  const isResizing = useResizing();

  const style = {
    "--aside-translate-x": opened ? 0 : "100%",
    "--aside-transition-ms": isResizing ? 0 : "500ms"
  } as CSSProperties;
  return (
    <Aside
      hiddenBreakpoint="md"
      style={style}
      className={aside}
      width={{ sm: 300, md: 250, lg: 250, xl: 300 }}
    >
      {scrollable ? (
        <ScrollArea classNames={{ viewport, root }}>{children}</ScrollArea>
      ) : (
        children
      )}
    </Aside>
  );
};

Component.displayName = "Layout/Aside";
export default Component;
