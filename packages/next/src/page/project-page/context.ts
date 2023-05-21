import { createContext } from "react";

import type { ProjectContextValue } from "./type";

export const ProjectContext = createContext<ProjectContextValue>({
  result: {},
  description: null
} as ProjectContextValue);
