import { useCallback } from "react";
import { useRouter } from "next/router";
import { Flex } from "@mantine/core";
import Header from "./header";

import type { FC } from "react";
import type { SearchTag } from "#type";

export interface Props {
  tags: SearchTag[];
  page: number;
  totalPage: number;
}

const Component: FC<Props> = props => {
  const { tags, totalPage, page } = props;
  const router = useRouter();
  const onPageChange = useCallback(
    (page: number) => {
      const query = { ...router.query, page };
      router.push({ query });
    },
    [router]
  );
  return (
    <Flex
      gap="md"
      justify="center"
      align="stretch"
      direction="column"
      wrap="wrap"
    >
      <Header />
    </Flex>
  );
};

Component.displayName = "TagsPage/Panel";
export default Component;
