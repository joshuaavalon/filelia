import { TbTags } from "react-icons/tb";
import AsideHeader from "#component/aside-header";

import type { FC, MouseEventHandler } from "react";

export interface Props {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Component: FC<Props> = props => {
  const { onClick } = props;
  return (
    <AsideHeader
      label="Tags"
      icon={<TbTags size="1.25rem" />}
      onClick={onClick}
    />
  );
};

Component.displayName = "TagPanelHeader";
export default Component;
