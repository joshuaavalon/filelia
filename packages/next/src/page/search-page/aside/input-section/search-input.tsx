import { useCallback, useState } from "react";
import { ActionIcon, Autocomplete } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { useSearchCondFormContext } from "./context";

import type { FC } from "react";
import type { Tag } from "@prisma/client";

export interface Props {}

const Component: FC<Props> = () => {
  const [data, setData] = useState<string[]>([]);
  const form = useSearchCondFormContext();
  const onAutocompleteChange = useCallback(
    (value: string) => {
      form.setFieldValue("search", value);
      const query = new URLSearchParams();
      query.append("keyword", value);
      fetch("/api/tags?" + query.toString(), { method: "GET" })
        .then(async res => {
          const json = await res.json();
          const tags: Tag[] = json.tags;
          setData(tags.map(tag => tag.name));
        })
        .catch(() => {
          setData([]);
        });
    },
    [form]
  );
  return (
    <Autocomplete
      data={data}
      placeholder="Search"
      limit={10}
      {...form.getInputProps("search")}
      onChange={onAutocompleteChange}
      rightSection={
        <ActionIcon variant="transparent" type="submit">
          <IconSend />
        </ActionIcon>
      }
    />
  );
};

Component.displayName = "SearchPage/Aside/InputSection/SearchInput";
export default Component;
