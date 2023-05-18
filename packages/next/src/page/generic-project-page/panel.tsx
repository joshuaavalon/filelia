import { useContext } from "react";
import { Flex, Title } from "@mantine/core";
import { GenericProjectContext } from "./context";
import Carousel from "./carousel";

import type { FC } from "react";

export interface Props {}

const Component: FC<Props> = () => {
  const { project, genericProject } = useContext(GenericProjectContext);
  const carousel = genericProject.gallery.length > 0 ? <Carousel /> : undefined;
  return (
    <Flex
      gap="md"
      justify="center"
      align="stretch"
      direction="column"
      wrap="wrap"
    >
      <Title>{project.title}</Title>
      {carousel}
    </Flex>
  );
};

Component.displayName = "Panel";
export default Component;
