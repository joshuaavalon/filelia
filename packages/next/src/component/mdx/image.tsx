import { useContext, useMemo } from "react";
import { createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ImageModal from "#component/image-modal";
import { MdxContext } from "./context";

import type { FC } from "react";

const useStyles = createStyles({
  picture: {
    objectFit: "cover",
    maxHeight: "100%",
    maxWidth: "100%",
    cursor: "pointer"
  }
});

export interface Props {
  src?: string;
  alt?: string;
  height?: number;
  width?: number;
  onLoad?: () => void;
}

const Component: FC<Props> = props => {
  const { src, alt, height, width, onLoad } = props;
  const { onImgSrc, onSourceSrcSet } = useContext(MdxContext);
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const webp = useMemo(() => {
    const srcSet = src
      ? onSourceSrcSet(src, { mime: "image/webp", height, width })
      : null;
    if (!srcSet) {
      return null;
    }
    return srcSet ? <source srcSet={srcSet} type="image/webp" /> : null;
  }, [onSourceSrcSet, src, height, width]);
  const png = useMemo(() => {
    const srcSet = src
      ? onSourceSrcSet(src, { mime: "image/png", height, width })
      : null;
    if (!srcSet) {
      return null;
    }
    return srcSet ? <source srcSet={srcSet} type="image/png" /> : null;
  }, [onSourceSrcSet, src, height, width]);
  const jpg = useMemo(() => {
    const srcSet = src
      ? onSourceSrcSet(src, { mime: "image/jpg", height, width })
      : null;
    if (!srcSet) {
      return null;
    }
    return srcSet ? <img src={srcSet} alt={alt} /> : null;
  }, [onSourceSrcSet, src, height, width, alt]);
  const imgSrc = useMemo(
    () => (src ? onImgSrc(src) : undefined),
    [onImgSrc, src]
  );
  return (
    <>
      <ImageModal opened={opened} src={imgSrc} close={close} alt={alt} />
      <picture className={classes.picture} onClick={open} onLoad={onLoad}>
        {webp}
        {png}
        {jpg}
      </picture>
    </>
  );
};

Component.displayName = "Image";
export default Component;
