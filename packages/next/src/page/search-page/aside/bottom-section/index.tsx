import { Box, Button, createStyles, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import type { FC } from "react";

const useStyles = createStyles(theme => {
  const borderColor =
    theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2];
  return {
    section: {
      padding: theme.spacing.md
    },
    box: {
      paddingTop: theme.spacing.sm,
      borderTop: `${rem(1)} solid ${borderColor}`
    },
    button: {
      width: "100%"
    }
  };
});

export interface Props {}

const Component: FC<Props> = () => {
  const { classes } = useStyles();
  return (
    <section className={classes.section}>
      <Box className={classes.box}>
        <Button
          className={classes.button}
          leftIcon={<IconSearch size="1rem" />}
          type="submit"
        >
          Search
        </Button>
      </Box>
    </section>
  );
};

Component.displayName = "SearchPage/Aside/BottomSection";
export default Component;
