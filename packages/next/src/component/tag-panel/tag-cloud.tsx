import { useMemo } from "react";
import { Flex } from "@mantine/core";
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
        .filter(tag => {
          let casedTag = caseSensitive ? tag : tag.toLowerCase();
          const casedFilter = caseSensitive ? filter : filter.toLowerCase();
          for (const char of casedFilter) {
            const index = casedTag.indexOf(char);
            if (index < 0) {
              return false;
            }
            casedTag = casedTag.slice(index + 1);
          }
          return true;
        })
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
