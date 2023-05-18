import { useContext } from "react";
import { Flex, Title } from "@mantine/core";
// import { MDXRemote } from "next-mdx-remote";
import { GenericProjectContext } from "./context";
import Carousel from "./carousel";

import type { FC } from "react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface Props {
  description: MDXRemoteSerializeResult | null;
}

const Component: FC<Props> = () => {
  // const { description } = props;
  const { project, genericProject } = useContext(GenericProjectContext);
  const carousel = genericProject.gallery.length > 0 ? <Carousel /> : undefined;
  // const content = description ? <MDXRemote {...description} /> : undefined;
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
      {/* {content} */}
    </Flex>
  );
};

Component.displayName = "Panel";
export default Component;
