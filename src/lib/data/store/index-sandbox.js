/**
 * TODO: Are these dependencies necessary?
 */
import { flowRight, get, mapValues, omit } from "lodash";
import EquivalentKeyMap from "equivalent-key-map";

// 3rd-Party Dependencies.
import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@wordpress/data";
import createReduxRoutineMiddleware from "@wordpress/redux-routine";
import { builtinControls as builtin_controls } from "@wordpress/data/src/controls";
import promiseMiddleware from "@wordpress/data/src/promise-middleware";

// Global Dependencies.

// Local Dependencies.
import {
  createResolversCache,
  createResolversCacheMiddleware
} from "./middleware/resolvers-cache";
//import metadataReducer from "./metadata/reducer";
//import * as metadataSelectors from "./metadata/selectors";
//import * as metadataActions from "./metadata/actions";

export { Store } from "./Store";
/**
 * Creates a data store definition for the provided Redux store options containing
 * properties describing reducer, actions, selectors, controls and resolvers.
 *
 * @example
 * ```js
 * import { createReduxStore } from '@wordpress/data';
 *
 * const store = createReduxStore( 'demo', {
 *     reducer: ( state = 'OK' ) => state,
 *     selectors: {
 *         getValue: ( state ) => state,
 *     },
 * } );
 * ```
 *
 * @param {string}                 key     Unique namespace identifier.
 * @param {WPDataReduxStoreConfig} options Registered store options, with properties
 *                                         describing reducer, actions, selectors,
 *                                         and resolvers.
 *
 * @return {WPDataStore} Store Object.
 */
export default function createStore(key, options, metadata) {
  return {
    name: key,
    instantiate: (registry) => {
      const reducer = options.reducer;
      const thunkArgs = {
        registry,
        get dispatch() {
          return Object.assign(
            (action) => store.dispatch(action),
            getActions()
          );
        },
        get select() {
          return Object.assign(
            (selector) => selector(store.__unstableOriginalGetState()),
            getSelectors()
          );
        },
        get resolveSelect() {
          return getResolveSelectors();
        }
      };

      const store = instantiateReduxStore(key, options, registry, thunkArgs);
      /*       const resolversCache = createResolversCache();

      let resolvers; */
      /*       const actions = mapActions(
        {
          ...metadata.actions,
          ...options.actions
        },
        store
      ); */

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
      if (options.resolvers) {
        const result = mapResolvers(
          options.resolvers,
          selectors,
          store,
          resolversCache
        );
        resolvers = result.resolvers;
        selectors = result.selectors;
      }

      const resolveSelectors = mapResolveSelectors(selectors, store);

      const getSelectors = () => selectors;
      const getActions = () => actions;
      const getResolveSelectors = () => resolveSelectors;

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

      // This can be simplified to just { subscribe, getSelectors, getActions }
      // Once we remove the use function.
      return {
        reducer,
        store,
        actions,
        selectors,
        resolvers,
        getSelectors,
        getResolveSelectors,
        getActions,
        subscribe
      };
    }
  };
}

/**
 * Creates a redux store for a namespace.
 *
 * @param {string}         key       Unique namespace identifier.
 * @param {Object}         options   Registered store options, with properties
 *                                   describing reducer, actions, selectors,
 *                                   and resolvers.
 * @param {WPDataRegistry} registry  Registry reference.
 * @param {Object}         thunkArgs Argument object for the thunk middleware.
 * @return {Object} Newly created redux store.
 */
function instantiateReduxStore(key, options, registry, thunkArgs) {
  /*   const controls = {
    ...options.controls,
    ...builtinControls
  };

  const normalizedControls = mapValues(controls, (control) =>
    control.isRegistryControl ? control(registry) : control
  ); */

  /*   const middlewares = [
    createResolversCacheMiddleware(registry, key),
    promise,
    createReduxRoutineMiddleware(normalizedControls)
  ]; */

  /*   if (options.__experimentalUseThunks) {
    middlewares.push(createThunkMiddleware(thunkArgs));
  } */

  const enhancers = [applyMiddleware(...middlewares)];
  /*   if (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(
      window.__REDUX_DEVTOOLS_EXTENSION__({
        name: key,
        instanceId: key
      })
    );
  } */

  const { reducer, initialState } = options;
  const enhancedReducer = combineReducers({
    metadata: metadataReducer,
    root: reducer
  });

  return createStore(
    enhancedReducer,
    { root: initialState },
    flowRight(enhancers)
  );
}

