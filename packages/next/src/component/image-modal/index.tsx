import { Center, createStyles, MantineProvider, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { cache } from "#provider/emotion";
import type { FC } from "react";

const useStyle = createStyles<string, { zoom: boolean }>((_theme, props) => {
  const { zoom } = props;
  return {
    imageFit: {
      objectFit: "cover",
      maxHeight: "100%",
      maxWidth: zoom ? undefined : "100%"
    },
    center: {
      height: zoom ? undefined : "100vh",
      cursor: zoom ? "zoom-out" : "zoom-in"
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
  const [zoom, { toggle }] = useDisclosure(false);
  const { classes } = useStyle({ zoom });
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <Modal
        opened={opened}
        onClose={close}
        transitionProps={{ transition: "fade", duration: 200 }}
        padding={0}
        fullScreen
        styles={theme => ({
          content: {
            backgroundColor: theme.fn.rgba(theme.colors.dark[1], 0.2)
          },
          body: {
            // height: "100%"
            marginTop: -64
          },
          header: {
            backgroundColor: "transparent",
            padding: theme.spacing.xs
          }
        })}
        closeButtonProps={{
          size: "xl",
          color: "dark"
        }}
      >
        <Center className={classes.center} onClick={toggle}>
          <img src={src} alt={alt} className={classes.imageFit} />
        </Center>
      </Modal>
    </MantineProvider>
  );
};

Component.displayName = "ImageModal";
export default Component;
