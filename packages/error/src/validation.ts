import type { AnySchema, ErrorObject } from "ajv/dist/2019.js";

export default class ValidationError extends Error {
  public errors: ErrorObject[];
  public schema?: AnySchema;

  public constructor(
    errors: ErrorObject[] | null | undefined,
    schema?: AnySchema
  ) {
    super("Failed to validate");
    this.errors = errors ?? [];
    this.schema = schema;
  }
}
