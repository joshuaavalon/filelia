import { Group, Radio } from "@mantine/core";
import { useSearchCondFormContext } from "./context";

import type { FC } from "react";

export interface Props {}

const Component: FC<Props> = () => {
  const form = useSearchCondFormContext();
  return (
    <Radio.Group mt="sm" label="Type" {...form.getInputProps("type")}>
      <Group position="apart" mt="xs">
        <Radio value="tag" label="Tag" />
        <Radio value="keyword" label="Keyword" />
      </Group>
    </Radio.Group>
  );
};

Component.displayName = "SearchPage/Aside/InputSection/TypeInput";
export default Component;
