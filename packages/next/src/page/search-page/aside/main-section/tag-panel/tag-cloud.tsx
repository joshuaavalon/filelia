import { useContext, useMemo } from "react";
import { Stack } from "@mantine/core";
import { useFormContext } from "#page/search-page/context";
import TagBadge from "./tag-badge";
import Context from "./context";

import type { FC } from "react";

export interface Props {}

const Component: FC<Props> = () => {
  const { key } = useContext(Context);
  const form = useFormContext();
  const tags = form.values[key];
  const tagBadges = useMemo(
    () =>
      tags.map((tag, index) => <TagBadge key={tag} tag={tag} index={index} />),
    [tags]
  );
  return (
    <Stack justify="flex-start" spacing="xs">
      {tagBadges}
    </Stack>
  );
};

Component.displayName = "TagCloud";
export default Component;
