import Head from "next/head";
import { Notifications } from "@mantine/notifications";
import EmotionProvider from "#provider/emotion";
import ColorSchemeProvider from "#provider/color-scheme";

import type { AppProps } from "next/app";
import type { ColorScheme } from "@mantine/core";

interface PageProps {
  colorScheme?: ColorScheme;
}

interface Props extends AppProps<PageProps> {}

export default function App(props: Props): JSX.Element {
  const { Component, pageProps } = props;
  const colorScheme = pageProps.colorScheme === "dark" ? "dark" : "light";
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme}>
        <EmotionProvider>
          <>
            <Notifications />
            <Component {...pageProps} />
          </>
        </EmotionProvider>
      </ColorSchemeProvider>
    </>
  );
}
