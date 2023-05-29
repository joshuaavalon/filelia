import { useState } from "react";
import { createStyles } from "@mantine/core";
import Input from "./input";
import Control from "./control";

import type { FC } from "react";

const useStyles = createStyles(theme => ({
  root: {
    padding: theme.spacing.md,
    display: "flex",
    flexDirection: "column"
  }
}));

export interface Props {}

const Component: FC<Props> = () => {
  const [value, setValue] = useState<string>("");
  const { classes } = useStyles();
  return (
    <section className={classes.root}>
      <Input value={value} setValue={setValue} />
      <Control value={value} setValue={setValue} />
    </section>
  );
};

Component.displayName = "SearchPage/Aside/InputSection";
export default Component;
