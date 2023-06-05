import { compileAjv, createAjv } from "@filelia/ajv";
import { projectSchema } from "@filelia/schema";

const ajv = createAjv({ useDefaults: true });
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function validate() {
  return compileAjv(ajv, projectSchema);
}
