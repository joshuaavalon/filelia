import { useMemo } from "react";
import { Flex } from "@mantine/core";
import filterPredicate from "#utils/filter-predicate";
import TagBadge from "./tag-badge";

import type { FC } from "react";

export interface Props {
  tags: string[];
  filter: string;
  caseSensitive: boolean;
}

const Component: FC<Props> = props => {
  const { tags, filter, caseSensitive } = props;
  const tagBadges = useMemo(
    () =>
      tags
        .filter(filterPredicate(filter, caseSensitive))
        .map(tag => <TagBadge key={tag} tag={tag} />),
    [tags, filter, caseSensitive]
  );
  return (
    <Flex
      gap="xs"
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
    >
      {tagBadges}
    </Flex>
  );
};

Component.displayName = "TagCloud";
export default Component;
