import { useCallback, useState } from "react";
import { Autocomplete, createStyles } from "@mantine/core";

import type { FC } from "react";
import type { Tag } from "@prisma/client";

const useStyles = createStyles(theme => ({
  input: {
    marginBottom: theme.spacing.md
  }
}));

export interface Props {
  value: string;
  setValue: (value: string) => void;
}

const Component: FC<Props> = props => {
  const { value, setValue } = props;
  const [data, setData] = useState<string[]>([]);
  const { classes } = useStyles();
  const onAutocompleteChange = useCallback(
    (value: string) => {
      setValue(value);
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
    [setValue]
  );
  return (
    <Autocomplete
      data={data}
      onChange={onAutocompleteChange}
      value={value}
      placeholder="Search"
      limit={10}
      className={classes.input}
    />
  );
};

Component.displayName = "SearchPage/Aside/InputSection/Input";
export default Component;
