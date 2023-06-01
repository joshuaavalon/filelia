import { Flex, ThemeIcon, Title } from "@mantine/core";
import { IconFileLambda } from "@tabler/icons-react";

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
      <IconFileLambda size="1.625rem" />
    </ThemeIcon>
    <Title>Filelia</Title>
  </Flex>
);

Component.displayName = "Logo";
export default Component;
