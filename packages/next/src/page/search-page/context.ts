import { createContext } from "react";

import type { Dispatch, SetStateAction } from "react";
import type { SelectItem } from "@mantine/core";

interface ContextValue {
  searchItems: SelectItem[];
  setSearchItems: Dispatch<SetStateAction<SelectItem[]>>;
}

const Context = createContext<ContextValue>({
  searchItems: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-function
  setSearchItems: () => {}
});

export default Context;
