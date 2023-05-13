import { Footer } from "@mantine/core";

import type { FC } from "react";

export interface Props {}

const Component: FC<Props> = () => (
  <Footer height={60} p="md">
    Application footer
  </Footer>
);

Component.displayName = "Footer";
export default Component;
