import { useContext } from "react";
import { createStyles, Flex, Title } from "@mantine/core";
import Context from "../context";
import FileButton from "./file-button";

import type { FC } from "react";

const useStyles = createStyles({
  title: {
    flex: 1
  }
});

export interface Props {}

const Component: FC<Props> = () => {
  const {
    result: { data }
  } = useContext(Context);
  const { classes } = useStyles();
  return (
    <Flex
      gap="md"
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Title className={classes.title}>{data.title}</Title>
      <FileButton />
    </Flex>
  );
};

Component.displayName = "Header";
export default Component;
