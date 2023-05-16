import { createContext, useContext } from "react";
import { Aside } from "@mantine/core";
import { useResizing } from "#hook";
import { useStyles } from "./style";

import type { CSSProperties, FC, ReactNode } from "react";
import type { OpenContext } from "./type";

export const AsideContext = createContext<OpenContext>({
  opened: false,
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  toggleOpened: () => {}
});

export interface Props {
  children: ReactNode;
}

const Component: FC<Props> = props => {
  const { children } = props;
  const { opened } = useContext(AsideContext);
  const { classes } = useStyles();
  const isResizing = useResizing();

  const style = {
    "--sidebar-translate-x": opened ? 0 : "100%",
    "--sidebar-transition-ms": isResizing ? 0 : "500ms"
  } as CSSProperties;
  return (
    <Aside
      hiddenBreakpoint="md"
      width={{ md: 200, lg: 250, xl: 300 }}
      style={style}
      className={classes.sidebar}
      id="asd"
    >
      {children}
    </Aside>
  );
};

Component.displayName = "Aside";
export default Component;
