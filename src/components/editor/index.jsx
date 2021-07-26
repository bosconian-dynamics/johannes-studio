import { useEffect, useState } from "@wordpress/element";
import {
  BlockEditorKeyboardShortcuts,
  BlockEditorProvider,
  BlockList,
  BlockTools,
  BlockInspector,
  WritingFlow,
  ObserveTyping,
  Inserter
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { Popover, SlotFillProvider } from "@wordpress/components";
import { registerCoreBlocks } from "@wordpress/block-library";
import "@wordpress/format-library";

import "./style.scss";

const FastRefresh = ({ children }) => {
  return <>{children.map()}</>;
};

export const Editor = ({ blockTypes, ...props }) => {
  const [blocks, updateBlocks] = useState(props.blocks ?? []);

  useEffect(() => {
    if (!blockTypes) {
      registerCoreBlocks();
    } else {
      for (const [name, def] of Object.entries(blockTypes)) {
        console.log(
          "REGISTER BLOCK TYPE",
          `sazerac/${name.toLowerCase()}`,
          def
        );
        registerBlockType(`sazerac/${name.toLowerCase()}`, def);
      }
    }
  }, [blockTypes]);

  const { rootClientId, clientId } = props;

  return (
    <div className="block-editor">
      <SlotFillProvider>
        <BlockEditorProvider
          value={blocks}
          onInput={updateBlocks}
          onChange={updateBlocks}
        >
          <div className="block-editor__sidebar left">
            <Inserter showInserterHelpPanel={true} />
          </div>
          <div className="block-editor__sidebar">
            <BlockInspector />
          </div>
          <div className="block-editor__content">
            <BlockTools>
              <div className="editor-styles-wrapper">
                <BlockEditorKeyboardShortcuts.Register />
                <BlockEditorKeyboardShortcuts />
                <WritingFlow>
                  <ObserveTyping>
                    <BlockList />
                  </ObserveTyping>
                </WritingFlow>
              </div>
            </BlockTools>
          </div>
          <Popover.Slot />
        </BlockEditorProvider>
      </SlotFillProvider>
    </div>
  );
};

export default Editor;
