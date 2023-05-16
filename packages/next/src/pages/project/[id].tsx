import { readFile } from "node:fs/promises";
import Head from "next/head";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import Layout from "#component/layout";
import TagPanel from "#component/tag-panel";
import UnsupportedProjectPanel from "#component/unsupported-project-panel";
import InvalidJsonPage from "#component/invalid-json-page";

import type { ParsedUrlQuery } from "querystring";
import type { ReactNode } from "react";
import type { GetServerSideProps } from "next";
import type { ValueError } from "@sinclair/typebox/compiler";
import type { Project } from "#type";

const ajv = new Ajv({ useDefaults: true });
addFormats.default(ajv);

interface Props {
  project: Project;
  json: unknown;
  schema: unknown;
  errorsStr: string;
}

interface Query extends ParsedUrlQuery {
  id: string;
}

export default function Page(props: Props): JSX.Element {
  const { project, json, schema, errorsStr } = props;
  const { tags } = project;
  const errors: ValueError[] = JSON.parse(errorsStr);
  if (errors.length > 0) {
    return (
      <InvalidJsonPage
        json={json}
        schema={schema}
        errors={errors}
        project={project}
      />
    );
  }
  let children: ReactNode;
  switch (project.type) {
    default:
      children = <UnsupportedProjectPanel project={project} json={json} />;
  }
  const title = `${project.title} | Filelia`;
  return (
    <Layout aside={<TagPanel tags={tags} />}>
      <Head>
        <title>{title}</title>
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
  const { db, getProjectSchema, log } = req.fastify();
  const project = await db.project.findUnique({
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
    return { notFound: true };
  }
  let json: any;
  try {
    const data = await readFile(project.path, { encoding: "utf-8" });
    json = JSON.parse(data);
  } catch (err) {
    log.warn({ err, project }, "Failed to render project");
    return { notFound: true };
  }
  const schema = getProjectSchema(project.type);
  let errors: ValueError[] = [];
  if (schema) {
    const validate = ajv.compile(schema);
    if (!validate(json)) {
      const validator = TypeCompiler.Compile(schema);
      errors = [...validator.Errors(json)];
    }
  }
  return {
    props: {
      project,
      json,
      schema: schema ? Type.Strict(schema) : null,
      errorsStr: JSON.stringify(errors)
    }
  };
};
