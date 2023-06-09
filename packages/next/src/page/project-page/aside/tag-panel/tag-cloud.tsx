import { useMemo } from "react";
import { Flex } from "@mantine/core";
import TagBadge from "./tag-badge";

import type { FC } from "react";

export interface Props {
  tags: string[];
}

const Component: FC<Props> = props => {
  const { tags } = props;
  const tagBadges = useMemo(
    () => tags.map(tag => <TagBadge key={tag} tag={tag} />),
    [tags]
  );
  return (
    <Flex gap="xs" justify="stretch" align="center" direction="row" wrap="wrap">
      {tagBadges}
    </Flex>
  );
};

Component.displayName = "TagCloud";
export default Component;
