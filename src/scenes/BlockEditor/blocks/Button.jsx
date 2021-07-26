import { Button, BaseControl } from "@wordpress/components";
import { ComponentBlock, useComponentBlockControls } from "/lib/block-utils";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

export const manifest = {
  apiVersion: 2,
  title: "Button",
  icon: "smiley",
  category: "components",
  attributes: {
    variant: {
      type: "string",
      enum: ["primary", "secondary", "tertiary"],
      default: null,
      control: true
    },
    content: {
      type: "string",
      default: "Button",
      control: true
    },
    disabled: {
      type: "boolean",
      default: false,
      control: true
    },
    size: {
      type: "number",
      enum: [-1, 0],
      default: 0,
      control: {
        options: [
          { label: "Normal", value: 0 },
          { label: "small", value: -1 }
        ]
      }
    }
  }
};

export const Block = ({ children, attributes, ...props }) => {
  const { label, manifest } = attributes;
  const controls = useComponentBlockControls(manifest);

  return (
    <div {...useBlockProps()}>
      <InspectorControls>{controls}</InspectorControls>
      <ComponentBlock {...props}>{label}</ComponentBlock>
    </div>
  );
};

export default {
  ...manifest,
  edit: Block
};
