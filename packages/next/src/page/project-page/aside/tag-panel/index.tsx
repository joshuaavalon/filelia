import { IconTags } from "@tabler/icons-react";
import CollapsePanel from "#component/collapse-panel";
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
  return (
    <CollapsePanel
      title="Tags"
      icon={<IconTags />}
      sx={sx}
      className={className}
    >
      <TagCloud tags={tags} />
    </CollapsePanel>
  );
};

Component.displayName = "TagPanel";
export default Component;
