import { Type } from "@sinclair/typebox";

import type { Static } from "@sinclair/typebox";

export const localStorageOptionsSchema = Type.Object({
  type: Type.KeyOf(Type.Object({ local: Type.String() })),
  baseDir: Type.String()
});

export type LocalStorageOptions = Static<typeof localStorageOptionsSchema>;