export const createStore2 = (key, options = {}, metadata = {}) => {
  const {
    reducer = (state, action) => state,
    actions = [],
    selectors = [],
    controls = []
  } = options;

  const mapStoreResolvers = (selectors, store, cache) =>
    mapResolvers(options.resolvers, selectors, store, cache);

  const mapStoreSelectors = (store, selectors, metadata) =>
    mapSelectors(
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

  return {
    name: key,
    instantiate: (registry) => {
      const resolversCache = createResolversCache();

      const api = instantiateStore(key, {
        middlewares,
        api: {
          getSelectors: () => api.selectors,
          getActions: () => api.actions,
          getResolverSelectors: () => api.resolveSelectors
        }
      });

      api.actions = mapActions(
        {
          ...metadata.actions,
          ...options.actions
        },
        api.store
      );

      if (options.resolvers) {
        const result = mapResolvers(
          options.resolvers,
          selectors,
          store,
          resolversCache
        );

        api.resolvers = result.resolvers;
        api.selectors = result.selectors;
      }

      const resolveSelectors = mapResolveSelectors(selectors, store);

      // We have some modules monkey-patching the store object
      // It's wrong to do so but until we refactor all of our effects to controls
      // We need to keep the same "store" instance here.
      store.__unstableOriginalGetState = store.getState;
      store.getState = () => store.__unstableOriginalGetState().root;

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

      // This can be simplified to just { subscribe, getSelectors, getActions }
      // Once we remove the use function.
      return {
        reducer,
        store,
        actions,
        selectors,
        resolvers,
        getSelectors,
        getResolveSelectors,
        getActions,
        subscribe
      };
    }
  };
};

const api = instantiateStore(key, {
  middlewares,
  api: {
    getSelectors: () => api.selectors,
    getActions: () => api.actions,
    getResolverSelectors: () => api.resolveSelectors
  }
});

api.actions = mapActions(
  {
    ...metadata.actions,
    ...options.actions
  },
  api.store
);

if (options.resolvers) {
  const result = mapResolvers(
    options.resolvers,
    selectors,
    store,
    resolversCache
  );

  api.resolvers = result.resolvers;
  api.selectors = result.selectors;
}

const resolveSelectors = mapResolveSelectors(selectors, store);

export const instantiateStore = (name, options, registry) => {
  const {
    middlewares = [],
    enhancers = [],
    reducers = {},
    initial_state = {},
    api
  } = options;

  const controls = Object.entries({
    ...options.controls,
    ...builtin_controls
  }).reduce((controls, [key, control]) => {
    controls[key] = control.isRegistryControl ? control(registry) : control;

    return controls;
  }, {});

  const base_middlewares = [
    createResolversCacheMiddleware(registry, name),
    promiseMiddleware,
    createReduxRoutineMiddleware(controls),
    ...(Array.isArray(middlewares) ? middlewares : [])
  ].filter(Boolean);

  const thunk_args = {
    registry,
    get dispatch() {
      return Object.assign(
        (action) => api.store.dispatch(action),
        api.getActions()
      );
    },
    get select() {
      return Object.assign(
        (selector) => selector(api.store.__unstableOriginalGetState()),
        api.getSelectors()
      );
    },
    get resolveSelect() {
      return api.getResolveSelectors();
    }
  };

  const getMiddlewares =
    typeof middlewares === "function"
      ? (getDefaultMiddlewares) => [
          ...getDefaultMiddlewares({ thunk: thunk_args }),
          ...base_middlewares
        ]
      : (getDefaultMiddlewares) =>
          middlewares([
            ...getDefaultMiddlewares({ thunk: thunk_args }),
            ...base_middlewares
          ]);

  api.store = configureStore({
    reducer: reducers,
    middleware: getMiddlewares,
    devTools: options.dev_tools ?? process.env.mode === "development",
    preloadedState: {
      ...initial_state
    },
    enhancers: [...enhancers]
  });

  return api;
};
