import { useMemo } from "react";
import { Flex } from "@mantine/core";
import TagBadge from "./tag-badge";

import type { FC } from "react";
import type { Tag } from "#type";

export interface Props {
  tags: Tag[];
  filter: string;
  caseSensitive: boolean;
}

function isInclude(from: string, to: string, caseSensitive: boolean): boolean {
  return caseSensitive
    ? from.includes(to)
    : from.toLowerCase().includes(to.toLowerCase());
}

const Component: FC<Props> = props => {
  const { tags, filter, caseSensitive } = props;
  const tagBadges = useMemo(
    () =>
      tags
        .filter(tag => {
          if (!filter) {
            return true;
          }
          const {
            tagCategory: { alias: tagCategoryAlias },
            alias: tagAlias
          } = tag;
          return (
            tagCategoryAlias.some(alias =>
              isInclude(alias.name, filter, caseSensitive)
            ) ||
            tagAlias.some(alias => isInclude(alias.name, filter, caseSensitive))
          );
        })
        .map(tag => <TagBadge key={tag.id} tag={tag} />),
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
