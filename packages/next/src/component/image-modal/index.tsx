import { useEffect } from "react";
import { Center, createStyles, MantineProvider, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { cache } from "#emotion";

import type { FC } from "react";

interface StyleProps {
  zoom: boolean;
}

const useStyle = createStyles((theme, props: StyleProps) => {
  const { zoom } = props;
  return {
    image: {
      objectFit: "cover",
      maxHeight: "100%",
      maxWidth: zoom ? undefined : "100%",
      cursor: zoom ? "zoom-out" : "zoom-in"
    },
    center: {
      height: zoom ? undefined : "100vh",
      minHeight: zoom ? "100vh" : undefined
    },
    header: {
      backgroundColor: "transparent",
      padding: theme.spacing.xs
    },
    content: {
      backgroundColor: theme.fn.rgba(theme.colors.dark[1], 0.2)
    },
    body: {
      marginTop: -64,
      padding: 0
    },
    close: {
      height: theme.spacing.xl,
      width: theme.spacing.xl,
      "> svg": {
        height: theme.spacing.xl,
        width: theme.spacing.xl
      }
    }
  };
});

export interface Props {
  src?: string;
  opened: boolean;
  close: () => void;
  alt?: string;
}

const Component: FC<Props> = props => {
  const { opened, src, alt, close } = props;
  const [zoom, { toggle, close: zoomOut }] = useDisclosure(false);
  const {
    classes: { center, image, ...modal }
  } = useStyle({ zoom });
  useEffect(() => {
    if (opened) {
      zoomOut();
    }
  }, [opened, zoomOut]);
  return (
    <MantineProvider theme={{ colorScheme: "dark" }} emotionCache={cache}>
      <Modal opened={opened} onClose={close} fullScreen classNames={modal}>
        <Center className={center} onClick={toggle}>
          <img src={src} alt={alt} className={image} />
        </Center>
      </Modal>
    </MantineProvider>
  );
};

Component.displayName = "ImageModal";
export default Component;
