import { camelize } from "/lib/string";
import { createIdBuilder } from "/lib/util";

import { createSlice } from "./slice";

/**
 * An ID generator for entities. IDs are composed of the "type" property of the
 * object passed into the function and the current timestamp in base 32.
 */
export const createEntityId = createIdBuilder(
  [({ type }) => type, ({ created }) => created ?? Date.now().toString(32)],
  {}
);

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

/**
 * Creates a RTK reducer configuration suitable for generating actions and
 * reducers for modifying normalized entity collection state.
 * 
 * @param {*} name 
 * @param {*} options 
 * @returns 
 */
export const createEntityReducers = (name, options = {}) => {
  const {
    collection_name = `${name}s`,
    createId = createEntityId,
    key_formatter: key = camelize,
    reducers
  } = options;

  const case_reducers = {
    [key`add${name}`]: {
      prepare: (...entities) => ({
        payload: entities
      }),

      reducer: (state, { payload: entities }) => {
        if (!Array.isArray(entities)) entities = [entities];

        for (const entity of entities) {
          const id = (entity.id = createId({ type: name }));

          state.by_id[id] = entity;
          state.all_ids.push(entity);
        }
      }
    },

    [key`update${name}`]: (state, { payload: entities }) => {
      if (!Array.isArray(entities)) entities = [entities];

      // TODO: hackity hack hack.
      for (const entity of entities) {
        state.by_id[entity.id] = entity;
        state.all_ids.splice(state.all_ids.indexOf(entity.id), 1, entity);
      }
    },

    [key`remove${name}`]: (state, { payload: ids }) => {}
  };

  // If any of the reducers passed in as options override the reducers above using a RTK
  // prepare/reducer object but are missing the reducer property, set it to be the reducer
  // above.
  for( const [name, reducer] of Object.entries( case_reducers ) ) {
    if( typeof reducers[name]?.prepare === "function" && ! reducers[name].reducer )
      reducers[name].reducer = reducer;
  }

  return {
    ...case_reducers,
    ...reducers
  };
};

/**
 * 
 * @param {*} name 
 * @param {*} options 
 * @returns 
 */
export const createEntitySelectors = (name, options = {}) => {
  const {
    collection_name = `${name}s`,
    key_formatter: key = camelize,
    selectors
  } = options;

  return {
    [key`get${name}`]: (state, ...ids) => (ids.length ? ids : state.all_ids).map((id) => state.by_id[id]),

    [key`find${name}`]: (state, predicate) =>
      state.all_ids.find((id) => predicate(state.by_id[id], id)),

    [key`has${name}`]: (state, ...ids) =>
      state.all_ids.reduce((result, id) => result && ids.includes(id), true),

    ...selectors
  };
};
