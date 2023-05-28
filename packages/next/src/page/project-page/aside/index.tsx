import { useContext, useState } from "react";
import { createStyles } from "@mantine/core";
import TableOfContent from "#component/table-of-content";
import TagPanel from "#component/tag-panel";
import Metadata from "./metadata";
import Context from "../context";

import type { FC } from "react";
import type { TableOfContentItem } from "#component/table-of-content";

const useStyles = createStyles(theme => ({
  panel: {
    marginTop: theme.spacing.md
  }
}));

export interface Props {
  toc: TableOfContentItem[];
}

const Component: FC<Props> = props => {
  const { toc } = props;
  const { result } = useContext(Context);
  const [active, setActive] = useState(toc.length > 0 ? toc[0].href : "");
  const { classes } = useStyles();
  return (
    <>
      <TableOfContent items={toc} active={active} setActive={setActive} />
      <TagPanel tags={result.data.tags} className={classes.panel} />
      <Metadata className={classes.panel} />
    </>
  );
};

Component.displayName = "Aside";
export default Component;
