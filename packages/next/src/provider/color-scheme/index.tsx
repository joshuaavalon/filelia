import { useCallback } from "react";
import { ColorSchemeProvider } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import toColorSchema from "./to-color-schema";

import type { FC, ReactNode } from "react";
import type { ColorScheme } from "@mantine/core";

export interface Props {
  /**
   * Color scheme requested by user via cookie
   */
  colorScheme?: ColorScheme;
  children: ReactNode;
  onChange?: (colorScheme: ColorScheme) => void;
}

export const colorSchemeKey = "filelia::color-scheme";

const Component: FC<Props> = props => {
  const { colorScheme: userColorScheme, onChange, children } = props;
  const systemColorScheme = useColorScheme(userColorScheme);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: colorSchemeKey,
    defaultValue: systemColorScheme,
    getInitialValueInEffect: true
  });

  const toggleColorScheme = useCallback(
    (value?: ColorScheme): void => {
      const current = toColorSchema(value, colorScheme);
      const next = current === "dark" ? "light" : "dark";
      setColorScheme(next);
      const date = new Date();
      const days = 365;
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = "; expires=" + date.toUTCString();
      document.cookie = `${colorSchemeKey}=${next}${expires}; path=/; SameSite=Strict`;
      onChange?.(next);
    },
    [colorScheme, onChange, setColorScheme]
  );
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      {children}
    </ColorSchemeProvider>
  );
};

Component.displayName = "ColorSchemeProvider";
export default Component;
