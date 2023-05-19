import { useContext, useMemo, useState } from "react";
import { Center, Divider } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useDisclosure } from "@mantine/hooks";
import ImageModal from "#component/image-modal";
import { GenericProjectContext } from "./context";

import type { FC } from "react";

export interface Props {
  maxHeight?: number;
}

const Component: FC<Props> = props => {
  const { maxHeight = 200 } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const { project, genericProject } = useContext(GenericProjectContext);
  const [src, setSrc] = useState("");
  const slides = useMemo(() => {
    const { id } = project;
    const { gallery } = genericProject;
    return gallery.map(image => (
      <Carousel.Slide
        key={image}
        mah={maxHeight}
        onClick={e => {
          e.preventDefault();
          setSrc(`/generic-project/${id}/file/${image}`);
          open();
        }}
      >
        <Center h="100%">
          <picture
            style={{ objectFit: "cover", maxHeight: "100%", maxWidth: "100%" }}
          >
            <source
              srcSet={`/generic-project/${id}/gallery/${image}?h=${maxHeight}&format=png`}
              type="image/png"
            />
            <img
              src={`/generic-project/${id}/gallery/${image}?h=${maxHeight}&format=jpg`}
              alt="Image"
            />
          </picture>
        </Center>
      </Carousel.Slide>
    ));
  }, [project, genericProject, maxHeight, open]);
  return (
    <>
      <ImageModal opened={opened} src={src} close={close} />
      <Carousel
        mah={maxHeight}
        maw="100%"
        loop
        withIndicators
        slideSize="50%"
        slideGap="lg"
        id="gallery"
      >
        {slides}
      </Carousel>{" "}
      <Divider />
    </>
  );
};

Component.displayName = "Carousel";
export default Component;
