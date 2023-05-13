// import { Readable } from "node:stream";
// import { createHash } from "node:crypto";
// import { Type } from "@sinclair/typebox";
// import { sendImage, sendJson } from "#utils/send";
// import { getMetadata, setMetadata } from "./metadata.js";

import type { Server } from "#server";
// import type { Metadata } from "./metadata.js";

export default function initStaticRoute(_server: Server): void {
  // server.get(
  //   "/image/:imageAlias/:transformAlias",
  //   {
  //     schema: {
  //       params: Type.Object({
  //         imageAlias: Type.String(),
  //         transformAlias: Type.String()
  //       })
  //     }
  //   },
  //   async function (req, res) {
  //     // const { imageAlias, transformAlias } = req.params;
  //     const [image, transform] = {} as any;
  //     if (!image || !transform) {
  //       res.status(404).send();
  //       return;
  //     }
  //     const isFileExists = await this.storage.exists(`upload/${image.id}`);
  //     if (!isFileExists) {
  //       res.status(404).send();
  //       return;
  //     }
  //     const rs = await this.storage.read(`upload/${image.id}`);
  //     const buffer = await rs
  //       .pipe(this.transformImage(transform.parameters))
  //       .toBuffer();
  //     await sendImage(req, res, buffer);
  //   }
  // );
  // server.get(
  //   "/image/:imageAlias/:transformAlias/metadata",
  //   {
  //     schema: {
  //       params: Type.Object({
  //         imageAlias: Type.String(),
  //         transformAlias: Type.String()
  //       })
  //     }
  //   },
  //   async function (req, res) {
  //     // const { imageAlias, transformAlias } = req.params;
  //     const [image, transform, imageAlias] = {} as any;
  //     if (!image || !transform) {
  //       res.status(404).send();
  //       return;
  //     }
  //     const isFileExists = await this.storage.exists(`upload/${image.id}`);
  //     if (!isFileExists) {
  //       res.status(404).send();
  //       return;
  //     }
  //     const transformHash = createHash("sha256")
  //       .update(transform.parameters)
  //       .digest("base64");
  //     const cacheKey = `image/${imageAlias}/metadata`;
  //     const cachedMetadata = await getMetadata(this, cacheKey);
  //     let metadata: Metadata;
  //     if (
  //       cachedMetadata &&
  //       cachedMetadata.hash === image.hash &&
  //       cachedMetadata.transformHash === transformHash
  //     ) {
  //       metadata = cachedMetadata;
  //     } else {
  //       const rs = await this.storage.read(`upload/${image.id}`);
  //       const { info, data: buffer } = await rs
  //         .pipe(this.transformImage(transform.parameters))
  //         .toBuffer({ resolveWithObject: true });
  //       const { mime } = await this.detectImage(Readable.from(buffer));
  //       const { format, height, width } = info;
  //       const dataUrl = `data:${mime};base64,${buffer.toString("base64")}`;
  //       metadata = {
  //         format,
  //         height,
  //         width,
  //         dataUrl,
  //         hash: image.hash,
  //         transformHash
  //       };
  //       await setMetadata(this, cacheKey, metadata);
  //     }
  //     await sendJson(req, res, metadata);
  //   }
  // );
}
