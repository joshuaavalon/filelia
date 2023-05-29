import { createContext } from "react";
import type { SearchFormValues } from "#page/search-page/context";

type TagKeyOf<T> = keyof {
  [P in keyof T as T[P] extends string[] ? P : never]: any;
};

export interface ContextValue {
  type: boolean;
  tagsKey: TagKeyOf<SearchFormValues>;
}

const Context = createContext<ContextValue>({
  type: true,
  tagsKey: "tags"
});

export default Context;
