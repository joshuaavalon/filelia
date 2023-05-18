import { createStyles } from "@mantine/core";
import { TbList } from "react-icons/tb";
import AsideHeader from "#component/aside-header";

import type { FC, MouseEventHandler } from "react";

const useStyles = createStyles(theme => ({
  icon: {
    fontSize: theme.fontSizes.md
  }
}));

export interface Props {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Component: FC<Props> = props => {
  const { onClick } = props;
  const { classes } = useStyles();
  return (
    <AsideHeader
      label="Table of contents"
      icon={<TbList className={classes.icon} />}
      onClick={onClick}
    />
  );
};

Component.displayName = "TableOfContentHeader";
export default Component;
