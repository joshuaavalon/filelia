import { useState } from "react";
import { Flex } from "@mantine/core";
import FilterTagInput from "./filter-tag-input";
import TagCloud from "./tag-cloud";

import type { FC } from "react";
import type { Tag } from "#type";
import type { Sx } from "@mantine/core";

export interface Props {
  tags: Tag[];
  sx?: Sx;
}

const Component: FC<Props> = props => {
  const { tags, sx } = props;
  const [filter, setFilter] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  return (
    <Flex
      gap="md"
      justify="center"
      align="stretch"
      direction="column"
      wrap="wrap"
      sx={sx}
    >
      <FilterTagInput
        filter={filter}
        setFilter={setFilter}
        caseSensitive={caseSensitive}
        setCaseSensitive={setCaseSensitive}
      />
      <TagCloud tags={tags} filter={filter} caseSensitive={caseSensitive} />
    </Flex>
  );
};

Component.displayName = "TagPanel";
export default Component;
