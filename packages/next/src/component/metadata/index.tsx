import Head from "next/head";
import type { FC } from "react";

export interface Props {
  title: string;
}

const Component: FC<Props> = props => {
  const { title } = props;
  const fullTitle = `${title} | Filelia`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta property="og:title" content={title} key="title" />
    </Head>
  );
};

Component.displayName = "Metadata";
export default Component;
