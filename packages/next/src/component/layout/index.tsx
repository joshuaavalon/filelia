import { AppShell, createStyles, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Navbar, { NavbarContext } from "./navbar";
import Aside, { AsideContext } from "./aside";
import Header from "./header";

import type { FC, ReactNode } from "react";

const useStyles = createStyles(theme => ({
  main: {
    overflow: "hidden",
    paddingTop: "var(--mantine-header-height, 0px)",
    paddingBottom: "var(--mantine-footer-height, 0px)",
    paddingLeft: "var(--mantine-navbar-width, 0px)",
    paddingRight: "var(--mantine-aside-width, 0px)",
    [theme.fn.smallerThan("md")]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  root: {
    height:
      "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))",
    padding: theme.spacing.md
  },
  viewport: {
    wordBreak: "break-all",
    "> div": {
      display: "block !important"
    }
  }
}));

export interface Props {
  className?: string;
  children: ReactNode;
  aside?: ReactNode;
  asideScrollable?: boolean;
}

const Component: FC<Props> = props => {
  const { children, aside: asideContent, asideScrollable, className } = props;
  const {
    classes: { main, root, viewport }
  } = useStyles();
  const navbar = useDisclosure(false);
  const aside = useDisclosure(false);
  const hasAside = Boolean(asideContent);
  const asideElm = hasAside ? (
    <Aside scrollable={asideScrollable}>{asideContent}</Aside>
  ) : undefined;
  return (
    <NavbarContext.Provider value={navbar}>
      <AsideContext.Provider value={aside}>
        <AppShell
          padding="md"
          navbarOffsetBreakpoint="md"
          asideOffsetBreakpoint="md"
          aside={asideElm}
          navbar={<Navbar />}
          header={<Header hasAside={hasAside} />}
          classNames={{ main, root: className }}
        >
          <ScrollArea classNames={{ root, viewport }}>{children}</ScrollArea>
        </AppShell>
      </AsideContext.Provider>
    </NavbarContext.Provider>
  );
};

Component.displayName = "Layout";
export default Component;
