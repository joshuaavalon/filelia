import { useState } from "react";
import { AppShell } from "@mantine/core";
import Footer from "./footer";
import Navbar from "./navbar";
import Aside from "./aside";
import Header from "./header";

import type { FC, ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

const Component: FC<Props> = props => {
  const { children } = props;
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      aside={<Aside />}
      navbar={<Navbar hidden={!opened} />}
      footer={<Footer />}
      header={<Header opened={opened} onClick={() => setOpened(o => !o)} />}
    >
      {children}
    </AppShell>
  );
};

Component.displayName = "Layout";
export default Component;
