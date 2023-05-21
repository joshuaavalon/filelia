import { useContext, useMemo } from "react";
import { Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ImageModal from "#component/image-modal";
import { MdxContext } from "./context";

import type { FC } from "react";

const height = 300;

export interface Props {
  src?: string;
  alt?: string;
}

const Component: FC<Props> = props => {
  const { src, alt } = props;
  const { onImgSrc, onSourceSrcSet } = useContext(MdxContext);
  const [opened, { open, close }] = useDisclosure(false);
  const webp = useMemo(() => {
    const srcSet = src
      ? onSourceSrcSet(src, { mime: "image/webp", height })
      : null;
    if (!srcSet) {
      return null;
    }
    return srcSet ? <source srcSet={srcSet} type="image/webp" /> : null;
  }, [onSourceSrcSet, src]);
  const png = useMemo(() => {
    const srcSet = src
      ? onSourceSrcSet(src, { mime: "image/png", height })
      : null;
    if (!srcSet) {
      return null;
    }
    return srcSet ? <source srcSet={srcSet} type="image/png" /> : null;
  }, [onSourceSrcSet, src]);
  const jpg = useMemo(() => {
    const srcSet = src
      ? onSourceSrcSet(src, { mime: "image/jpg", height })
      : null;
    if (!srcSet) {
      return null;
    }
    return srcSet ? <img src={srcSet} alt={alt} /> : null;
  }, [onSourceSrcSet, src, alt]);
  const imgSrc = useMemo(
    () => (src ? onImgSrc(src) : undefined),
    [onImgSrc, src]
  );
  return (
    <Center>
      <ImageModal opened={opened} src={imgSrc} close={close} alt={alt} />
      <picture
        style={{ objectFit: "cover", maxHeight: "100%", maxWidth: "100%" }}
        onClick={open}
      >
        {webp}
        {png}
        {jpg}
      </picture>
    </Center>
  );
};

Component.displayName = "Img";
export default Component;
