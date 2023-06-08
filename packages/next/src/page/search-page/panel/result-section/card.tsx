import { forwardRef, useCallback } from "react";
import { useRouter } from "next/router";
import { Card, createStyles, Group, Text, Title } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";

import type { MouseEventHandler } from "react";
import type { SearchProject } from "@filelia/plugin-api";

interface StyleProps {
  image?: string;
  size: number;
}

const useStyles = createStyles((_theme, props: StyleProps) => {
  const { image, size } = props;
  return {
    title: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    root: {
      cursor: "pointer",
      width: size,
      height: size,
      backgroundImage: image ? `url(${image})` : undefined
    }
  };
});

function getBackgroundImage(
  data: SearchProject["data"],
  size: number
): string | undefined {
  if (!data) {
    return undefined;
  }
  const { gallery, id } = data;
  return gallery.length > 0
    ? `/project/${id}/gallery/${gallery[0]}?h=${size}&w=${size}&fit=cover`
    : undefined;
}

export interface Props {
  project: SearchProject;
  size: number;
  className?: string;
}

const Component = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    project: { project, data },
    size,
    ...others
  } = props;
  const image = getBackgroundImage(data, size);
  const { classes, theme, cx } = useStyles({ image, size });
  const router = useRouter();
  const onClick: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.preventDefault();
      router.push(`/project/${project.id}`);
    },
    [project.id, router]
  );
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      {...others}
      className={cx(others.className, classes.root)}
      ref={ref}
    >
      <Card.Section inheritPadding py="xs" onClick={onClick}>
        <Group spacing="xs">
          <IconCalendar size={theme.fontSizes.sm} />
          <Text size="sm">{project.updatedAt}</Text>
        </Group>
        <Title order={3} className={classes.title}>
          {project.name}
        </Title>
      </Card.Section>
    </Card>
  );
});

Component.displayName = "SearchPage/Panel/ResultSection/Card";
export default Component;
