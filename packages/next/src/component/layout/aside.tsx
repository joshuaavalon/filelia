import { createContext, useContext } from "react";
import { Aside, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import type { FC, ReactNode } from "react";
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
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`, true, {
    getInitialValueInEffect: false
  });
  const transform = !matches && !opened ? "translateX(100%)" : "translateX(0)";
  return (
    <Aside
      p="md"
      hiddenBreakpoint="sm"
      width={{ sm: 200, xl: 300 }}
      sx={{ transition: "transform 500ms ease", transform }}
    >
      {children}
    </Aside>
  );
};

Component.displayName = "Aside";
export default Component;
