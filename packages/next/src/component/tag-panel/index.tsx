import { useState } from "react";
import { TbTags } from "react-icons/tb";
import CollapsePanel from "#component/collapse-panel";
import FilterInput from "#component/filter-input";
import { TbHash } from "react-icons/tb";
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
    <CollapsePanel title="Tags" icon={<TbTags />} sx={sx} className={className}>
      <FilterInput
        filter={filter}
        setFilter={setFilter}
        caseSensitive={caseSensitive}
        setCaseSensitive={setCaseSensitive}
        icon={<TbHash />}
      />
      <TagCloud tags={tags} filter={filter} caseSensitive={caseSensitive} />
    </CollapsePanel>
  );
};

Component.displayName = "TagPanel";
export default Component;
