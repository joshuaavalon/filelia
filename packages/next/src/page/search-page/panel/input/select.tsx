import { useCallback, useEffect, useState } from "react";
import { MultiSelect } from "@mantine/core";
import Value from "./value";
import Item from "./item";

import type { FC } from "react";
import type { SelectItem } from "@mantine/core";
import type { Tag } from "@prisma/client";

export interface Props {
  className?: string;
}

const Component: FC<Props> = props => {
  const { className } = props;
  const [data, setData] = useState<SelectItem[]>([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    if (!searchValue) {
      setData([]);
      return;
    }
    const query = new URLSearchParams();
    query.append("keyword", searchValue);
    fetch("/api/tags?" + query.toString(), { method: "GET" })
      .then(async res => {
        const json = await res.json();
        const tags: Tag[] = json.tags;
        setData(
          tags.map(tag => ({
            value: JSON.stringify({
              label: tag.name,
              value: tag.name,
              type: "tag"
            }),
            label: tag.name
          }))
        );
      })
      .catch(() => {
        setData([]);
      });
  }, [searchValue]);
  const shouldCreate = useCallback((query: string) => Boolean(query), []);
  return (
    <MultiSelect
      className={className}
      searchValue={searchValue}
      data={data}
      searchable
      creatable
      getCreateLabel={query => (
        <Item
          label={query}
          value={JSON.stringify({
            value: query,
            label: query,
            type: "keyword"
          })}
        />
      )}
      onCreate={query => {
        const item = {
          value: JSON.stringify({
            value: query,
            label: query,
            type: "keyword"
          }),
          label: query
        };
        return item;
      }}
      clearButtonProps={{ "aria-label": "Clear selection" }}
      clearable
      onSearchChange={setSearchValue}
      valueComponent={Value}
      shouldCreate={shouldCreate}
      itemComponent={Item}
      maxDropdownHeight="50%"
    />
  );
};

Component.displayName = "SearchPage/Input/Select";
export default Component;
