import { Center } from "@mantine/core";
import LoginForm from "#component/login-form";

import type { GetStaticProps } from "next";

interface Props {
  value: number;
}

export default function Page(_props: Props): JSX.Element {
  return (
    <Center w="100vw" h="100vh" px="md">
      <LoginForm />
    </Center>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    value: 1
  }
});

// export const getServerSideProps: GetServerSideProps = async ctx => {
//   const { req } = ctx;
//   if (req.headers.authorization || req.cookies[CookieKey.token]) {
//   }
//   return {};
// };
