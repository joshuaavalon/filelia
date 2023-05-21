import { createContext, useContext } from "react";
import { createStyles, Navbar, Text } from "@mantine/core";
import { useResizing } from "#hook";
import SearchInput from "./search-input";
import Buttons from "./buttons";

import type { CSSProperties, FC } from "react";
import type { Disclosure } from "../type";

const useStyles = createStyles(theme => ({
  navbar: {
    padding: theme.spacing.md,
    [theme.fn.smallerThan("md")]: {
      transform: "translateX(var(--navbar-translate-x))",
      transition: "transform var(--navbar-transition-ms, 0) ease"
    }
  }
}));

/* eslint-disable no-empty-function, @typescript-eslint/no-empty-function */
export const NavbarContext = createContext<Disclosure>([
  false,
  { open: () => {}, close: () => {}, toggle: () => {} }
]);
/* eslint-enable no-empty-function, @typescript-eslint/no-empty-function */

export interface Props {}

const Component: FC<Props> = () => {
  const [opened] = useContext(NavbarContext);
  const { classes } = useStyles();
  const isResizing = useResizing();
  const style = {
    "--navbar-translate-x": opened ? 0 : "-100%",
    "--navbar-transition-ms": isResizing ? 0 : "500ms"
  } as CSSProperties;
  return (
    <>
      <Navbar
        hiddenBreakpoint="md"
        style={style}
        className={classes.navbar}
        width={{ sm: 300, md: 200, lg: 250, xl: 300 }}
      >
        <Navbar.Section mb="md">
          <SearchInput />
        </Navbar.Section>
        <Navbar.Section grow>
          <Text>Application navbar</Text>
        </Navbar.Section>
        <Navbar.Section>
          <Buttons />
        </Navbar.Section>
      </Navbar>
    </>
  );
};

Component.displayName = "Navbar";
export default Component;
