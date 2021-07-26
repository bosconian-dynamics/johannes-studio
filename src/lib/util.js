export const pluck = (collection, property, index_by = "name") =>
  collection.reduce(
    (items, obj) => {
      if (index_by) items[obj[index_by]] = obj[property];
      else items.push(obj[property]);

      return items;
    },
    index_by ? {} : []
  );

export const resolveStack = (resolver_stack, value, ...args) => {
  for (let expression of resolver_stack) {
    if (typeof expression === "function")
      expression = expression(value, ...args);

    if (expression === true) continue;

    if (expression === false) return value;

    value = expression;
  }

  return value;
};

export const createValueReducer = ({
  arrays = false,
  functions = true,
  objects = true,
  resolvers = []
}) => {
  arrays = arrays && {
    resolve:
      (arrays.resolve ?? arrays) && resolveStack.bind(null, arrays.resolvers),
    reduce: arrays.reduce ?? false,
    resolvers: [[Array.isArray, (values, input) => resolve(values, input)]]
  };

  functions = functions && {
    default_args: {
      ...functions.default_args
    },
    mapInputToArgs: functions.mapInputToArgs ?? ((...input) => input),
    process_mapped: false,
    resolve:
      (functions.resolve ?? functions) &&
      resolveStack.bind(null, functions.resolvers),
    resolvers: [
      [
        (value) => typeof value === "function",
        (callback, input) => {
          const value = callback({
            ...functions.default_args,
            ...functions.mapInputToArgs(input)
          });

          return functions.process_mapped ? resolve(value, input) : value;
        }
      ]
    ]
  };

  objects = objects && {
    resolve:
      (objects.resolve ?? true) && resolveStack.bind(null, objects.resolvers),
    resolvers: [
      [
        (value) => typeof value === "object" && !Array.isArray(value),
        (obj, input) =>
          Object.entries(obj).reduce((obj, [key, value]) => {
            obj[key] = resolve(value, input);

            return obj;
          })
      ]
    ]
  };

  resolvers = new Map(
    [
      ...(arrays.resolve && arrays.resolvers),
      ...(functions.resolve && functions.resolvers),
      ...(objects.resolve && objects.resolvers),
      ...resolvers
    ].filter(Boolean)
  );

  const resolve = (...input) =>
    resolveStack(resolvers, null, functions.mapInputToArgs(...input));

  return Object.assign(resolve, {
    resolvers,
    arrays,
    objects,
    functions
  });
};

export const createIdBuilder = (base, options) => {
  const createIdParts = createValueReducer({
    arrays: true,
    objects: false,
    functions: {
      default_args: {
        base
      },
      mapInputToArgs:
        options.mapInputToArgs ?? ((...parts) => ({ base: parts }))
    },
    resolvers: options.resolvers
  });

  return (...parts) => createIdParts(...parts).join(options.delimeter ?? ".");
};
