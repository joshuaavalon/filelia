import { createContext } from "react";

import type { Schemas } from "fastify";
import type { Static } from "@sinclair/typebox";
import type { GenericProjectContextValue } from "./type";

export type GenericProject = Static<Schemas["filelia::generic-project::v1"]>;

export const GenericProjectContext = createContext<GenericProjectContextValue>({
  project: {},
  genericProject: {},
  description: null
} as GenericProjectContextValue);
