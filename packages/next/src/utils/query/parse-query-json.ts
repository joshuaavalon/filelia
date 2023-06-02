import Ajv from "ajv/dist/2019.js";
import addFormats from "ajv-formats";

import type { Static, TSchema } from "@sinclair/typebox";

const ajv = new Ajv({ useDefaults: true });
addFormats(ajv);

interface Options<T extends TSchema> {
  default: Static<T>;
  schema: T;
  /**
   * Use first item. Default `false`
   */
  first?: boolean;
}

function parse<T extends TSchema>(query: string, opts: Options<T>): Static<T> {
  const { default: defaultValue, schema } = opts;
  const validate = ajv.compile<Static<T>>(schema);
  try {
    const value = JSON.parse(query);
    return validate(value) ? value : defaultValue;
  } catch {
    return defaultValue;
  }
}

export default function parseQueryJson<T extends TSchema>(
  query: string | string[] | undefined,
  opts: Options<T>
): Static<T> {
  const { default: defaultValue, first } = opts;
  if (!query) {
    return defaultValue;
  }
  let item: string;
  if (Array.isArray(query)) {
    if (query.length <= 0) {
      return defaultValue;
    }
    item = first ? query[0] : query[query.length - 1];
  } else {
    item = query;
  }
  return parse(item, opts);
}
