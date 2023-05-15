import { readFile } from "node:fs/promises";
import Head from "next/head";
import Layout from "#component/layout";
import TagPanel from "#component/tag-panel";
import UnsupportedProjectPanel from "#component/unsupported-project-panel";

import type { ParsedUrlQuery } from "querystring";
import type { ReactNode } from "react";
import type { GetServerSideProps } from "next";
import type { Project } from "#type";

interface Props {
  value: number;
  project: Project;
  json: unknown;
}

interface Query extends ParsedUrlQuery {
  id: string;
}

export default function Page(props: Props): JSX.Element {
  const { project, json } = props;
  const { tags } = project;
  let children: ReactNode;
  switch (project.type) {
    default:
      children = <UnsupportedProjectPanel project={project} json={json} />;
  }
  return (
    <Layout aside={<TagPanel tags={tags} />}>
      <Head>
        <title>{project.title} | Filelia</title>
        <meta property="og:title" content={project.title} key="title" />
      </Head>
      {children}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<
  Props,
  Query
> = async ctx => {
  const { req, params } = ctx;
  if (!params) {
    return {
      notFound: true
    };
  }
  const fastify = req.fastify();
  const project = await fastify.db.project.findUnique({
    include: {
      tags: {
        include: {
          alias: { orderBy: [{ priority: "asc" }, { name: "asc" }] },
          tagCategory: {
            include: {
              alias: { orderBy: [{ priority: "asc" }, { name: "asc" }] }
            }
          }
        }
      }
    },
    where: { id: params.id }
  });
  if (!project) {
    return {
      notFound: true
    };
  }
  const data = await readFile(project.path, { encoding: "utf-8" });
  return {
    props: { value: 1, project, json: JSON.parse(data) }
  };
};
