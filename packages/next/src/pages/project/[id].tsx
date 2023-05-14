import Head from "next/head";
import Layout from "#component/layout";
import TagPanel from "#component/tag-panel";

import type { ParsedUrlQuery } from "querystring";
import type { GetServerSideProps } from "next";
import type {
  Project,
  Tag,
  TagAlias,
  TagCategory,
  TagCategoryAlias
} from "@prisma/client";

interface Props {
  value: number;
  project: Project & {
    tags: (Tag & {
      alias: TagAlias[];
      tagCategory: TagCategory & {
        alias: TagCategoryAlias[];
      };
    })[];
  };
}

interface Query extends ParsedUrlQuery {
  id: string;
}

export default function Page(props: Props): JSX.Element {
  const { project } = props;
  const { tags, id } = project;
  return (
    <Layout aside={<TagPanel tags={tags} />}>
      <Head>
        <title>TODO | Filelia</title>
      </Head>
      {id}
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
  return {
    props: { value: 1, project }
  };
};
