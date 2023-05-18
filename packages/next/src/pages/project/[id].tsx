import { readFile } from "node:fs/promises";
import UnsupportedProjectPage from "#page/unsupported-project-page";
import InvalidJsonPage from "#page/invalid-json-page";
import GenericProjectPage from "#page/generic-project-page";
import { colorSchemeKey } from "#provider/color-scheme";
import readMdx from "#utils/read-mdx";

import type { ParsedUrlQuery } from "querystring";
import type { GetServerSideProps } from "next";
import type { ColorScheme } from "@mantine/core";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { Project } from "#type";

interface Props {
  project: Project;
  json: unknown;
  schemaResult: {
    schema: unknown;
    errorsStr: string;
  }[];
  colorScheme: ColorScheme | null;
  description: MDXRemoteSerializeResult | null;
}

interface Query extends ParsedUrlQuery {
  id: string;
}

export default function Page(props: Props): JSX.Element {
  const { project, json, schemaResult, description } = props;
  if (schemaResult.length > 0) {
    return (
      <InvalidJsonPage
        json={json}
        schemaResult={schemaResult}
        project={project}
      />
    );
  }

  for (const type of project.types) {
    switch (type.name) {
      case "filelia::generic-project::v1":
        return (
          <GenericProjectPage
            project={project}
            json={json}
            description={description}
          />
        );
    }
  }
  return <UnsupportedProjectPage project={project} json={json} />;
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
      },
      types: true
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

  const schemaResult: {
    schema: unknown;
    errorsStr: string;
  }[] = [];
  for (const type of project.types) {
    const validate = validateFunc(type.name);
    if (validate && !validate(json)) {
      validate(json);
      schemaResult.push({
        schema: validate.schema,
        errorsStr: JSON.stringify(validate.errors ?? [])
      });
    }
  }
  const colorScheme = req.cookies[colorSchemeKey] === "dark" ? "dark" : "light";
  let description: MDXRemoteSerializeResult | null = null;
  if (schemaResult.length <= 0) {
    if (
      project.types.some(type => type.name === "filelia::generic-project::v1")
    ) {
      description = await readMdx(project.path, json.baseDir, json.description);
    }
  }
  return {
    props: {
      project,
      json,
      schemaResult,
      colorScheme,
      description
    }
  };
};
