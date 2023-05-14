import { createContext, useContext } from "react";
import { Aside } from "@mantine/core";
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
  const matches = useMediaQuery("(min-width: 48em)", true, {
    getInitialValueInEffect: false
  });
  const transform = !matches && !opened ? "translateX(100%)" : "translateX(0)";
  return (
    <Aside
      p="md"
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 300 }}
      sx={{ transition: "transform 500ms ease", transform }}
    >
      {children}
    </Aside>
  );
};

Component.displayName = "Aside";
export default Component;
