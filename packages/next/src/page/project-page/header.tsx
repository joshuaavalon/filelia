import { useContext } from "react";
import { createStyles, Flex, Title } from "@mantine/core";
import { ProjectContext } from "./context";
import FileButton from "./file-button";

import type { FC } from "react";

const useStyle = createStyles({
  title: {
    flex: 1
  }
});

export interface Props {}

const Component: FC<Props> = () => {
  const {
    result: { data }
  } = useContext(ProjectContext);
  const { classes } = useStyle();
  return (
    <>
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
    </>
  );
};

Component.displayName = "Header";
export default Component;
