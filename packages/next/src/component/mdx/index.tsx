import { forwardRef } from "react";
import { Stack, TypographyStylesProvider } from "@mantine/core";
import { MDXRemote } from "next-mdx-remote";
import Code from "./code";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";

const components = {
  code: Code
};

export interface Props {
  content: MDXRemoteSerializeResult | null;
}

const Component = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { content } = props;
  if (!content) {
    return <Stack spacing={0} ref={ref} />;
  }
  return (
    <Stack spacing={0} ref={ref}>
      <TypographyStylesProvider>
        <MDXRemote {...content} components={components} />
      </TypographyStylesProvider>
    </Stack>
  );
});

Component.displayName = "Mdx";
export default Component;
