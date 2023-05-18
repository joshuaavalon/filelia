import { CacheProvider } from "@emotion/react";
import {
  createEmotionCache,
  MantineProvider,
  useMantineColorScheme
} from "@mantine/core";

import type { FC } from "react";

export const cache = createEmotionCache({ key: "mantine" });

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
