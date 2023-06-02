import { Flex } from "@mantine/core";
import Header from "./header";
import Table from "./table";

import type { FC } from "react";

export interface Props {}

const Component: FC<Props> = () => (
  <Flex
    gap="md"
    justify="center"
    align="stretch"
    direction="column"
    wrap="wrap"
  >
    <Header />
    <Table />
  </Flex>
);

Component.displayName = "TagsPage/Panel";
export default Component;
