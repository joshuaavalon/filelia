import { Title } from "@mantine/core";
import { Prism } from "@mantine/prism";

import type { FC } from "react";

export interface Props {
  title: string;
  json: unknown;
  link: string;
}

const Component: FC<Props> = props => {
  const { json, title, link } = props;
  return (
    <>
      <Title order={2} id={link} sx={{ scrollMarginTop: 60 }}>
        {title}
      </Title>
      <Prism language="json" withLineNumbers sx={{ width: "100%" }}>
        {JSON.stringify(json, null, 2)}
      </Prism>
    </>
  );
};

Component.displayName = "JsonSection";
export default Component;
