import { Navbar, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import type { FC } from "react";

export interface Props {
  hidden?: boolean;
}

const Component: FC<Props> = props => {
  const { hidden } = props;
  const matches = useMediaQuery("(min-width: 48em)", true, {
    getInitialValueInEffect: false
  });
  const transform = !matches && hidden ? "translateX(-100%)" : "translateX(0)";
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 300 }}
      sx={{ transition: "transform 500ms ease", transform }}
    >
      <Text>Application navbar</Text>
    </Navbar>
  );
};

Component.displayName = "Navbar";
export default Component;
