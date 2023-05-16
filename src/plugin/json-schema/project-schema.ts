import generic from "#json-schema/generic-project/v1";

import type { TSchema } from "@sinclair/typebox";

const projectSchemas = {
  generic
} as const;

export type ProjectSchemas = typeof projectSchemas;

export function getProjectSchema(type: string): TSchema | undefined;
export function getProjectSchema<T extends keyof ProjectSchemas>(
  type: T
): ProjectSchemas[T] {
  return projectSchemas[type];
}
