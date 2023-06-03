import { Noto_Sans_JP, Noto_Sans_TC } from "next/font/google";
import { CacheProvider } from "@emotion/react";
import { MantineProvider, useMantineColorScheme } from "@mantine/core";
import emotionCache from "#emotion";

import type { FC } from "react";

const fontJp = Noto_Sans_JP({
  preload: true,
  subsets: ["latin"],
  display: "swap"
});

const fontTc = Noto_Sans_TC({
  weight: "400",
  preload: true,
  subsets: ["latin"],
  display: "swap"
});

export interface Props {
  children: JSX.Element;
}

const Component: FC<Props> = props => {
  const { children } = props;
  const { colorScheme } = useMantineColorScheme();
  return (
    <CacheProvider value={emotionCache}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionCache={emotionCache}
        theme={{
          fontFamily: `-apple-system, BlinkMacSystemFont, ${fontJp.style.fontFamily}, ${fontTc.style.fontFamily}, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji`,
          headings: {
            fontFamily: `-apple-system, BlinkMacSystemFont, ${fontJp.style.fontFamily}, ${fontTc.style.fontFamily}, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji`
          },
          colorScheme
        }}
      >
        {children}
      </MantineProvider>
    </CacheProvider>
  );
};

Component.displayName = "EmotionProvider";
export default Component;
