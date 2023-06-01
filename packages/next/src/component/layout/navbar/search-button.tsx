import { useCallback } from "react";
import { useRouter } from "next/router";
import { IconSearch } from "@tabler/icons-react";
import LinkButton from "./link-button";

import type { FC } from "react";

export interface Props {}

const Component: FC<Props> = () => {
  const router = useRouter();
  const onClick = useCallback(() => {
    router.push("/search");
  }, [router]);
  return (
    <LinkButton
      icon={<IconSearch size="1rem" />}
      color="blue"
      onClick={onClick}
    >
      Search
    </LinkButton>
  );
};

Component.displayName = "SearchButton";
export default Component;
