import { useMemo, useState } from "@wordpress/element";

export const useRepo = (defaults = {}) => {
  const [keys, setKeys] = useState(
    Array.isArray(defaults)
      ? defaults.map(([key]) => key)
      : Object.keys(defaults)
  );
  const [values, setValues] = useState(
    Array.isArray(defaults)
      ? defaults.map((item) => item.value)
      : Object.values(defaults)
  );

  return useMemo(
    () =>
      new Proxy(
        {
          items: {},

          has: (key) =>
            typeof key === "number"
              ? values[key] !== undefined
              : keys.includes(key),

          includes: (value) => values.includes(value),

          indexOf: (value) => values.indexOf(value),

          shift: () => {
            const ret = [keys[0], values[0]];

            setKeys(keys.slice(1));
            setValues(values.slice(1));

            return ret;
          },

          unshift: (value, key) => {
            setKeys([key, ...keys]);
            setValues([value, ...values]);

            return values.length + 1;
          },

          push: (value, key) => {
            setKeys(keys.concat(key));
            setValues(values.concat(value));
          },

          pop: () => {
            const ret = [keys[this.length - 1], values[this.length - 1]];

            setKeys(keys.slice(0, -1));
            setValues(values.slice(0, -1));

            return ret;
          },

          splice: (start, delete_count = 0, ...items) => {
            let object = false;

            if (
              items.length === 1 &&
              !Array.isArray(items[0]) &&
              "object" === typeof items[0]
            ) {
              items = Object.entries(items[0]);
              object = true;
            }

            const keys_lists = [
              keys.slice(0, start),
              keys.slice(start, start + delete_count),
              keys.slice(start + delete_count)
            ];
            const values_lists = [
              values.slice(0, start),
              values.slice(start, start + delete_count),
              values.slice(start + delete_count)
            ];

            setKeys([...keys_lists[0], ...keys_lists[2]]);
            setValues([...values_lists[0], ...values_lists[2]]);

            return keys_lists[1].reduce(
              (entries, key, i) => {
                const value = values_lists[1][i];

                if (object) entries[key] = value;
                else entries.push([key, value]);

                return entries;
              },
              object ? {} : []
            );
          },

          remove: (key, value) => {},

          get: (key) =>
            typeof key === "number" ? values[key] : values[keys.indexOf(key)],

          set: (key, value) => {
            const index = typeof key === "number" ? key : keys.indexOf(key);

            if (index > 0) {
              setValues(values.map((v, i) => (i === index ? value : v)));
            } else {
              setValues(values.concat(value));
              setKeys(keys.concat(key));
            }

            return value;
          },

          add: (key_object_entries, value) => {
            if (
              ["string", "number", "function", "symbol"].includes(
                typeof key_object_entries
              )
            ) {
              if (this.has(key_object_entries)) return;

              if (value !== undefined)
                return this.set(key_object_entries, value);

              if ("function" === typeof key_object_entries) {
                return this.push(key_object_entries, key_object_entries);
              }
            }

            if ("object" === typeof key_object_entries) {
              if (!Array.isArray(key_object_entries))
                key_object_entries = Object.entries(key_object_entries);

              return key_object_entries.reduce((entries, [key, v]) => {
                if (!this.has(key)) entries.push([key, this.add(key, v)]);

                return entries;
              }, []);
            }

            throw new TypeError("Unknown argument type");
          },

          *[Symbol.iterator]() {
            for (let i = 0; i < keys.length; i++) yield [keys[i], values[i]];
          }
        },
        {
          get: (api, prop, receiver) => {
            if (api.hasOwnProperty(prop)) return api[prop];

            switch (prop) {
              case "length":
                return keys.length;

              default:
                return api.get(prop);
            }
          },
          set: (api, prop, value) =>
            api.hasOwnProperty(prop)
              ? (api[prop] = value)
              : api.set(prop, value)
        }
      ),
    [keys, values]
  );
};
