/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty-function */
import { createContext } from "react";
import type { Disclosure } from "#type";

interface LayoutContext {
  navbar: Disclosure;
  aside: Disclosure;
}

const Context = createContext<LayoutContext>({
  navbar: [false, { open: () => {}, close: () => {}, toggle: () => {} }],
  aside: [false, { open: () => {}, close: () => {}, toggle: () => {} }]
});

export default Context;
