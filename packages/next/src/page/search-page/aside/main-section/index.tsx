import { createStyles, ScrollArea } from "@mantine/core";
import { TbHash, TbKey, TbKeyOff, TbMinus } from "react-icons/tb";
import { useFormContext } from "#page/search-page/context";
import TagPanel from "./tag-panel";

import type { FC } from "react";

const useStyles = createStyles(theme => ({
  root: {
    flex: "1",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md
  },
  viewport: {
    "> div": {
      display: "block !important"
    }
  },
  panel: {
    marginBottom: theme.spacing.md
  }
}));

export interface Props {}

const Component: FC<Props> = () => {
  const form = useFormContext();
  const { tags, notTags, keywords, notKeywords } = form.values;
  const {
    classes: { panel, ...classes }
  } = useStyles();
  return (
    <ScrollArea classNames={classes}>
      {tags.length > 0 ? (
        <TagPanel
          title="Tags"
          icon={<TbHash />}
          className={panel}
          type
          tagsKey="tags"
        />
      ) : undefined}
      {notTags.length > 0 ? (
        <TagPanel
          title="Not Tags"
          icon={<TbMinus />}
          className={panel}
          type
          tagsKey="notTags"
        />
      ) : undefined}
      {keywords.length > 0 ? (
        <TagPanel
          title="Keyword"
          icon={<TbKey />}
          className={panel}
          tagsKey="keywords"
        />
      ) : undefined}
      {notKeywords.length > 0 ? (
        <TagPanel
          title="Not keyword"
          icon={<TbKeyOff />}
          className={panel}
          tagsKey="notKeywords"
        />
      ) : undefined}
    </ScrollArea>
  );
};

Component.displayName = "SearchPage/Aside/MainSection";
export default Component;
