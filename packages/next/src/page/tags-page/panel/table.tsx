import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import type {
  MantineReactTableProps,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState
} from "mantine-react-table";
import { MantineReactTable } from "mantine-react-table";

import type { FC } from "react";
import type { SearchTag } from "#type";

function getRowId(tag: SearchTag): string {
  return tag.id;
}

const columns: MRT_ColumnDef<SearchTag>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "projectCount",
    header: "Count"
  }
];

export interface Props {
  tags: SearchTag[];
  page: number;
  totalPage: number;
}

const Component: FC<Props> = props => {
  const { tags, totalPage, page } = props;
  const [rowCount, setRowCount] = useState(0);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const router = useRouter();
  const onPageChange = useCallback(
    (page: number) => {
      const query = { ...router.query, page };
      router.push({ query });
    },
    [router]
  );
  return (
    <MantineReactTable
      columns={columns}
      data={tags}
      initialState={{ showColumnFilters: true }}
      getRowId={getRowId}
      manualFiltering
      manualPagination
      manualSorting
      onColumnFiltersChange={setColumnFilters}
      onGlobalFilterChange={setGlobalFilter}
      onPaginationChange={setPagination}
      onSortingChange={setSorting}
      rowCount={rowCount}
      state={{
        columnFilters,
        globalFilter,
        isLoading: false,
        pagination,
        showAlertBanner: false, //isError,
        showProgressBars: false, // isRefetching,
        sorting
      }}
    />
  );
};

Component.displayName = "TagsPage/Panel/Table";
export default Component;
