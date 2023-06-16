import { createStyles, Title } from "@mantine/core";
import { Prism } from "@mantine/prism";

import type { FC } from "react";

const useStyles = createStyles({
  title: { scrollMarginTop: 60 },
  prism: { width: "100%" }
});

export interface Props {
  title: string;
  json: unknown;
  link: string;
}

const Component: FC<Props> = props => {
  const { json, title, link } = props;
  const { classes } = useStyles();
  return (
    <>
      <Title order={2} id={link} className={classes.title}>
        {title}
      </Title>
      <Prism language="json" withLineNumbers className={classes.prism}>
        {JSON.stringify(json, null, 2)}
      </Prism>
    </>
  );
};

Component.displayName = "JsonSection";
export default Component;
