import { createStyles } from "@mantine/core";

export const useStyles = createStyles(theme => ({
  sidebar: {
    padding: theme.spacing.md,
    [theme.fn.smallerThan("md")]: {
      transform: "translateX(var(--sidebar-translate-x))",
      transition: "transform var(--sidebar-transition-ms, 0) ease"
    }
  }
}));
