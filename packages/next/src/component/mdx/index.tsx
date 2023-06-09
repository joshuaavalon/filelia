import { forwardRef } from "react";
import { Center, Stack, Title, TypographyStylesProvider } from "@mantine/core";
import { MDXRemote } from "next-mdx-remote";
import { MdxContext } from "./context";
import Code from "./code";
import Img from "./img";
import Image from "./image";

import type { MDXRemoteProps, MDXRemoteSerializeResult } from "next-mdx-remote";
import type { MdxContextValue } from "./context";

export type { SourceOptions } from "./context";

const components: MDXRemoteProps["components"] = {
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

export interface Props {
  content: MDXRemoteSerializeResult | null;
  onImgSrc: MdxContextValue["onImgSrc"];
  onSourceSrcSet: MdxContextValue["onSourceSrcSet"];
}

const Component = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { content, onImgSrc, onSourceSrcSet } = props;
  if (!content) {
    return <Stack spacing={0} ref={ref} />;
  }
  return (
    <MdxContext.Provider value={{ onImgSrc, onSourceSrcSet }}>
      <Stack spacing={0} ref={ref}>
        <TypographyStylesProvider>
          <MDXRemote {...content} components={components} />
        </TypographyStylesProvider>
      </Stack>
    </MdxContext.Provider>
  );
});

Component.displayName = "Mdx";
export default Component;
