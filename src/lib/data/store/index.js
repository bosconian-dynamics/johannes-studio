import { registerGenericStore, combineReducers } from "@wordpress/data";
import { configureStore } from "@reduxjs/toolkit";
import createReduxRoutineMiddleware from "@wordpress/redux-routine";
import { builtinControls as BUILTIN_CONTROLS } from "@wordpress/data/src/controls";
import promiseMiddleware from "@wordpress/data/src/promise-middleware";

import {
  mapResolveSelectors,
  mapSelectors,
  mapResolvers,
  mapActions,
  mapValues,
  omit
} from "./util";
import {
  createResolversCache,
  createResolversCacheMiddleware
} from "./middleware/resolvers-cache";

export const createStore = (key, options = {}) => {
  const {
    //actions,
    //controls,
    enhancers,
    //initial_state,
    middleware,
    //reducers,
    registry
    //resolvers,
    //selectors
  } = options;

  const reducers = combineReducers({
    root: combineReducers({
      ...omit(options.reducers, ["root", "metadata"]),
      ...options.reducers?.root
    }),
    metadata: combineReducers({
      ...options.metadata?.reducers,
      ...options.reducers?.metadata
    })
  });

  const initial_state = (options.initial_state = {
    root: {
      ...omit(options.initial_state, ["root", "metadata"]),
      ...options.initial_state?.root
    },
    metadata: {
      ...options.metadata?.initial_state,
      ...options.initial_state?.metadata
    }
  });

  delete options.metadata?.initial_state;

  const metadata = {
    actions: {},
    reducers: reducers.metadata,
    resolvers: {},
    controls: {},
    selectors: {},
    initial_state: initial_state.metadata
  };

  for (const key in metadata) {
    if (!options[key]?.metadata && !options.metadata?.[key]) continue;

    metadata[key] = options.metadata[key] = {
      ...metadata[key],
      ...options.metadata?.[key],
      ...options[key].metadata
    };

    delete options[key].metadata;
  }

  const store = configureStore({
    // Store Actions.
    actions: {
      ...metadata.actions,
      ...options.actions
    },

    // Redux DevTools.
    devTools: options.dev_tools ?? process.env.mode !== "production",

    // Store Enhancers.
    enhancers,

    // Store Middleware.
    middleware: (getDefaultMiddleware) => {
      const stack = [
        createResolversCacheMiddleware(registry, key),
        ...getDefaultMiddleware({
          thunk: {
            registry,
            get dispatch() {
              return Object.assign(
                (action) => store.dispatch(action),
                generic_store.getActions()
              );
            },
            get select() {
              return Object.assign(
                (selector) => selector(store.__unstableOriginalGetState()),
                generic_store.getSelectors()
              );
            },
            get resolveSelect() {
              return getResolveSelectors();
            }
          }
        }),
        promiseMiddleware,
        createReduxRoutineMiddleware(
          mapValues(
            {
              ...BUILTIN_CONTROLS,
              ...options.controls
            },
            (control) =>
              control.isRegistryControl ? control(registry) : control,
            store
          )
        ),
        ...(Array.isArray(middleware) ? middleware : [])
      ].filter(Boolean);

      if ("function" === typeof middleware) return middleware(stack);

      return stack;
    },

    // Store Preloaded State (Default & Hydrated)
    preloadedState: {
      ...initial_state
    },

    // Store Reducer.
    reducer: reducers
  });

  // We have some modules monkey-patching the store object
  // It's wrong to do so but until we refactor all of our effects to controls
  // We need to keep the same "store" instance here.
  store.__unstableOriginalGetState = store.getState;
  store.getState = () => store.__unstableOriginalGetState().root;

  const actions = mapActions(
    {
      ...options.actions,
      ...metadata.actions
    },
    store
  );

  let selectors = mapSelectors(
    {
      ...mapValues(metadata.selectors, (selector) => (state, ...args) =>
        selector(state.metadata, ...args)
      ),
      ...mapValues(options.selectors, (selector) => {
        if (selector.isRegistrySelector) {
          selector.registry = registry;
        }

        return (state, ...args) => selector(state.root, ...args);
      })
    },
    store
  );

  const resolvers_cache = createResolversCache();
  let resolvers;

  if (options.resolvers) {
    const result = mapResolvers(
      options.resolvers,
      selectors,
      store,
      resolvers_cache
    );

    resolvers = result.resolvers;
    selectors = result.selectors;
  }

  const resolve_selectors = mapResolveSelectors(selectors, store);
  const getResolveSelectors = () => resolve_selectors;

  // Customize subscribe behavior to call listeners only on effective change,
  // not on every dispatch.
  const subscribe =
    store &&
    ((listener) => {
      let lastState = store.__unstableOriginalGetState();
      return store.subscribe(() => {
        const state = store.__unstableOriginalGetState();
        const hasChanged = state !== lastState;
        lastState = state;

        if (hasChanged) {
          listener();
        }
      });
    });

  const generic_store = {
    getActions() {
      return actions;
    },

    getSelectors() {
      return selectors;
    },

    subscribe
  };

  registerGenericStore(key, generic_store);

  // This can be simplified to just { subscribe, getSelectors, getActions }
  // Once we remove the use function.
  return {
    reducer: reducers,
    store,
    actions,
    getSelectors: generic_store.getSelectors,
    getResolveSelectors,
    getActions: generic_store.getActions,
    metadata,
    resolvers,
    selectors,
    subscribe
  };
};
