import CollapsePanel from "#component/collapse-panel";
import Context from "./context";
import TagCloud from "./tag-cloud";

import type { FC, ReactNode } from "react";
import type { Sx } from "@mantine/core";
import type { ContextValue } from "./context";

export interface Props {
  title: string;
  icon: ReactNode;
  sx?: Sx;
  className?: string;
  type?: ContextValue["type"];
  tagsKey: ContextValue["tagsKey"];
}

const Component: FC<Props> = props => {
  const { sx, className, title, icon, type = false, tagsKey } = props;
  return (
    <Context.Provider value={{ type, tagsKey }}>
      <CollapsePanel title={title} icon={icon} sx={sx} className={className}>
        <TagCloud />
      </CollapsePanel>
    </Context.Provider>
  );
};

Component.displayName = "SearchPage/Aside/MainSection/TagPanel";
export default Component;
