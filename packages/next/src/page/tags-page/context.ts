import { createContext } from "react";

import type {
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState
} from "mantine-react-table";
import type { SearchTag } from "#type";

interface ContextValue {
  columnFilters: MRT_ColumnFiltersState;
  globalFilter: string;
  sorting: MRT_SortingState;
  pagination: MRT_PaginationState;
  tags: SearchTag[];
  rowCount: number;
}
export const Context = createContext<ContextValue>({
  columnFilters: [],
  globalFilter: "",
  sorting: [],
  pagination: { pageIndex: 0, pageSize: 0 },
  tags: [],
  rowCount: 10
});

export default Context;
