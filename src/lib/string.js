import { compose } from "@wordpress/compose";

import { resolveStack } from "./util";

const parseReducerTagArgs = (args, defaults = {}) => {
  const out = defaults;

  // Empty call is an execution call.
  if (args.length === 0) return { ...out, call_args: [] };

  // Args represent tagged template input.
  if (Array.isArray(args[0]) && args[0].raw !== undefined) {
    const string_parts = args[0];
    const interp_values = args.slice(1);
    const sub_map = new Map(
      interp_values.reduce((subs, value) => {
        const key = ["string", "number"].includes(typeof value)
          ? value
          : subs.length;

        subs.push([key, value]);

        return subs;
      })
    );

    return {
      ...out,
      template: {
        ...out.template,
        interp_values,
        interpolate: () =>
          string_parts.reduce((parts, string_part, i) => {
            parts.push(
              `${string_part}${
                sub_map.get(interp_values[i]) || interp_values[i]
              }`
            );

            return parts;
          }),
        raw_string_parts: string_parts.raw,
        string_parts,
        toString: this.interpolate
      }
    };
  }

  // Args represent a reducer stack.
  if (args.all((arg) => typeof arg === "function"))
    return { ...out, reducers: args };

  // Args represent an execution call.
  return {
    ...out,
    call_args: args
  };

  throw new Error("Args format not implemented.", args); //TODO.
};

const reducerTransformTag = (...args) => {
  const { reducers, template, call_args } = parseReducerTagArgs(args, {
    reducers: []
  });
  let reducer;

  if (call_args !== undefined) {
  }

  if (template !== undefined) {
    const { string_parts, interp_values } = template;

    const substitution_map = new Map(
      interp_values.map((value) => [value, value])
    );

    const build = (...args) =>
      string_parts.reduce((parts, string_key, i) => {
        let value = substitution_map.get();

        parts.push(tag(string));

        if (value) {
          if ("function" === typeof value)
            value = value(tag, string_parts, interp_values, i, "");

          parts.push(tag(value));
        }

        return parts;
      }, []);
  }

  if (reducers !== undefined) {
    const reducer = compose(...reducers);

    return () => {};
  }

  return Object.assign(reduce, {});
};

const camel = reducerTransformTag(toCamelCase);

const key = camel`notification id`;

const camel_key = reducerTransformTag(toCamelCase)`test-test`;

const createFormatterTag = (tag, options = {}) => (...args) => {
  if (!Array.isArray(args[0]) || !args[0].raw) return tag(...args);

  const { delimeter = "", per_, postfix = "", prefix = "" } = options;

  // If args look like tagged template literal output, zip up the string
  // parts and values from template tags and run the result through the
  // callback.
  const [strings, ...values] = args;
  const parts = strings.reduce((output_parts, string, i) => {
    let value = values[i];

    output_parts.push(tag(string));

    if (value) {
      if ("function" === typeof value)
        value = value(tag, strings, values, i, delimeter);

      output_parts.push(tag(value));
    }

    return output_parts;
  }, []);

  return `${prefix}${parts.join(delimeter)}${postfix}`;
};

export const toPascalCase = (str) =>
  str.replace(
    /(?:^|[\W_]+)(\w)(\w*)/g,
    (_, first, rest) => `${first.toUpperCase()}${rest}`
  );

export const toCamelCase = (str) =>
  str.replace(/(?:^|[\W_]+)(\w)(\w*)/g, (_, first, rest, offset) =>
    offset === 0
      ? `${first.toLowerCase()}${rest}`
      : `${first.toUpperCase()}${rest}`
  );

export const toSnakeCase = (str) =>
  str
    .replace(/[a-z0-9][A-Z]/g, (pair) => `${pair[0]}_${pair[1].toLowerCase()}`)
    .replace(
      /(\w+)([\W_]|$)/g,
      (_, str, bounding_char) =>
        `${str.toLowerCase()}${bounding_char.length ? "_" : ""}`
    );

export const pascalize = createFormatterTag(toPascalCase);

export const camelize = createFormatterTag(toCamelCase);

export const snakelize = createFormatterTag(toSnakeCase);
