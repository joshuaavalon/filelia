import Document, { Head, Html, Main, NextScript } from "next/document";
import { createStylesServer, ServerStyles } from "@mantine/next";
import { cache as emotionCache } from "#provider/emotion";

import type { DocumentContext, DocumentInitialProps } from "next/document";

const stylesServer = createStylesServer(emotionCache);

export default class AppDocument extends Document {
  public static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles
          html={initialProps.html}
          server={stylesServer}
          key="styles"
        />
      ]
    };
  }

  public render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
