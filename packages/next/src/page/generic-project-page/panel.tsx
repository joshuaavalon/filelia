import { useContext } from "react";
import { Flex, Title } from "@mantine/core";
import { GenericProjectContext } from "./context";
import Carousel from "./carousel";

import type { FC } from "react";

export interface Props {}

const Component: FC<Props> = () => {
  const { project } = useContext(GenericProjectContext);
  return (
    <Flex
      gap="md"
      justify="center"
      align="stretch"
      direction="column"
      wrap="wrap"
    >
      <Title>{project.title}</Title>
      <Carousel />
    </Flex>
  );
};

Component.displayName = "Panel";
export default Component;
