import { useMemo } from "react";
import { createStyles } from "@mantine/core";
import { useFormContext } from "#page/search-page/context";
import { SearchCondFormProvider, useSearchCondForm } from "./context";
import SearchInput from "./search-input";
import TypeInput from "./type-input";
import CondInput from "./cond-input";

import type { FC } from "react";
import type { KeyOf } from "#type";
import type { SearchFormValues } from "#page/search-page/context";

const useStyles = createStyles(theme => ({
  root: {
    padding: theme.spacing.md,
    display: "flex",
    flexDirection: "column"
  }
}));

export interface Props {}

const Component: FC<Props> = () => {
  const { classes } = useStyles();
  const searchForm = useSearchCondForm({
    initialValues: {
      type: "tag",
      condition: "and",
      search: ""
    }
  });
  const form = useFormContext();
  const onSubmit = useMemo(
    () =>
      searchForm.onSubmit(values => {
        const { search, type, condition } = values;
        if (!search) {
          return;
        }
        let key: KeyOf<SearchFormValues, string[]>;
        switch (condition) {
          case "and":
            key = type === "tag" ? "andTags" : "andKeywords";
            break;
          case "or":
            key = type === "tag" ? "orTags" : "orKeywords";
            break;
          case "not":
            key = type === "tag" ? "notTags" : "notKeywords";
            break;
          default:
            return;
        }
        if (!form.values[key].includes(search)) {
          form.insertListItem(key, search);
        }
        searchForm.setFieldValue("search", "");
      }),
    [searchForm, form]
  );
  return (
    <SearchCondFormProvider form={searchForm}>
      <form onSubmit={onSubmit}>
        <section className={classes.root}>
          <SearchInput />
          <TypeInput />
          <CondInput />
        </section>
      </form>
    </SearchCondFormProvider>
  );
};

Component.displayName = "SearchPage/Aside/InputSection";
export default Component;
