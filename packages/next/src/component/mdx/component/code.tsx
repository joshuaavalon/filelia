import { createStyles } from "@mantine/core";
import { Prism } from "@mantine/prism";

import type { FC, ReactNode } from "react";
import type { Language } from "prism-react-renderer";

const useStyles = createStyles({
  prism: { width: "100%" }
});

export interface Props {
  className?: string;
  children?: ReactNode;
}

const Component: FC<Props> = props => {
  const { className, children } = props;
  const { classes } = useStyles();
  const language = className?.replace(/^language-/u, "") as Language;
  return (
    <Prism language={language} withLineNumbers className={classes.prism}>
      {children as string}
    </Prism>
  );
};

Component.displayName = "Code";
export default Component;
