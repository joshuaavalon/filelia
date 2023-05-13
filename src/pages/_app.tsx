import Head from "next/head";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import EmotionProvider from "#provider/emotion";

import type { AppProps } from "next/app";

interface PageProps {}

interface Props extends AppProps<PageProps> {}

export default function App(props: Props): JSX.Element {
  const { Component, pageProps } = props;
  const client = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache()
  });
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={client}>
        <EmotionProvider>
          <Component {...pageProps} />
        </EmotionProvider>
      </ApolloProvider>
    </>
  );
}
