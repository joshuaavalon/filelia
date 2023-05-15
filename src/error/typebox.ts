import { Type } from "@sinclair/typebox";

import type { TSchema } from "@sinclair/typebox";
import type { ValueError } from "@sinclair/typebox/value";

export class TypeBoxError<T extends TSchema = TSchema> extends Error {
  public errors: ValueError[];
  public schema?: T;

  public constructor(errors: ValueError[], schema?: T) {
    super("Failed to validate");
    this.errors = errors;
    this.schema = schema ? Type.Strict(schema) : undefined;
  }
}
