import { createStyles, ThemeIcon, Title } from "@mantine/core";
import { IconFileLambda } from "@tabler/icons-react";

import type { FC } from "react";

const useStyles = createStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    [theme.fn.largerThan("md")]: {
      justifyContent: "flex-start"
    },
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: theme.spacing.xs,
    cursor: "pointer",
    flex: 1
  },
  title: {
    fontSize: theme.headings.sizes.h2.fontSize
  }
}));

export interface Props {}

const Component: FC<Props> = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <ThemeIcon size="lg">
        <IconFileLambda size="1.625rem" />
      </ThemeIcon>
      <Title className={classes.title}>Filelia</Title>
    </div>
  );
};

Component.displayName = "Layout/Logo";
export default Component;
