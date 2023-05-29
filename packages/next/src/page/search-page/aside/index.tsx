import { useMemo } from "react";
import { useRouter } from "next/router";
import { createStyles } from "@mantine/core";
import { useFormContext } from "#page/search-page/context";
import InputSection from "./input-section";
import MainSection from "./main-section";
import BottomSection from "./bottom-section";

import type { FC } from "react";

const useStyles = createStyles({
  form: { display: "flex", flexDirection: "column", height: "100%" }
});

export interface Props {}

const Component: FC<Props> = () => {
  const form = useFormContext();
  const router = useRouter();
  const { classes } = useStyles();
  const onSubmit = useMemo(
    () =>
      form.onSubmit(values => {
        const { tags, notTags, keywords, notKeywords } = values;
        router.push({ query: { tags, notTags, keywords, notKeywords } });
      }),
    [form, router]
  );
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <InputSection />
      <MainSection />
      <BottomSection />
    </form>
  );
};

Component.displayName = "SearchPage/Aside";
export default Component;
