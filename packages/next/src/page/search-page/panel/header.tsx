import { createStyles, Flex, Title } from "@mantine/core";

import type { FC } from "react";

const useStyles = createStyles({
  title: {
    flex: 1
  }
});

export interface Props {}

const Component: FC<Props> = () => {
  const { classes } = useStyles();
  return (
    <Flex
      gap="md"
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Title className={classes.title}>Search Result</Title>
    </Flex>
  );
};

Component.displayName = "SearchPage/Header";
export default Component;
