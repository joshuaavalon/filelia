import { createContext } from "react";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { LoadProjectResult } from "#type";

interface ContextValue {
  result: LoadProjectResult;
  description: MDXRemoteSerializeResult | null;
}

export const Context = createContext<ContextValue>({
  result: {},
  description: null
} as ContextValue);

export default Context;
