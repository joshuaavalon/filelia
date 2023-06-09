import { Prism } from "@mantine/prism";

import type { FC, ReactNode } from "react";
import type { Language } from "prism-react-renderer";

export interface Props {
  className?: string;
  children?: ReactNode;
}

const Component: FC<Props> = props => {
  const { className, children } = props;
  const language = className?.replace(/^language-/u, "") as Language;
  return (
    <Prism language={language} withLineNumbers sx={{ width: "100%" }}>
      {children as string}
    </Prism>
  );
};

Component.displayName = "Code";
export default Component;
