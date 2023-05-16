import { readFile } from "node:fs/promises";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import UnsupportedProjectPage from "#component/unsupported-project-page";
import InvalidJsonPage from "#component/invalid-json-page";

import type { ParsedUrlQuery } from "querystring";
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
  switch (project.type) {
    default:
      return <UnsupportedProjectPage project={project} json={json} />;
  }
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
