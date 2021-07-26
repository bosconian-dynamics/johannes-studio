import { createSlice } from "/lib/data/slice";

/**
 * Create an RTK slice preconfigured to represent a collection of key/value
 * pairs.
 * 
 * @param {*} name 
 * @param {*} options 
 * @returns 
 */
export const createEntitySlice = (name, options = {}) => {
  const key_formatter = options.key_formatter ?? camelize;
  const plural_name = options.plural_name ?? `${name}s`;

  const slice = createSlice(name, {
    ...options,
    actions: {
      //...createEntityActions(name),
      ...options.actions
    },
    initial_state: {
      ...options.initial_state,
      by_id: [...options.initial_state.by_id],
      all_ids: [...options.initial_state.all_ids]
    },
    reducers: createEntityReducers(name, {
      collection_name: plural_name,
      key_formatter,
      reducers: options.reducers
    }),
    selectors: createEntitySelectors(name, {
      collection_name: plural_name,
      key_formatter,
      selectors: options.selectors
    })
  });

  return slice;
};
