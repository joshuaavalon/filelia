import { TbSearch } from "react-icons/tb";
import LinkButton from "./link-button";

import type { FC } from "react";

export interface Props {}

const Component: FC<Props> = () => (
  <LinkButton icon={<TbSearch />} color="blue">
    Search
  </LinkButton>
);

Component.displayName = "SearchButton";
export default Component;
