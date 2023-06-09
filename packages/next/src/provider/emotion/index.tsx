import { CacheProvider } from "@emotion/react";
import { MantineProvider, useMantineColorScheme } from "@mantine/core";
import emotionCache from "#emotion";
import { fontFamily } from "./font";

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
          fontFamily,
          headings: { fontFamily },
          colorScheme,
          components: {
            Title: {
              styles: theme => ({
                root: { color: theme.white }
              })
            }
          }
        }}
      >
        {children}
      </MantineProvider>
    </CacheProvider>
  );
};

Component.displayName = "EmotionProvider";
export default Component;
