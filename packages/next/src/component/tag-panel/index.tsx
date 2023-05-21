import { useState } from "react";
import { Collapse, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FilterInput from "#component/filter-input";
import { TbHash } from "react-icons/tb";
import Header from "./header";
import TagCloud from "./tag-cloud";

import type { FC } from "react";
import type { Sx } from "@mantine/core";

export interface Props {
  tags: string[];
  sx?: Sx;
}

const Component: FC<Props> = props => {
  const { tags, sx } = props;
  const [filter, setFilter] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [opened, { toggle }] = useDisclosure(true);
  return (
    <Flex
      gap="md"
      justify="center"
      align="stretch"
      direction="column"
      wrap="wrap"
      sx={sx}
    >
      <Header onClick={toggle} />
      <Collapse in={opened}>
        <FilterInput
          filter={filter}
          setFilter={setFilter}
          caseSensitive={caseSensitive}
          setCaseSensitive={setCaseSensitive}
          icon={<TbHash />}
        />
        <TagCloud tags={tags} filter={filter} caseSensitive={caseSensitive} />
      </Collapse>
    </Flex>
  );
};

Component.displayName = "TagPanel";
export default Component;
