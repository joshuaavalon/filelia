import { colorSchemeKey } from "#provider/color-scheme";

import type { GetServerSidePropsContext } from "next";
import type { ColorScheme } from "@mantine/core";

type Request = GetServerSidePropsContext["req"];

export default function getColorScheme(req: Request): ColorScheme {
  return req.cookies[colorSchemeKey] === "dark" ? "dark" : "light";
}
