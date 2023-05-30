import { createFormContext } from "@mantine/form";

export interface SearchCondFormValues {
  type: "keyword" | "tag";
  condition: "and" | "or" | "not";
  search: string;
}

export const [
  SearchCondFormProvider,
  useSearchCondFormContext,
  useSearchCondForm
] = createFormContext<SearchCondFormValues>();
