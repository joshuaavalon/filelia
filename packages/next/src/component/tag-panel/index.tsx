import { useState } from "react";
import { Flex } from "@mantine/core";
import FilterTagInput from "./filter-tag-input";
import TagCloud from "./tag-cloud";

import type { FC } from "react";
import type { Tag } from "./type";

export interface Props {
  tags: Tag[];
}

const Component: FC<Props> = props => {
  const { tags } = props;
  const [filter, setFilter] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  return (
    <Flex
      gap="md"
      justify="center"
      align="stretch"
      direction="column"
      wrap="wrap"
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
