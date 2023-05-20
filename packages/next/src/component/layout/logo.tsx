import { Flex, ThemeIcon, Title } from "@mantine/core";
import { TbFileLambda } from "react-icons/tb";

import type { FC } from "react";

export interface Props {}

const Component: FC<Props> = () => (
  <Flex
    gap="xs"
    justify={{ base: "center", md: "flex-start" }}
    align="center"
    direction="row"
    wrap="nowrap"
    sx={{ cursor: "pointer", flex: 1 }}
  >
    <ThemeIcon size="lg">
      <TbFileLambda size="1.625rem" />
    </ThemeIcon>
    <Title>Filelia</Title>
  </Flex>
);

Component.displayName = "Logo";
export default Component;
