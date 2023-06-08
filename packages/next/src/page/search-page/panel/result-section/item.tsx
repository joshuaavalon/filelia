import { HoverCard } from "@mantine/core";
import Card from "./card";
import Hover from "./hover";

import type { FC } from "react";
import type { SearchProject } from "@filelia/plugin-api";

export interface Props {
  project: SearchProject;
  size: number;
}

const Component: FC<Props> = props => {
  const { project, size } = props;
  return (
    <HoverCard shadow="sm" width={size}>
      <HoverCard.Target>
        <Card project={project} size={size} />
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Hover project={project} />
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

Component.displayName = "SearchPage/Panel/ResultSection/Item";
export default Component;
