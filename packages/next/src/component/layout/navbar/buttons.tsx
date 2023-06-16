import { Box, createStyles, Group, rem } from "@mantine/core";
import ColorSchemeButton from "#component/color-scheme-button";
import RefreshIndexButton from "#component/refresh-index-button";

import type { FC } from "react";

const useStyles = createStyles(theme => {
  const borderColor =
    theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2];
  return {
    box: {
      paddingTop: theme.spacing.sm,
      borderTop: `${rem(1)} solid ${borderColor}`
    }
  };
});

export interface Props {}

const Component: FC<Props> = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.box}>
      <Group>
        <RefreshIndexButton variant="default" />
        <ColorSchemeButton variant="default" />
      </Group>
    </Box>
  );
};

Component.displayName = "Layout/Navbar/Buttons";
export default Component;
