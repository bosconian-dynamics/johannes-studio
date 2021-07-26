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