import sharp from "sharp";
// import { toImageQuery } from "@filelia/image-query";

import type { Sharp } from "sharp";
// import type { Operation } from "@filelia/image-query";

/* eslint-disable complexity */
const mapOperation = (sharp: Sharp, operation: any): Sharp => {
  const { name } = operation;
  switch (name) {
    case "affine":
      return sharp.affine(operation.arg1, operation.arg2);
    case "blur":
      return sharp.blur(operation.arg1);
    case "resize":
      return sharp.resize(operation.arg1);
    case "extend":
      return sharp.extend(operation.arg1);
    case "extract":
      return sharp.extract(operation.arg1);
    case "trim":
      return sharp.trim(operation.arg1);
    case "threshold":
      return sharp.threshold(operation.arg1, operation.arg2);
    case "rotate":
      return sharp.rotate(operation.arg1, operation.arg2);
    case "flip":
      return sharp.flip(operation.arg1);
    case "flop":
      return sharp.flop(operation.arg1);
    case "sharpen":
      return sharp.sharpen(operation.arg1);
    case "median":
      return sharp.median(operation.arg1);
    case "flatten":
      return sharp.flatten(operation.arg1);
    case "gamma":
      return sharp.gamma(operation.arg1, operation.arg2);
    case "negate":
      return sharp.negate(operation.arg1);
    case "normalise":
    case "normalize":
      return sharp.normalize(operation.arg1);
    case "clahe":
      return sharp.clahe(operation.arg1);
    case "convolve":
      return sharp.convolve(operation.arg1);
    case "greyscale":
    case "grayscale":
      return sharp.grayscale(operation.arg1);
    case "linear":
      return sharp.linear(operation.arg1, operation.arg2);
    case "modulate":
      return sharp.modulate(operation.arg1);
    case "tint":
      return sharp.tint(operation.arg1);
    case "pipelineColorspace":
    case "pipelineColourspace":
      return sharp.pipelineColorspace(operation.arg1);
    case "toColorspace":
    case "toColourspace":
      return sharp.toColorspace(operation.arg1);
    case "removeAlpha":
      return sharp.removeAlpha();
    case "ensureAlpha":
      return sharp.ensureAlpha(operation.arg1);
    case "extractChannel":
      return sharp.extractChannel(operation.arg1);
    case "withMetadata":
      return sharp.withMetadata(operation.arg1);
  }
  return sharp;
};
/* eslint-enable complexity */

export function transformImage(queryStr: string): Sharp {
  const result = queryStr as any; //toImageQuery(queryStr);
  if ("errors" in result) {
    // TODO: Better Error message
    throw new Error(result.errors.toString());
  }
  const {
    operations,
    format: { name, options }
  } = result.query;
  return operations.reduce(mapOperation, sharp()).toFormat(name, options);
}
