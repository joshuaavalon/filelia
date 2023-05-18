import { useMemo, useState } from "react";
import Metadata from "#component/metadata";
import Layout from "#component/layout";
import TableOfContent from "#component/table-of-content";
import TagPanel from "#component/tag-panel";
import Panel from "./panel";
import { GenericProjectContext } from "./context";

import type { FC } from "react";
import type { Project } from "#type";
import type { TableOfContentItem } from "#component/table-of-content";
import type { GenericProject } from "./type";

export interface Props {
  project: Project;
  json: unknown;
}

const Component: FC<Props> = props => {
  const { json, project } = props;
  const genericProject = json as GenericProject;
  const toc = useMemo<TableOfContentItem[]>(() => {
    const items: TableOfContentItem[] = [];
    if (genericProject.gallery.length > 0) {
      items.push({
        href: "#gallery",
        label: "Gallery",
        order: 1
      });
    }
    return items;
  }, [genericProject.gallery]);
  const [active, setActive] = useState(toc.length > 0 ? toc[0].href : "");
  return (
    <GenericProjectContext.Provider value={{ project, genericProject }}>
      <Layout
        aside={
          <>
            <TableOfContent items={toc} active={active} setActive={setActive} />
            <TagPanel
              tags={project.tags}
              sx={theme => ({ marginTop: theme.spacing.md })}
            />
          </>
        }
      >
        <Metadata title={project.title} />
        <Panel />
      </Layout>
    </GenericProjectContext.Provider>
  );
};

Component.displayName = "GenericProjectPage";
export default Component;
