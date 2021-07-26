import { useRepo } from "/lib/repo";

export const useTransforms = (schema, transforms = [], init = []) => {
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
