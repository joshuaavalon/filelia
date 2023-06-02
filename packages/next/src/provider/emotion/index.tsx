import { CacheProvider } from "@emotion/react";
import { MantineProvider, useMantineColorScheme } from "@mantine/core";
import emotionCache from "#emotion";

import type { FC } from "react";

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
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Noto Sans JP', 'Noto Sans TC', Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
          headings: {
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Noto Sans JP', 'Noto Sans TC', Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji"
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
