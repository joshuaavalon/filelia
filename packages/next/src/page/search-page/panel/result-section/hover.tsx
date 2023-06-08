import { forwardRef } from "react";
import { Flex, Stack, Title } from "@mantine/core";
import Badge from "./badge";

import type { SearchProject } from "@filelia/plugin-api";

export interface Props {
  project: SearchProject;
}

const Component = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { project, ...others } = props;
  const { tags } = project.project;
  return (
    <Stack>
      <Title order={5}>{project.project.name}</Title>
      <Flex
        gap="xs"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
        ref={ref}
        {...others}
      >
        {tags.map(tag => (
          <Badge key={tag.id} tag={tag} />
        ))}
      </Flex>
    </Stack>
  );
});

Component.displayName = "SearchPage/Panel/ResultSection/Hover";
export default Component;
