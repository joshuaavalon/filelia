import Layout from "#component/layout";

import type { GetStaticProps } from "next";

interface Props {
  value: number;
}

export default function Page(_props: Props): JSX.Element {
  return <Layout>Test</Layout>;
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    value: 1
  }
});
