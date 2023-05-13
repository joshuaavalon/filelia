import { validate } from "uuid";
import { FormatRegistry } from "@sinclair/typebox";

FormatRegistry.Set("uuid", value => validate(value));
