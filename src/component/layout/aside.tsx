import { Aside, MediaQuery, Text } from "@mantine/core";

import type { FC } from "react";

export interface Props {}

const Component: FC<Props> = () => (
  <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
    <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      <Text>Application sidebar</Text>
    </Aside>
  </MediaQuery>
);

Component.displayName = "Aside";
export default Component;
