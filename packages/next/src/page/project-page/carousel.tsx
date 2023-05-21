import { useContext, useMemo, useState } from "react";
import { Center, createStyles, Divider } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useDisclosure } from "@mantine/hooks";
import ImageModal from "#component/image-modal";
import { ProjectContext } from "./context";

import type { FC } from "react";

const useStyles = createStyles(theme => ({
  image: {
    objectFit: "cover",
    maxHeight: "100%",
    maxWidth: "100%",
    cursor: "pointer"
  },

  carousel: {
    backgroundColor:
      theme.colorScheme === "light"
        ? theme.colors.gray[1]
        : theme.colors.gray[9],
    maxWidth: "100%"
  }
}));

export interface Props {
  maxHeight?: number;
}

const Component: FC<Props> = props => {
  const { maxHeight = 200 } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const { result } = useContext(ProjectContext);
  const [src, setSrc] = useState("");
  const { classes } = useStyles();
  const slides = useMemo(() => {
    const {
      data: { gallery },
      project: { id }
    } = result;
    return gallery.map(image => (
      <Carousel.Slide
        key={image}
        mah={maxHeight}
        onClick={e => {
          e.preventDefault();
          setSrc(`/project/${id}/file/${image}`);
          open();
        }}
      >
        <Center h="100%">
          <picture className={classes.image}>
            <source
              srcSet={`/project/${id}/gallery/${image}?h=${maxHeight}&format=png`}
              type="image/png"
            />
            <img
              src={`/project/${id}/gallery/${image}?h=${maxHeight}&format=jpg`}
              alt="Image"
            />
          </picture>
        </Center>
      </Carousel.Slide>
    ));
  }, [result, maxHeight, open, classes.image]);
  return (
    <>
      <ImageModal opened={opened} src={src} close={close} />
      <Carousel
        mah={maxHeight}
        loop
        withIndicators
        slideSize="10rem"
        slideGap="lg"
        id="gallery"
        className={classes.carousel}
      >
        {slides}
      </Carousel>{" "}
      <Divider />
    </>
  );
};

Component.displayName = "Carousel";
export default Component;
