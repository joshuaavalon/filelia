import { useCallback, useContext } from "react";
import { Burger, Flex, Header, MediaQuery } from "@mantine/core";
import { NavbarContext } from "./navbar";
import { AsideContext } from "./aside";
import Logo from "./logo";

import type { FC } from "react";

export interface Props {
  hasAside: boolean;
}

const Component: FC<Props> = props => {
  const { hasAside } = props;
  const [asideOpened, { close: asideClose, toggle: asideToggle }] =
    useContext(AsideContext);
  const [navbarOpened, { close: navbarClose, toggle: navbarToggle }] =
    useContext(NavbarContext);
  const onNavbarClick = useCallback(() => {
    asideClose();
    navbarToggle();
  }, [asideClose, navbarToggle]);
  const onAsideClick = useCallback(() => {
    navbarClose();
    asideToggle();
  }, [navbarClose, asideToggle]);
  return (
    <Header height={50} p="md" sx={{ display: "flex", alignItems: "center" }}>
      <Flex
        gap="xs"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
        sx={{ width: "100%", position: "relative" }}
      >
        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <Burger
            opened={navbarOpened}
            onClick={onNavbarClick}
            size="sm"
            mr="xl"
            sx={{ position: "absolute" }}
          />
        </MediaQuery>
        <Logo />
      </Flex>
      <div style={{ flex: 1 }} />
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        {hasAside ? (
          <Burger
            opened={asideOpened}
            onClick={onAsideClick}
            size="sm"
            mr="xl"
            sx={{ position: "absolute", right: 0 }}
          />
        ) : (
          <></>
        )}
      </MediaQuery>
    </Header>
  );
};

Component.displayName = "Header";
export default Component;
