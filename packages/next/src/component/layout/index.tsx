import { AppShell, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Navbar, { NavbarContext } from "./navbar";
import Aside, { AsideContext } from "./aside";
import Header from "./header";

import type { FC, ReactNode } from "react";

const useStyle = createStyles(theme => ({
  main: {
    overflow: "hidden",
    // https://github.com/mantinedev/mantine/issues/4269
    [theme.fn.smallerThan("md")]: {
      paddingLeft: theme.spacing.md
    }
  }
}));

export interface Props {
  children: ReactNode;
  aside?: ReactNode;
}

const Component: FC<Props> = props => {
  const { children, aside: asideContent } = props;
  const { classes } = useStyle();
  const navbar = useDisclosure(false);
  const aside = useDisclosure(false);
  const hasAside = Boolean(aside);
  const asideElm = hasAside ? <Aside>{asideContent}</Aside> : undefined;
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
          classNames={classes}
        >
          {children}
        </AppShell>
      </AsideContext.Provider>
    </NavbarContext.Provider>
  );
};

Component.displayName = "Layout";
export default Component;
