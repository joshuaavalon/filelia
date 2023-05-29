import { createContext, useContext } from "react";
import { Aside, createStyles, ScrollArea } from "@mantine/core";
import { useResizing } from "#hook";

import type { CSSProperties, FC, ReactNode } from "react";
import type { Disclosure } from "./type";

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

/* eslint-disable no-empty-function, @typescript-eslint/no-empty-function */
export const AsideContext = createContext<Disclosure>([
  false,
  { open: () => {}, close: () => {}, toggle: () => {} }
]);
/* eslint-enable no-empty-function, @typescript-eslint/no-empty-function */

export interface Props {
  children: ReactNode;
  scrollable?: boolean;
}

const Component: FC<Props> = props => {
  const { children, scrollable = true } = props;
  const [opened] = useContext(AsideContext);
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

Component.displayName = "Aside";
export default Component;
