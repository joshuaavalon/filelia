import { useCallback } from "react";
import { useRouter } from "next/router";
import { Center, Flex, Pagination } from "@mantine/core";
import Header from "./header";
import ResultSection from "./result-section";

import type { FC } from "react";
import type { SearchProject } from "#type";

export interface Props {
  projects: SearchProject[];
  page: number;
  totalPage: number;
}

const Component: FC<Props> = props => {
  const { projects, totalPage, page } = props;
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
      <ResultSection projects={projects} />
      <Center>
        <Pagination total={totalPage} value={page} onChange={onPageChange} />
      </Center>
    </Flex>
  );
};

Component.displayName = "SearchPage/Panel";
export default Component;
