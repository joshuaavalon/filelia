import { useMemo } from "react";
import { useRouter } from "next/router";
import { createStyles } from "@mantine/core";
import { useFormContext } from "#page/search-page/context";
import InputSection from "./input-section";
import MainSection from "./main-section";
import BottomSection from "./bottom-section";

import type { FC } from "react";

const useStyles = createStyles({
  root: { display: "flex", flexDirection: "column", height: "100%" },
  form: { display: "flex", flexDirection: "column", flex: 1 }
});

export interface Props {}

const Component: FC<Props> = () => {
  const form = useFormContext();
  const router = useRouter();
  const { classes } = useStyles();
  const onSubmit = useMemo(
    () =>
      form.onSubmit(values => {
        router.push({
          query: {
            ...router.query,
            ...values
          }
        });
      }),
    [form, router]
  );
  return (
    <div className={classes.root}>
      <InputSection />
      <form className={classes.root} onSubmit={onSubmit}>
        <MainSection />
        <BottomSection />
      </form>
    </div>
  );
};

Component.displayName = "SearchPage/Aside";
export default Component;
