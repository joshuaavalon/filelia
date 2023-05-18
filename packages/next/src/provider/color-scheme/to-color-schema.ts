import type { ColorScheme } from "@mantine/core";

export default function toColorSchema(value: unknown): ColorScheme | undefined;
export default function toColorSchema(
  value: unknown,
  defaultValue: ColorScheme
): ColorScheme;
export default function toColorSchema(
  value: unknown,
  defaultValue?: ColorScheme
): ColorScheme | undefined {
  return value === "light" || value === "dark" ? value : defaultValue;
}
