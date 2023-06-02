import Metadata from "#component/metadata";
import Layout from "#component/layout";
import Panel from "./panel";
import Context from "./context";

import type { FC } from "react";
import type {
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState
} from "mantine-react-table";
import type { SearchTag } from "#type";

export interface Props {
  columnFilters: MRT_ColumnFiltersState;
  globalFilter: string;
  sorting: MRT_SortingState;
  pagination: MRT_PaginationState;
  tags: SearchTag[];
  rowCount: number;
}

const Component: FC<Props> = props => {
  const { tags, columnFilters, globalFilter, sorting, pagination, rowCount } =
    props;

  return (
    <Context.Provider
      value={{
        tags,
        columnFilters,
        globalFilter,
        sorting,
        pagination,
        rowCount
      }}
    >
      <Layout>
        <Metadata title="Tags" />
        <Panel />
      </Layout>
    </Context.Provider>
  );
};

Component.displayName = "TagsPage";
export default Component;
