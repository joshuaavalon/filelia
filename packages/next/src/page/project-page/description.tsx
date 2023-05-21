import { forwardRef, useCallback, useContext } from "react";
import Mdx from "#component/mdx";
import joinUrl from "#utils/url-join";
import { ProjectContext } from "./context";

import type { SourceOptions } from "#component/mdx";

export interface Props {}
// src={`/project/${id}/gallery/${image}?h=${maxHeight}&format=jpg`}
const Component = forwardRef<HTMLDivElement, Props>((_props, ref) => {
  const {
    description,
    result: { project }
  } = useContext(ProjectContext);
  const onSourceSrcSet = useCallback(
    (path: string, opts: SourceOptions) => {
      const { mime, height, width } = opts;
      const query: Record<string, any> = {};
      switch (mime) {
        case "image/webp":
          query["format"] = "webp";
          break;
        case "image/png":
          query["format"] = "png";
          break;
        case "image/jpg":
          query["format"] = "jpg";
          break;
        default:
          return "";
      }
      if (height) {
        query["h"] = height;
      }
      if (width) {
        query["w"] = width;
      }
      const qs = Object.entries(query).reduce((q, pair) => {
        const [key, value] = pair;
        const param = `${key}=${value}`;
        return q ? q + "&" + param : param;
      }, "");
      const baseUrl = `/project/${project.id}/gallery/`;
      return joinUrl(baseUrl, `${path}?${qs}`);
    },
    [project.id]
  );
  const onImgSrc = useCallback(
    (path: string) => joinUrl(`/project/${project.id}/gallery/`, path),
    [project.id]
  );
  return (
    <Mdx
      ref={ref}
      content={description}
      onImgSrc={onImgSrc}
      onSourceSrcSet={onSourceSrcSet}
    />
  );
});

Component.displayName = "Description";
export default Component;
