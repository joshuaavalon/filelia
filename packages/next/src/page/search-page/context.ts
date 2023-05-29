import { createContext } from "react";
import { createFormContext } from "@mantine/form";

interface ContextValue {}

const Context = createContext<ContextValue>({});

export default Context;

export interface SearchFormValues {
  tags: string[];
  notTags: string[];
  keywords: string[];
  notKeywords: string[];
}

export const [FormProvider, useFormContext, useForm] =
  createFormContext<SearchFormValues>();
