import {} from "react";
import { Flex } from "@mantine/core";
import Header from "./header";
import Input from "./input";

import type { FC } from "react";

export interface Props {}

const Component: FC<Props> = props => {
  const {} = props;
  return (
    <Flex
      gap="md"
      justify="center"
      align="stretch"
      direction="column"
      wrap="wrap"
    >
      <Header />
      <Input />
    </Flex>
  );
};

Component.displayName = "Panel";
export default Component;
