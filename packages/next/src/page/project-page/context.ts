import { createContext } from "react";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { LoadProjectResult } from "#type";

export interface ProjectContextValue {
  result: LoadProjectResult;
  description: MDXRemoteSerializeResult | null;
}

export const ProjectContext = createContext<ProjectContextValue>({
  result: {},
  description: null
} as ProjectContextValue);
