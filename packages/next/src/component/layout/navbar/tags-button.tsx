import { useCallback } from "react";
import { useRouter } from "next/router";
import { IconTags } from "@tabler/icons-react";
import LinkButton from "./link-button";

import type { FC } from "react";

export interface Props {}

const Component: FC<Props> = () => {
  const router = useRouter();
  const onClick = useCallback(() => {
    router.push("/tags");
  }, [router]);
  return (
    <LinkButton icon={<IconTags size="1rem" />} color="blue" onClick={onClick}>
      Tags
    </LinkButton>
  );
};

Component.displayName = "TagsButton";
export default Component;
