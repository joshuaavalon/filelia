import { Badge, Center } from "@mantine/core";
import { TbHash } from "react-icons/tb";

import type { FC } from "react";
import type { Tag } from "./type";

export interface Props {
  tag: Tag;
}

const Component: FC<Props> = props => {
  const { tag } = props;
  const {
    tagCategory: { alias: tagCategoryAlias, color },
    alias: tagAlias
  } = tag;
  const tagName = tagAlias[0].name;
  const tagCategoryName = tagCategoryAlias[0].name;
  return (
    <Badge
      size="lg"
      color={color ? color : undefined}
      leftSection={
        <Center>
          <TbHash />
        </Center>
      }
      radius="sm"
      sx={{ textTransform: "none", cursor: "pointer" }}
    >{`${tagCategoryName}:${tagName}`}</Badge>
  );
};

Component.displayName = "TagBadge";
export default Component;
