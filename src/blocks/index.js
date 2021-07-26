import { __experimentalGetCoreBlocks } from "@wordpress/block-library";

export const blocks = __experimentalGetCoreBlocks().filter(
  (block) => console.log(block) ?? true
);

export default blocks;
