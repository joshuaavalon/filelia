import { useContext } from "react";
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
  const aside = useContext(AsideContext);
  const navbar = useContext(NavbarContext);
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
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={navbar.opened}
            onClick={navbar.toggleOpened}
            size="sm"
            mr="xl"
            sx={{ position: "absolute" }}
          />
        </MediaQuery>
        <Logo />
      </Flex>
      <div style={{ flex: 1 }} />
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        {hasAside ? (
          <Burger
            opened={aside.opened}
            onClick={aside.toggleOpened}
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
