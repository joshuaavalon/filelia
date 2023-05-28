import ProjectPage from "#page/project-page";
import readMdx from "#utils/read-mdx";
import getColorScheme from "#utils/get-color-scheme";

import type { ParsedUrlQuery } from "querystring";
import type { GetServerSideProps } from "next";
import type { ColorScheme } from "@mantine/core";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { LoadProjectResult } from "#type";

interface Props {
  result: LoadProjectResult;
  colorScheme: ColorScheme | null;
  description: MDXRemoteSerializeResult | null;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function Page(props: Props): JSX.Element {
  const { result, description } = props;
  return <ProjectPage result={result} description={description} />;
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
  const { loadProject, loadProjectDir } = req.fastify();
  const result: LoadProjectResult | null = await loadProject(params.id);
  if (!result) {
    return { notFound: true };
  }
  const baseDir = await loadProjectDir(params.id);
  if (!baseDir) {
    return { notFound: true };
  }
  const description = await readMdx(baseDir, result.data.description);
  return {
    props: {
      result,
      colorScheme: getColorScheme(req),
      description
    }
  };
};
