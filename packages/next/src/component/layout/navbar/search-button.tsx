import { useCallback } from "react";
import { useRouter } from "next/router";
import { TbSearch } from "react-icons/tb";
import LinkButton from "./link-button";

import type { FC } from "react";

export interface Props {}

const Component: FC<Props> = () => {
  const router = useRouter();
  const onClick = useCallback(() => {
    router.push("/search");
  }, [router]);
  return (
    <LinkButton icon={<TbSearch />} color="blue" onClick={onClick}>
      Search
    </LinkButton>
  );
};

Component.displayName = "SearchButton";
export default Component;
