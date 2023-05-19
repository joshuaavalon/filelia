import { useContext, useEffect, useRef } from "react";
import { Flex, Title } from "@mantine/core";
import { GenericProjectContext } from "./context";
import Carousel from "./carousel";
import Description from "./description";

import type { FC } from "react";
import type { TableOfContentItem } from "#component/table-of-content";

export interface Props {
  setToc: (toc: TableOfContentItem[]) => void;
}

const Component: FC<Props> = props => {
  const { setToc } = props;
  const { project, genericProject } = useContext(GenericProjectContext);
  const carousel = genericProject.gallery.length > 0 ? <Carousel /> : undefined;
  const descriptionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const items: TableOfContentItem[] = [];
    if (genericProject.gallery.length > 0) {
      items.push({
        href: "#gallery",
        label: "Gallery",
        order: 1
      });
    }
    items.push({ href: "#description", label: "Description", order: 1 });
    if (!descriptionRef.current) {
      setToc(items);
      return;
    }
    const headings =
      descriptionRef.current.querySelectorAll<HTMLElement>("h1, h2, h3");
    for (const heading of headings) {
      if (heading.id) {
        const order =
          heading.tagName.toLowerCase() === "h1"
            ? 1
            : heading.tagName.toLowerCase() === "h2"
            ? 2
            : 3;
        console.log({ t: heading.tagName });
        items.push({
          href: `#${heading.id}`,
          label: heading.innerText,
          order
        });
      }
    }
    setToc(items);
  }, [genericProject, setToc]);
  return (
    <Flex
      gap="md"
      justify="center"
      align="stretch"
      direction="column"
      wrap="wrap"
    >
      <Title>{project.title}</Title>
      {carousel}
      <Description ref={descriptionRef} />
    </Flex>
  );
};

Component.displayName = "Panel";
export default Component;
