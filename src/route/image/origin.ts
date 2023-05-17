// import { Readable } from "node:stream";
// import sharp from "sharp";
// import { Type } from "@sinclair/typebox";
// import { sendImage, sendJson } from "#utils/send";
// import { getMetadata, setMetadata } from "./metadata.js";

import type { Server } from "#server";
// import type { Metadata } from "./metadata.js";

export default function initOriginRoute(_server: Server): void {
  // server.get(
  //   "/image/:imageAlias",
  //   {
  //     schema: {
  //       params: Type.Object({ imageAlias: Type.String() })
  //     }
  //   },
  //   async function (req, res) {
  //     // const { imageAlias } = req.params;
  //     const image = {} as any;
  //     if (!image) {
  //       res.status(404).send();
  //       return;
  //     }
  //     const isFileExists = await this.storage.exists(`upload/${image.id}`);
  //     if (!isFileExists) {
  //       res.status(404).send();
  //       return;
  //     }
  //     const rs = await this.storage.read(`upload/${image.id}`);
  //     await sendImage(req, res, rs);
  //   }
  // );
  // server.get(
  //   "/image/:imageAlias/metadata",
  //   {
  //     schema: {
  //       params: Type.Object({ imageAlias: Type.String() })
  //     }
  //   },
  //   async function (req, res) {
  //     const { imageAlias } = req.params;
  //     const image = {} as any;
  //     if (!image) {
  //       res.status(404).send();
  //       return;
  //     }
  //     const isFileExists = await this.storage.exists(`upload/${image.id}`);
  //     if (!isFileExists) {
  //       res.status(404).send();
  //       return;
  //     }
  //     const cacheKey = `image/${imageAlias}/metadata`;
  //     const cachedMetadata = await getMetadata(this, cacheKey);
  //     let metadata: Metadata;
  //     if (cachedMetadata && cachedMetadata.hash === image.hash) {
  //       metadata = cachedMetadata;
  //     } else {
  //       const rs = await this.storage.read(`upload/${image.id}`);
  // const { info, data: buffer } = await rs
  //   .pipe(sharp())
  //   .toBuffer({ resolveWithObject: true });
  // const { mime } = await this.detectImage(Readable.from(buffer));
  // const { format, height, width } = info;
  // const dataUrl = `data:${mime};base64,${buffer.toString("base64")}`;
  // metadata = { format, height, width, dataUrl, hash: image.hash };
  // await setMetadata(this, cacheKey, metadata);
  //     }
  //     await sendJson(req, res, metadata);
  //   }
  // );
}
