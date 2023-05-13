import imageType, { minimumBytes } from "image-type";

import type { Readable } from "node:stream";
import type { ImageTypeResult } from "image-type";

const defaultContentType = "application/octet-stream";

type DetectImageResult = Pick<ImageTypeResult, "mime"> &
  Partial<Pick<ImageTypeResult, "ext">>;

export async function detectImage(rs: Readable): Promise<DetectImageResult> {
  const chunk = rs.read(minimumBytes);
  rs.destroy();
  const result = await imageType(chunk);
  if (!result) {
    return { mime: defaultContentType };
  }
  return result;
}
