import { CacheProvider } from "@emotion/react";
import { MantineProvider, useMantineColorScheme } from "@mantine/core";
import { cache } from "#emotion";

import type { FC } from "react";

export interface Props {
  children: JSX.Element;
}

const Component: FC<Props> = props => {
  const { children } = props;
  const { colorScheme } = useMantineColorScheme();
  return (
    <CacheProvider value={cache}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionCache={cache}
        theme={{ colorScheme }}
      >
        {children}
      </MantineProvider>
    </CacheProvider>
  );
};

Component.displayName = "EmotionProvider";
export default Component;
