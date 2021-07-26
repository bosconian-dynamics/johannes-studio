import { InputControl, SelectControl } from "@wordpress/component";

export const TRANSFORMS = [
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
