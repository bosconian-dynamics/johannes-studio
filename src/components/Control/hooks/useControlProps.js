// 3rd-Party Dependencies.
import { useState, useEffect } from "@wordpress/element";

// Global Dependencies.
import { useTransforms } from "/lib/prop-transforms";

export const useControlProps = (Component, schema, props = {}) => {
  const [control_props, setControlProps] = useState(props);
  const transforms = useTransforms(schema, [...block_control_transforms]);

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
