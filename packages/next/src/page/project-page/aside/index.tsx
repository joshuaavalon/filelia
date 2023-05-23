import { useContext, useState } from "react";
import TableOfContent from "#component/table-of-content";
import TagPanel from "#component/tag-panel";
import Metadata from "./metadata";
import { ProjectContext } from "../context";

import type { FC } from "react";
import type { TableOfContentItem } from "#component/table-of-content";

export interface Props {
  toc: TableOfContentItem[];
}

const Component: FC<Props> = props => {
  const { toc } = props;
  const { result } = useContext(ProjectContext);
  const [active, setActive] = useState(toc.length > 0 ? toc[0].href : "");
  return (
    <>
      <TableOfContent items={toc} active={active} setActive={setActive} />
      <TagPanel
        tags={result.data.tags}
        sx={theme => ({ marginTop: theme.spacing.md })}
      />
      <Metadata />
    </>
  );
};

Component.displayName = "Aside";
export default Component;
