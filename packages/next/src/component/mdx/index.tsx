import { forwardRef } from "react";
import { Center, Stack, TypographyStylesProvider } from "@mantine/core";
import { MDXRemote } from "next-mdx-remote";
import { MdxContext } from "./context";
import Code from "./code";
import Img from "./img";
import Image from "./image";

import type { MDXRemoteProps, MDXRemoteSerializeResult } from "next-mdx-remote";
import type { MdxContextValue } from "./context";

export type { SourceOptions } from "./context";

const components: Exclude<MDXRemoteProps["components"], undefined> = {
  code: Code as any,
  img: Img as any,
  Image: Image as any,
  Center
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
