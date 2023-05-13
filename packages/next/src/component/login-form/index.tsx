import { useCallback, useState } from "react";
import {
  Button,
  Card,
  Group,
  LoadingOverlay,
  Text,
  TextInput
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { MdLockOutline } from "react-icons/md";
import ErrorMessage from "./error-message";

import type { FC } from "react";

interface FormValues {
  loginName: string;
  password: string;
}

export interface Props {}

const Component: FC<Props> = () => {
  // const [login, { loading }] = useLoginMutation();
  const loading = false;
  const [formError] = useState("");
  const form = useForm<FormValues>({
    initialValues: {
      loginName: "",
      password: ""
    },
    validate: {
      loginName: hasLength(
        { min: 1, max: 50 },
        "Must be 1-50 character(s) long"
      ),
      password: hasLength(
        { min: 10, max: 100 },
        "Must be 10-100 characters long"
      )
    }
  });
  const onSubmit = useCallback((_values: FormValues): void => {
    // login({
    //   // variables: { input: { ...values } },
    //   // onCompleted: (res, errors) => {
    //   //   if (!res.login || errors) {
    //   //     setFormError("Invalid login name or password");
    //   //     return;
    //   //   }
    //   //   console.log(res);
    //   // },
    //   // onError: () => {
    //   //   setFormError("Failed to login. Please try again");
    //   // }
    // });
  }, []);
  return (
    <Card shadow="xs" padding="md" w="100%" maw="30rem">
      <form onSubmit={form.onSubmit(onSubmit)} autoComplete="off">
        <LoadingOverlay visible={loading} />
        <Group position="center">
          <MdLockOutline />
          <Text fz="xl">Login</Text>
        </Group>
        <ErrorMessage message={formError} />
        <TextInput
          mt="md"
          withAsterisk
          label="Login Name"
          {...form.getInputProps("loginName")}
        />
        <TextInput
          mt="md"
          withAsterisk
          label="Password"
          type="password"
          {...form.getInputProps("password")}
        />
        <Group position="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Card>
  );
};

Component.displayName = "LoginForm";
export default Component;
