import { createContext } from "react";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { FindProjectByIdResultSuccess } from "@filelia/plugin-api";

interface ContextValue {
  result: FindProjectByIdResultSuccess;
  description: MDXRemoteSerializeResult | null;
}

export const Context = createContext<ContextValue>({
  result: {},
  description: null
} as ContextValue);

export default Context;
