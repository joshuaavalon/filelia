import { Center } from "@mantine/core";
import LoginForm from "#component/login-form";

import type { GetServerSideProps } from "next";
import type { ParsedUrlQuery } from "querystring";

interface Props {
  value: number;
}

interface Query extends ParsedUrlQuery {
  id: string;
}

export default function Page(_props: Props): JSX.Element {
  return (
    <Center w="100vw" h="100vh" px="md">
      <LoginForm />
    </Center>
  );
}

export const getServerSideProps: GetServerSideProps<
  Props,
  Query
> = async ctx => {
  const { req } = ctx;
  console.log({ me: "!!!", s: await req.fastify?.().db.tag.findMany() });
  return {
    props: { value: 1 }
  };
};
