// 3rd-Party Dependencies.
import { useEffect, useState } from "@wordpress/element";
import { SelectControl, InputControl } from "@wordpress/blocks";

// Global Dependencies.
import { useTransforms } from "/lib/block-utils";

// Local Dependencies.
import transforms from "./lib/transforms";

const defaultChangeHandler = (value, { setValue }, prev) => setValue(value);

export const useBlockControlProps = (Component, schema, props = {}) => {
  const [control_props, setControlProps] = useState(props);
  const transforms = useTransforms(schema, [...transforms]);

  useEffect(() => {});

  useEffect(() => {
    setControlProps(transforms.apply(props));
  }, [transforms, props]);

  return {
    control_props,
    transforms,
    setControlProps
  };
};

export const BlockControl = ({ name, schema, onChange, ...props }) => {
  const [value, setValue] = useState(props.value ?? schema.default);
  const [Component, setComponent] = useState();
  const { control_props, setControlProps } = useBlockControlProps(
    Component,
    schema,
    props.filter()
  );

  if (!onChange) onChange = schema.onChange ?? defaultChangeHandler;

  useEffect(() => {
    if (Component || !schema.control) return;

    if (schema.control.component) setComponent(schema.control.component);

    if (schema.type === "string")
      setComponent(schema.enum ? SelectControl : InputControl);
  }, [Component, schema]);

  return (
    <Component
      {...control_props}
      onChange={(v) => onChange(v, setValue, value)}
    />
  );
};

export default BlockControl;
