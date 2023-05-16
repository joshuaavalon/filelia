import { createContext, useContext } from "react";

import { Navbar, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import type { FC } from "react";
import type { OpenContext } from "./type";

export const NavbarContext = createContext<OpenContext>({
  opened: false,
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  toggleOpened: () => {}
});

export interface Props {}

const Component: FC<Props> = () => {
  const { opened } = useContext(NavbarContext);
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`, true, {
    getInitialValueInEffect: false
  });
  const transform = !matches && !opened ? "translateX(-100%)" : "translateX(0)";
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      width={{ sm: 200, xl: 300 }}
      sx={{ transition: "transform 500ms ease", transform }}
    >
      <Text>Application navbar</Text>
    </Navbar>
  );
};

Component.displayName = "Navbar";
export default Component;
