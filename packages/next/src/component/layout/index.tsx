import { useCallback, useState } from "react";
import { AppShell } from "@mantine/core";
import Navbar, { NavbarContext } from "./navbar";
import Aside, { AsideContext } from "./aside";
import Header from "./header";

import type { FC, ReactNode } from "react";

export interface Props {
  children: ReactNode;
  aside?: ReactNode;
}

const Component: FC<Props> = props => {
  const { children, aside } = props;
  const [navbarOpened, setNavbarOpened] = useState(false);
  const [asideOpened, setAsideOpened] = useState(false);

  const toggleNavbar = useCallback(() => {
    setAsideOpened(false);
    setNavbarOpened(o => !o);
  }, []);
  const hasAside = Boolean(aside);
  const asideElm = hasAside ? <Aside>{aside}</Aside> : undefined;
  const toggleAside = useCallback(() => {
    setNavbarOpened(false);
    setAsideOpened(o => !o);
  }, []);
  return (
    <NavbarContext.Provider
      value={{ opened: navbarOpened, toggleOpened: toggleNavbar }}
    >
      <AsideContext.Provider
        value={{ opened: asideOpened, toggleOpened: toggleAside }}
      >
        <AppShell
          padding="md"
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          aside={asideElm}
          navbar={<Navbar />}
          header={<Header hasAside={hasAside} />}
        >
          {children}
        </AppShell>
      </AsideContext.Provider>
    </NavbarContext.Provider>
  );
};

Component.displayName = "Layout";
export default Component;
