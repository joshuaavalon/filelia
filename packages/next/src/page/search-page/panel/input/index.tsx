import { ActionIcon, createStyles } from "@mantine/core";
import { TbSearch } from "react-icons/tb";
import Select from "./select";

import type { FC } from "react";

const useStyles = createStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  select: {
    flex: 1
  },
  button: {
    marginLeft: theme.spacing.md
  }
}));

export interface Props {}

const Component: FC<Props> = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <Select className={classes.select} />
      <ActionIcon className={classes.button} variant="light" color="blue">
        <TbSearch />
      </ActionIcon>
    </div>
  );
};

Component.displayName = "SearchPage/Input";
export default Component;
