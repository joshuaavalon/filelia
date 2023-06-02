import { useContext, useMemo } from "react";
import { useRouter } from "next/router";
import { MantineReactTable } from "mantine-react-table";
import Context from "../context";

import type { FC } from "react";
import type { MRT_ColumnDef, MRT_Updater } from "mantine-react-table";
import type { SearchTag } from "#type";

function isUpdateFn<T>(fn: unknown): fn is (old: T) => T {
  return typeof fn === "function";
}

function onChange<T>(
  value: T,
  fn: (value: T) => void
): (updater: MRT_Updater<T>) => void {
  return updater => {
    if (isUpdateFn<T>(updater)) {
      fn(updater(value));
    } else {
      fn(updater);
    }
  };
}

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
    header: "Project Count"
  }
];

export interface Props {}

const Component: FC<Props> = () => {
  const { rowCount, tags, columnFilters, globalFilter, sorting, pagination } =
    useContext(Context);
  const router = useRouter();
  const onColumnFiltersChange = useMemo(
    () =>
      onChange(columnFilters, filters => {
        const query = { ...router.query, filters: JSON.stringify(filters) };
        router.push({ query });
      }),
    [columnFilters, router]
  );
  const onGlobalFilterChange = useMemo(
    () =>
      onChange(globalFilter, filter => {
        const query = { ...router.query, globalFilter: filter };
        router.push({ query });
      }),
    [globalFilter, router]
  );
  const onPaginationChange = useMemo(
    () =>
      onChange(pagination, p => {
        const query = {
          ...router.query,
          size: p.pageSize,
          page: p.pageIndex + 1
        };
        router.push({ query });
      }),
    [pagination, router]
  );
  const onSortingChange = useMemo(
    () =>
      onChange(sorting, s => {
        const query = { ...router.query, sorting: JSON.stringify(s) };
        router.push({ query });
      }),
    [sorting, router]
  );
  return (
    <MantineReactTable
      columns={columns}
      data={tags}
      getRowId={getRowId}
      initialState={{ density: "xs" }}
      manualFiltering
      manualPagination
      manualSorting
      onColumnFiltersChange={onColumnFiltersChange}
      onGlobalFilterChange={onGlobalFilterChange}
      onPaginationChange={onPaginationChange}
      onSortingChange={onSortingChange}
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
      enableFullScreenToggle={false}
      mantineTableBodyRowProps={({ row }) => ({
        onClick: () => {
          const tag = tags.find(tag => tag.id === row.id);
          if (!tag) {
            return;
          }
          router.push({ pathname: "/search", query: { andTags: tag.name } });
        },
        sx: {
          cursor: "pointer"
        }
      })}
    />
  );
};

Component.displayName = "TagsPage/Panel/Table";
export default Component;
