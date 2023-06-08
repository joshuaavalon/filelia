import { useMemo } from "react";
import { createStyles } from "@mantine/core";
import Item from "./item";

import type { FC } from "react";
import type { SearchProject } from "@filelia/plugin-api";

const size = 250;

const useStyles = createStyles(theme => ({
  root: {
    display: "grid",
    placeContent: "flex-start",
    placeItems: "center",
    gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr));`,
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
    () =>
      projects.map(project => (
        <Item key={project.project.id} project={project} size={size} />
      )),
    [projects]
  );
  return <section className={classes.root}>{cards}</section>;
};

Component.displayName = "SearchPage/Panel/ResultSection";
export default Component;
