import { debounce } from "lodash";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { Center, createStyles, Divider } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useDisclosure } from "@mantine/hooks";
import ImageModal from "#component/image-modal";
import Context from "../context";

import type { FC } from "react";
import type { Embla } from "@mantine/carousel";

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
  const { result } = useContext(Context);
  const [src, setSrc] = useState("");
  const { classes } = useStyles();
  const [embla, setEmbla] = useState<Embla | null>(null);
  const reload = useRef(
    debounce((embla: Embla | null) => {
      embla?.reInit();
    }, 500)
  );
  const onLoad = useCallback(() => reload.current(embla), [reload, embla]);
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
          <picture className={classes.image} onLoad={onLoad}>
            <source
              srcSet={`/project/${id}/gallery/${image}?h=${maxHeight}&format=webp`}
              type="image/webp"
            />
            <source
              srcSet={`/project/${id}/gallery/${image}?h=${maxHeight}&format=png`}
              type="image/png"
            />
            <img
              src={`/project/${id}/gallery/${image}?h=${maxHeight}&format=webp`}
              alt="Image"
            />
          </picture>
        </Center>
      </Carousel.Slide>
    ));
  }, [result, maxHeight, open, classes.image, onLoad]);
  return (
    <>
      <ImageModal opened={opened} src={src} close={close} />
      <Carousel
        getEmblaApi={setEmbla}
        h={maxHeight}
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
