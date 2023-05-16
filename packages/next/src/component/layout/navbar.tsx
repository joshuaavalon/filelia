import { createContext, useContext } from "react";
import { Navbar, Text } from "@mantine/core";
import { useResizing } from "#hook";
import { useStyles } from "./style";

import type { CSSProperties, FC } from "react";
import type { OpenContext } from "./type";

export const NavbarContext = createContext<OpenContext>({
  opened: false,
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  toggleOpened: () => {}
});

export interface Props {}

const Component: FC<Props> = () => {
  const { opened } = useContext(NavbarContext);
  const { classes } = useStyles();
  const isResizing = useResizing();
  const style = {
    "--sidebar-translate-x": opened ? 0 : "-100%",
    "--sidebar-transition-ms": isResizing ? 0 : "500ms"
  } as CSSProperties;
  return (
    <>
      <Navbar
        hiddenBreakpoint="md"
        width={{ md: 200, lg: 250, xl: 300 }}
        style={style}
        className={classes.sidebar}
      >
        <Text>Application navbar</Text>
      </Navbar>
    </>
  );
};

Component.displayName = "Navbar";
export default Component;
