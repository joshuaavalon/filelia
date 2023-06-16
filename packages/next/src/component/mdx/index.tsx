import { forwardRef } from "react";
import { Stack, TypographyStylesProvider } from "@mantine/core";
import { MDXRemote } from "next-mdx-remote";
import { MdxContext } from "./context";
import { components } from "./component";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { MdxContextValue } from "./context";

export type { SourceOptions } from "./context";

export interface Props {
  id?: string;
  content: MDXRemoteSerializeResult | null;
  onImgSrc: MdxContextValue["onImgSrc"];
  onSourceSrcSet: MdxContextValue["onSourceSrcSet"];
}

const Component = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { content, onImgSrc, onSourceSrcSet, id } = props;
  if (!content) {
    return <Stack spacing={0} ref={ref} />;
  }
  return (
    <MdxContext.Provider value={{ onImgSrc, onSourceSrcSet }}>
      <Stack spacing={0} ref={ref} id={id}>
        <TypographyStylesProvider>
          <MDXRemote {...content} components={components} />
        </TypographyStylesProvider>
      </Stack>
    </MdxContext.Provider>
  );
});

Component.displayName = "Mdx";
export default Component;
