import { readFile } from "node:fs/promises";
import UnsupportedProjectPage from "#component/unsupported-project-page";
import InvalidJsonPage from "#component/invalid-json-page";

import type { ParsedUrlQuery } from "querystring";
import type { GetServerSideProps } from "next";
import type { ErrorObject } from "ajv/dist/2019.js";
import type { Project } from "#type";

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
  const errors: ErrorObject[] = JSON.parse(errorsStr);
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
  const { db, validateFunc, log } = req.fastify();
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
  const validate = validateFunc(project.type);
  let errors: ErrorObject[] = [];
  if (validate && !validate(json)) {
    validate(json);
    errors = validate.errors ?? [];
  }
  return {
    props: {
      project,
      json,
      schema: validate?.schema ? validate?.schema : null,
      errorsStr: JSON.stringify(errors)
    }
  };
};
