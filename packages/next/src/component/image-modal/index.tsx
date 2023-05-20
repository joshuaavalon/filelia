import { useEffect } from "react";
import { Center, createStyles, MantineProvider, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import type { FC } from "react";
import type { ModalBaseStylesNames, Styles } from "@mantine/core";

interface StyleProps {
  zoom: boolean;
}

const modalStyles: Styles<
  ModalBaseStylesNames,
  Record<string, any>
> = theme => ({
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
  }
});

const useStyle = createStyles<string, StyleProps>((theme, props) => {
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
      minHeight: zoom ? "100vh" : undefined,
      cursor: "pointer"
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
  const { classes } = useStyle({ zoom });
  useEffect(() => {
    if (opened) {
      zoomOut();
    }
  }, [opened, zoomOut]);
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <Modal
        opened={opened}
        onClose={close}
        transitionProps={{ transition: "fade", duration: 200 }}
        fullScreen
        styles={modalStyles}
        closeButtonProps={{
          size: "xl",
          color: "dark"
        }}
      >
        <Center className={classes.center} onClick={toggle}>
          <img src={src} alt={alt} className={classes.image} />
        </Center>
      </Modal>
    </MantineProvider>
  );
};

Component.displayName = "ImageModal";
export default Component;
