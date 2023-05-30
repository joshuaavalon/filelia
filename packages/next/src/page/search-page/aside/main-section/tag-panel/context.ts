import { createContext } from "react";

import type { KeyOf } from "#type";
import type { SearchFormValues } from "#page/search-page/context";

export interface ContextValue {
  key: KeyOf<SearchFormValues, string[]>;
  type: "tag" | "keyword";
}

const Context = createContext<ContextValue>({
  key: "andTags",
  type: "tag"
});

export default Context;
