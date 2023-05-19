import { useContext, useMemo } from "react";
import { useDisclosure } from "@mantine/hooks";
import ImageModal from "#component/image-modal";
import { MdxContext } from "./context";

import type { FC } from "react";

export interface Props {
  src?: string;
  alt?: string;
  height?: number;
  width?: number;
}

const Component: FC<Props> = props => {
  const { src, alt, height, width } = props;
  const { onImgSrc, onSourceSrcSet } = useContext(MdxContext);
  const [opened, { open, close }] = useDisclosure(false);
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
      <picture
        style={{ objectFit: "cover", maxHeight: "100%", maxWidth: "100%" }}
        onClick={open}
      >
        {webp}
        {png}
        {jpg}
      </picture>
    </>
  );
};

Component.displayName = "Image";
export default Component;
