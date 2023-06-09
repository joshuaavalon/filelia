import { Center, Title } from "@mantine/core";
import Code from "./code";
import Img from "./img";
import Image from "./image";

import type { MDXRemoteProps } from "next-mdx-remote";

export const components: MDXRemoteProps["components"] = {
  code: props => <Code {...props} />,
  img: props => <Img {...props} />,
  // eslint-disable-next-line jsx-a11y/alt-text, @typescript-eslint/naming-convention
  Image: props => <Image {...props} />,
  Center,
  h1: props => (
    <Title order={1} className={props.className} id={props.id}>
      {props.children}
    </Title>
  ),
  h2: props => (
    <Title order={2} className={props.className} id={props.id}>
      {props.children}
    </Title>
  ),
  h3: props => (
    <Title order={3} className={props.className} id={props.id}>
      {props.children}
    </Title>
  ),
  h4: props => (
    <Title order={4} className={props.className} id={props.id}>
      {props.children}
    </Title>
  ),
  h5: props => (
    <Title order={5} className={props.className} id={props.id}>
      {props.children}
    </Title>
  ),
  h6: props => (
    <Title order={6} className={props.className} id={props.id}>
      {props.children}
    </Title>
  )
};
