import { useSelect } from "/lib/data";
import Editor from "/components/editor";

import * as block_types from "./blocks";

export const BlockEditor = (props) => {
  console.log("BOCK EDITOR SCENE", block_types, "PROPS", props);

  const type_defs = Object.fromEntries(
    Object.entries(block_types).map(([name, module]) => [name, module.default])
  );

  Object.values(block_types).map(({ default: def }) => def);

  return <Editor blockTypes={type_defs} />;
};

BlockEditor.displayName = "BlockEditor";

export default BlockEditor;
