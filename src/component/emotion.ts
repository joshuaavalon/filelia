import "@emotion/react";
import "@emotion/styled";
import type { MantineTheme } from "@mantine/core";

declare module "@emotion/react" {
  export interface Theme extends MantineTheme {}
}
