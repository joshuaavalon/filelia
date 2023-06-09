import { useMemo } from "react";
import { createStyles, ScrollArea } from "@mantine/core";
import { useFormContext } from "#page/search-page/context";
import TagPanel from "./tag-panel";

import type { FC } from "react";
import type { KeyOf } from "#type";
import type { SearchFormValues } from "#page/search-page/context";

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

interface PanelConfig {
  key: KeyOf<SearchFormValues, string[]>;
  title: string;
  type: "tag" | "keyword";
  off: boolean;
}

const configs: PanelConfig[] = [
  {
    key: "andTags",
    title: "And Tags",
    type: "tag",
    off: false
  },
  {
    key: "orTags",
    title: "Or Tags",
    type: "tag",
    off: false
  },
  {
    key: "notTags",
    title: "Not Tags",
    type: "tag",
    off: true
  },
  {
    key: "andKeywords",
    title: "And Keywords",
    type: "keyword",
    off: false
  },
  {
    key: "orKeywords",
    title: "Or Keywords",
    type: "keyword",
    off: false
  },
  {
    key: "notKeywords",
    title: "Not Keywords",
    type: "keyword",
    off: true
  }
];

export interface Props {}

const Component: FC<Props> = () => {
  const form = useFormContext();
  const {
    classes: { panel, ...classes }
  } = useStyles();
  const panels = useMemo(
    () =>
      configs.map(cfg =>
        form.values[cfg.key].length > 0 ? (
          <TagPanel
            key={cfg.key}
            title={cfg.title}
            type={cfg.type}
            className={panel}
            valueKey={cfg.key}
            off={cfg.off}
          />
        ) : undefined
      ),
    [form, panel]
  );
  return <ScrollArea classNames={classes}>{panels}</ScrollArea>;
};

Component.displayName = "SearchPage/Aside/MainSection";
export default Component;
