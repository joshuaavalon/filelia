import { CacheProvider } from "@emotion/react";
import { createEmotionCache, MantineProvider } from "@mantine/core";

import type { FC } from "react";

export const cache = createEmotionCache({ key: "mantine" });

export interface Props {
  children: JSX.Element;
}

const Component: FC<Props> = props => {
  const { children } = props;
  return (
    <CacheProvider value={cache}>
      {/* You can wrap ColorSchemeProvider right here but skipping that for brevity ;) */}
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionCache={cache}
        theme={{
          colorScheme: "light"
        }}
      >
        {children}
      </MantineProvider>
    </CacheProvider>
  );
};

Component.displayName = "EmotionProvider";
export default Component;
