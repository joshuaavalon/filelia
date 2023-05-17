import { validateFuncs } from "./json-schema/index.js";

import type { ValidateFunction } from "ajv/dist/2019.js";
import type { ValidateFuncs } from "./json-schema/index.js";

export function validateFunc<T extends keyof ValidateFuncs>(
  type: T
): ValidateFuncs[T];
export function validateFunc(
  type: string
): ValidateFunction<unknown> | undefined;
export function validateFunc<T extends keyof ValidateFuncs>(
  type: T
): ValidateFuncs[T] {
  return validateFuncs[type];
}
