import { useState } from "react";
import { IconTags } from "@tabler/icons-react";
import CollapsePanel from "#component/collapse-panel";
import FilterInput from "#component/filter-input";
import { IconHash } from "@tabler/icons-react";
import TagCloud from "./tag-cloud";

import type { FC } from "react";
import type { Sx } from "@mantine/core";

export interface Props {
  tags: string[];
  sx?: Sx;
  className?: string;
}

const Component: FC<Props> = props => {
  const { tags, sx, className } = props;
  const [filter, setFilter] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  return (
    <CollapsePanel
      title="Tags"
      icon={<IconTags />}
      sx={sx}
      className={className}
    >
      <FilterInput
        filter={filter}
        setFilter={setFilter}
        caseSensitive={caseSensitive}
        setCaseSensitive={setCaseSensitive}
        icon={<IconHash />}
      />
      <TagCloud tags={tags} filter={filter} caseSensitive={caseSensitive} />
    </CollapsePanel>
  );
};

Component.displayName = "TagPanel";
export default Component;
