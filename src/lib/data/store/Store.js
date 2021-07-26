import { configureStore } from "@reduxjs/toolkit";
import createReduxRoutineMiddleware from "@wordpress/redux-routine";
import { builtinControls as BUILTIN_CONTROLS } from "@wordpress/data/src/controls";
import promiseMiddleware from "@wordpress/data/src/promise-middleware";
import {
  createResolversCache,
  createResolversCacheMiddleware
} from "./middleware/resolvers-cache";

export class Store {
  _actions;
  _controls;
  _dev_tools = false;
  _enhancers = [];
  _initial_state = { root: {}, meta: {} };
  _key = "";
  _middlewares = [];
  _middleware_filter = (middlewares) => middlewares;
  _reducers = {};
  _reducer = (state, action) => state;
  _registry;
  _resolvers_cache = createResolversCache();
  _selectors;
  _store;

  constructor(key, registry, options) {
    const { initial_state, middlewares, controls } = options;

    this._key = key;
    this._registry = registry;
    this._dev_tools = options.dev_tools ?? process.env.mode === "dev";

    if (initial_state) {
      if (!initial_state.root && !initial_state.meta)
        this._initial_state = { root: initial_state, meta: {} };
    }

    if ("function" === typeof middlewares)
      this._middleware_filter = middlewares;

    this._controls = this.createControls(BUILTIN_CONTROLS, controls ?? {});

    this._middlewares = [
      createResolversCacheMiddleware(this._registry, this._key),
      promiseMiddleware,
      createReduxRoutineMiddleware(this._controls),
      ...(Array.isArray(middlewares) ? middlewares : [])
    ].filter(Boolean);
  }

  __initStore() {
    this._store = configureStore({
      reducer: this._reducers,
      middleware: (getDefaultMiddleware) =>
        this.getMiddleware(
          getDefaultMiddleware({ thunk: this.getThunkArgs() })
        ),
      devTools: this._dev_tools ?? true,
      preloadedState: {
        ...(this._initial_state ?? {})
      },
      enhancers: [...this._enhancers]
    });

    // We have some modules monkey-patching the store object
    // It's wrong to do so but until we refactor all of our effects to controls
    // We need to keep the same "store" instance here.
    this._store.__unstableOriginalGetState = this._store.getState;
    this._store.getState = () => this._store.__unstableOriginalGetState().root;

    return this._store;
  }

  get key() {
    return this._key;
  }

  get name() {
    return this._key;
  }

  get store() {
    return this._store ?? this._initStore();
  }

  getActions() {
    return this._actions;
  }

  getResolveSelectors() {
    return this._resolveSelectors;
  }

  getSelectors() {
    return this._selectors;
  }

  getMiddleware(before = [], after = []) {
    return this._middleware_filter([...before, ...this._middlewares, ...after]);
  }

  // Customize subscribe behavior to call listeners only on effective change,
  // not on every dispatch.
  subscribe(listener) {
    let last_state = this._store.__unstableOriginalGetState();

    return this._store.subscribe(() => {
      const state = this._store.__unstableOriginalGetState();
      const has_changed = state !== last_state;

      last_state = state;

      if (has_changed) {
        listener();
      }
    });
  }

  getThunkArgs(registry) {
    return {
      registry: registry ?? this._registry,
      get dispatch() {
        return Object.assign(
          (action) => this.store.dispatch(action),
          this.getActions()
        );
      },
      get select() {
        return Object.assign(
          (selector) => selector(this.store.__unstableOriginalGetState()),
          this.getSelectors()
        );
      },
      get resolveSelect() {
        return this.getResolveSelectors();
      }
    };
  }

  createControls(...controls) {
    return Object.assign({}, ...controls).reduce((controls, [key, control]) => {
      controls[key] = control.isRegistryControl
        ? control(this._registry)
        : control;

      return controls;
    }, {});
  }

  get actions() {
    return this._actions;
  }
}
