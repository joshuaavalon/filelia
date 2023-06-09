import {
  IconKey,
  IconKeyOff,
  IconTags,
  IconTagsOff
} from "@tabler/icons-react";
import CollapsePanel from "#component/collapse-panel";
import Context from "./context";
import TagCloud from "./tag-cloud";

import type { FC } from "react";
import type { Sx } from "@mantine/core";
import type { ContextValue } from "./context";

export interface Props {
  title: string;
  sx?: Sx;
  className?: string;
  valueKey: ContextValue["key"];
  type: ContextValue["type"];
  off: boolean;
}

const Component: FC<Props> = props => {
  const { sx, className, title, valueKey: key, type, off } = props;
  const icon =
    type === "tag" ? (
      off ? (
        <IconTagsOff />
      ) : (
        <IconTags />
      )
    ) : off ? (
      <IconKeyOff />
    ) : (
      <IconKey />
    );
  return (
    <Context.Provider value={{ key, type }}>
      <CollapsePanel title={title} icon={icon} sx={sx} className={className}>
        <TagCloud />
      </CollapsePanel>
    </Context.Provider>
  );
};

Component.displayName = "SearchPage/Aside/MainSection/TagPanel";
export default Component;
