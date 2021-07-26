import {
  SelectControl,
  __experimentalInputControl as InputControl
} from "@wordpress/components";
import { useEffect, useState, useMemo } from "@wordpress/element";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

import { useRepo } from "/lib/data/repo";

const defaultChangeHandler = (value, { setValue }, prev) => setValue(value);

const CONTROL_PROP_TRANSFORMS = [
  [InputControl, (props, schema) => props],
  [
    SelectControl,
    (props, schema) => {
      if (props.options) {
        if (!Array.isArray(props.options)) {
          props.options = Object.entries(
            props.options
          ).map(([label, value]) => ({ label, value }));
        }
      } else {
        if (schema.enum) {
          props.options = schema.enum.map((value) => ({
            value,
            label: value[0].toUpperCase() + value.substr(1)
          }));
        }

        if (!props.required) {
          props.options.unshift({
            value: null,
            label: "(none)"
          });
        }
      }

      if (!props.value)
        props.value = schema.default ?? props.options[0]?.value ?? null;

      return props;
    }
  ]
];

const useTransforms = (schema, transforms = [], init = []) => {
  const registry = useRepo(transforms);
  const queue = useRepo(init);

  const api = {
    registry,
    queue,
    add: (key) => {
      const transform = registry[key];

      if (transform) {
        if (!queue.includes(transform)) queue.push(transform, key);

        return;
      }

      if ("function" === typeof key) {
        registry.add(key, key);

        queue.push(key, key);

        return;
      }

      throw new TypeError("Unknown key type.");
    },
    register: registry.add.bind(registry),
    set: registry.set.bind(registry),
    apply(props = {}) {
      for (const transform of queue) props = transform(props, schema);

      return props;
    }
  };

  return api;
};

export const useComponentBlockControls = (manifest = {}, props = {}) => {
  const { attributes } = manifest;
  const [controls, setControls] = useState([]);

  useEffect(() => {
    const controls = [];

    if (!attributes) return;

    for (const [name, schema] of Object.entries(attributes)) {
      controls[name] = (
        <BlockControl key={name} name={name} schema={schema} {...props} />
      );
    }

    setControls(controls);
  }, [attributes, props]);

  controls.set = setControls;

  return controls;
};

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
