import { createFormContext } from "@mantine/form";

export interface SearchFormValues {
  andTags: string[];
  orTags: string[];
  notTags: string[];
  andKeywords: string[];
  orKeywords: string[];
  notKeywords: string[];
}

export const [FormProvider, useFormContext, useForm] =
  createFormContext<SearchFormValues>();
