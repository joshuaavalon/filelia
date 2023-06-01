import { useMemo } from "react";
import { useRouter } from "next/router";
import { Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";

import type { FC } from "react";

export interface Props {}

const Component: FC<Props> = () => {
  const form = useForm({ initialValues: { search: "" } });
  const router = useRouter();
  const onSubmit = useMemo(
    () =>
      form.onSubmit(values => {
        router.push({
          pathname: "/search",
          query: { andKeywords: values.search }
        });
        form.setFieldValue("search", "");
      }),
    [router, form]
  );
  return (
    <form onSubmit={onSubmit}>
      <Input
        icon={<IconSearch size="1rem" />}
        placeholder="Search"
        {...form.getInputProps("search")}
      />
    </form>
  );
};

Component.displayName = "SearchInput";
export default Component;
