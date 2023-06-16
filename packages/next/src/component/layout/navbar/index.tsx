import { useContext } from "react";
import { createStyles, Navbar, ScrollArea } from "@mantine/core";
import { useResizing } from "#hook";
import LayoutContext from "../context";
import SearchInput from "./search-input";
import Buttons from "./buttons";
import TagsButton from "./tags-button";

import type { CSSProperties, FC } from "react";

const useStyles = createStyles(theme => ({
  navbar: {
    [theme.fn.smallerThan("md")]: {
      transform: "translateX(var(--navbar-translate-x))",
      transition: "transform var(--navbar-transition-ms, 0) ease"
    }
  }
}));

export interface Props {}

const Component: FC<Props> = () => {
  const {
    navbar: [opened]
  } = useContext(LayoutContext);
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
        width={{ sm: 300, md: 250, lg: 250, xl: 300 }}
      >
        <Navbar.Section mb="md" px="md" pt="md">
          <SearchInput />
        </Navbar.Section>
        <Navbar.Section grow component={ScrollArea} px="md">
          <TagsButton />
        </Navbar.Section>
        <Navbar.Section p="md">
          <Buttons />
        </Navbar.Section>
      </Navbar>
    </>
  );
};

Component.displayName = "Layout/Navbar";
export default Component;
