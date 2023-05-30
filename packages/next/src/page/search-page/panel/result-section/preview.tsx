import { Image } from "@mantine/core";

import type { FC } from "react";
import type { SearchProject } from "#type";

export interface Props {
  size?: number;
  data: SearchProject["data"];
}

const Component: FC<Props> = props => {
  const { data, size = 200 } = props;
  if (!data || data.gallery.length < 1) {
    return <></>;
  }
  const { id } = data;
  const image = data.gallery[0];
  return (
    <Image
      width={size}
      height={size}
      src={`/project/${id}/gallery/${image}?h=${size}&w=${size}&fit=cover`}
      radius="md"
      alt="Preview"
    />
  );
};

Component.displayName = "SearchPage/Panel/ResultSection/Card/Preview";
export default Component;
