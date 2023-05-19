import { createContext } from "react";

export interface SourceOptions {
  mime: string;
  height?: number;
  width?: number;
}

export interface MdxContextValue {
  onImgSrc: (path: string) => string;
  onSourceSrcSet: (path: string, opts: SourceOptions) => string;
}

export const MdxContext = createContext<MdxContextValue>({
  onImgSrc: () => "",
  onSourceSrcSet: () => ""
});
