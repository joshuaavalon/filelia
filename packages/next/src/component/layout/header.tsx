import { useCallback, useContext } from "react";
import { Burger, createStyles, Header } from "@mantine/core";
import LayoutContext from "./context";
import Logo from "./logo";

import type { FC } from "react";

const useStyles = createStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: theme.spacing.md
  },
  burger: {
    [theme.fn.largerThan("md")]: {
      display: "none"
    }
  }
}));

export interface Props {
  hasAside: boolean;
}

const Component: FC<Props> = props => {
  const { hasAside } = props;
  const { classes } = useStyles();
  const {
    aside: [asideOpened, { close: asideClose, toggle: asideToggle }],
    navbar: [navbarOpened, { close: navbarClose, toggle: navbarToggle }]
  } = useContext(LayoutContext);
  const onNavbarClick = useCallback(() => {
    asideClose();
    navbarToggle();
  }, [asideClose, navbarToggle]);
  const onAsideClick = useCallback(() => {
    navbarClose();
    asideToggle();
  }, [navbarClose, asideToggle]);
  return (
    <Header height={50} className={classes.root}>
      <Burger
        opened={navbarOpened}
        onClick={onNavbarClick}
        className={classes.burger}
      />
      <Logo />
      {hasAside ? (
        <Burger
          opened={asideOpened}
          onClick={onAsideClick}
          className={classes.burger}
        />
      ) : (
        <></>
      )}
    </Header>
  );
};

Component.displayName = "Layout/Header";
export default Component;
