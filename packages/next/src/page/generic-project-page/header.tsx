import { useContext } from "react";
import { ActionIcon, createStyles, Flex, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TbFolder } from "react-icons/tb";
import { GenericProjectContext } from "./context";
import FileModal from "./file-modal";

import type { FC } from "react";

const useStyle = createStyles({
  title: {
    flex: 1
  }
});

export interface Props {}

const Component: FC<Props> = () => {
  const { project } = useContext(GenericProjectContext);
  const [opened, { open, close }] = useDisclosure(false);
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
        <Title className={classes.title}>{project.title}</Title>
        <ActionIcon
          title="File"
          size="lg"
          color="blue"
          variant="light"
          onClick={open}
        >
          <TbFolder size="1.625rem" />
        </ActionIcon>
      </Flex>
      <FileModal opened={opened} onClose={close} />
    </>
  );
};

Component.displayName = "Header";
export default Component;
