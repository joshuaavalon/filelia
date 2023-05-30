import { useCallback } from "react";
import { useRouter } from "next/router";
import { Card, createStyles, Flex, Grid, Group, Text } from "@mantine/core";
import { TbCalendar } from "react-icons/tb";
import Badge from "./badge";
import Preview from "./preview";

import type { FC, MouseEventHandler } from "react";
import type { SearchProject } from "#type";

const useStyles = createStyles({
  title: {
    cursor: "pointer"
  }
});

export interface Props {
  project: SearchProject;
}

const Component: FC<Props> = props => {
  const { project } = props;
  const { classes } = useStyles();
  const router = useRouter();
  const onClick: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.preventDefault();
      router.push(`/project/${project.id}`);
    },
    [project.id, router]
  );
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section
        withBorder
        inheritPadding
        py="xs"
        onClick={onClick}
        className={classes.title}
      >
        <Group position="apart">
          <Text weight={500}>{project.name}</Text>
          <Group>
            <TbCalendar />
            <Text weight={500}>{project.updatedAt}</Text>
          </Group>
        </Group>
      </Card.Section>

      <Card.Section inheritPadding mt="sm" pb="md">
        <Grid>
          <Grid.Col span="content">
            <Preview data={project.data} />
          </Grid.Col>
          <Grid.Col span="auto">
            <Flex
              mih={50}
              gap="xs"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
            >
              {project.tags.map(tag => (
                <Badge key={tag.id} tag={tag} />
              ))}
            </Flex>
          </Grid.Col>
        </Grid>
      </Card.Section>
    </Card>
  );
};

Component.displayName = "SearchPage/Panel/ResultSection/Card";
export default Component;
