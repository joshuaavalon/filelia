import { useMemo } from "react";
import { createStyles } from "@mantine/core";
import Card from "./card";

import type { FC } from "react";
import type { SearchProject } from "#type";

const useStyles = createStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.md
  }
}));

export interface Props {
  projects: SearchProject[];
}

const Component: FC<Props> = props => {
  const { projects } = props;
  const { classes } = useStyles();
  const cards = useMemo(
    () => projects.map(project => <Card key={project.id} project={project} />),
    [projects]
  );
  return <section className={classes.root}>{cards}</section>;
};

Component.displayName = "SearchPage/Panel/ResultSection";
export default Component;
