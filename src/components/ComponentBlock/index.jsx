import { InspectorControls } from "@wordpress/block-editor";
import { Control } from "./components/Control";

export const ComponentBlock = ({
  component: Component,
  manifest,
  children,
  ...props
}) => (
  <div {...useBlockProps()}>
    <InspectorControls>{useBlockComponentControls(manifest)}</InspectorControls>
    <Component {...props}>{children}</Component>
  </div>
);
