import ProjectPage from "#page/project-page";
import readMdx from "#utils/read-mdx";
import getColorScheme from "#utils/get-color-scheme";

import type { ParsedUrlQuery } from "querystring";
import type { GetServerSideProps } from "next";
import type { ColorScheme } from "@mantine/core";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { FindProjectByIdResultSuccess } from "@filelia/plugin-api";

interface Props {
  className?: string;
  result: FindProjectByIdResultSuccess;
  colorScheme: ColorScheme | null;
  description: MDXRemoteSerializeResult | null;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function Page(props: Props): JSX.Element {
  const { result, description, className } = props;
  return (
    <ProjectPage
      result={result}
      description={description}
      className={className}
    />
  );
}

export const getServerSideProps: GetServerSideProps<
  Props,
  Params
> = async ctx => {
  const { req, params } = ctx;
  if (!params) {
    return {
      notFound: true
    };
  }
  const { findProjectById } = req.fastify();
  const result = await findProjectById({ id: params.id });
  if (result.state !== "success") {
    return { notFound: true };
  }
  const description = await readMdx(result.baseDir, result.data.description);
  return {
    props: {
      result,
      colorScheme: getColorScheme(req),
      description
    }
  };
};
