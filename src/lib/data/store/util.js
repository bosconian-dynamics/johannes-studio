export function omit(object, paths = []) {
  // If there is no object, no paths, or no keys, bail.
  if (
    !paths.length ||
    typeof object !== "object" ||
    !Object.keys(object).length
  )
    return object;

  // Split period-delimited strings, flatten one-element arrays, remove empty.
  paths = paths.reduce((paths, path) => {
    if (typeof path === "string" && path.includes(".")) {
      paths.push(path.split("."));
    } else if (Array.isArray(path)) {
      if (path.length) paths.push(path.length === 1 ? path[0] : path);
    } else {
      throw new TypeError("Unknown path type");
    }

    return paths;
  }, []);

  // If there are no paths to omit, return the object.
  if (!paths.length) return object;

  return Object.entries(object).reduce((result, [key, value]) => {
    // If this key is omitted, skip it.
    if (paths.includes(key)) return result;

    if (typeof value === "object") {
      // If the value is an Array, assign a shallow copy.
      if (Array.isArray(value)) {
        result[key] = [...value];
      } else {
        // If value is an object, recursively omit paths which start with this key.
        const sub_paths = paths.reduce((paths, path) => {
          if (Array.isArray(path)) paths.push(path.slice(1));

          return paths;
        }, []);

        if (sub_paths.length) result[key] = omit(object[key], sub_paths);
        else result[key] = Object.assign({}, object[key]);
      }
    }

    // If the key is not omitted and the value is not an object, add it as is.
    result[key] = value;

    return result;
  }, {});
}

export function mapValues(object, callback = (value) => value) {
  return Object.entries(object).reduce((mapped, [key, value], i) => {
    mapped[key] = callback(value, key, i);

    return mapped;
  }, {});
}

/**
 * Maps selectors to a store.
 *
 * @param {Object} selectors Selectors to register. Keys will be used as the
 *                           public facing API. Selectors will get passed the
 *                           state as first argument.
 * @param {Object} store     The store to which the selectors should be mapped.
 * @return {Object} Selectors mapped to the provided store.
 */
export function mapSelectors(selectors, store) {
  const createStateSelector = (registrySelector) => {
    const selector = function runSelector() {
      // This function is an optimized implementation of:
      //
      //   selector( store.getState(), ...arguments )
      //
      // Where the above would incur an `Array#concat` in its application,
      // the logic here instead efficiently constructs an arguments array via
      // direct assignment.
      const argsLength = arguments.length;
      const args = new Array(argsLength + 1);
      args[0] = store.__unstableOriginalGetState();
      for (let i = 0; i < argsLength; i++) {
        args[i + 1] = arguments[i];
      }

      return registrySelector(...args);
    };
    selector.hasResolver = false;
    return selector;
  };

  return mapValues(selectors, createStateSelector);
}

/**
 * Maps actions to dispatch from a given store.
 *
 * @param {Object} actions Actions to register.
 * @param {Object} store   The redux store to which the actions should be mapped.
 *
 * @return {Object} Actions mapped to the redux store provided.
 */
export function mapActions(actions, store) {
  const createBoundAction = (action) => (...args) => {
    return Promise.resolve(store.dispatch(action(...args)));
  };

  return mapValues(actions, createBoundAction);
}

/**
 * Maps selectors to functions that return a resolution promise for them
 *
 * @param {Object} selectors Selectors to map.
 * @param {Object} store     The redux store the selectors select from.
 *
 * @return {Object} Selectors mapped to their resolution functions.
 */
export function mapResolveSelectors(selectors, store) {
  return mapValues(
    omit(selectors, [
      "getIsResolving",
      "hasStartedResolution",
      "hasFinishedResolution",
      "isResolving",
      "getCachedResolvers"
    ]),
    (selector, selectorName) => (...args) =>
      new Promise((resolve) => {
        const hasFinished = () =>
          selectors.hasFinishedResolution(selectorName, args);
        const getResult = () => selector.apply(null, args);

        // trigger the selector (to trigger the resolver)
        const result = getResult();
        if (hasFinished()) {
          return resolve(result);
        }

        const unsubscribe = store.subscribe(() => {
          if (hasFinished()) {
            unsubscribe();
            resolve(getResult());
          }
        });
      })
  );
}

/**
 * Returns resolvers with matched selectors for a given namespace.
 * Resolvers are side effects invoked once per argument set of a given selector call,
 * used in ensuring that the data needs for the selector are satisfied.
 *
 * @param {Object} resolvers      Resolvers to register.
 * @param {Object} selectors      The current selectors to be modified.
 * @param {Object} store          The redux store to which the resolvers should be mapped.
 * @param {Object} resolversCache Resolvers Cache.
 */
export function mapResolvers(resolvers, selectors, store, resolversCache) {
  // The `resolver` can be either a function that does the resolution, or, in more advanced
  // cases, an object with a `fullfill` method and other optional methods like `isFulfilled`.
  // Here we normalize the `resolver` function to an object with `fulfill` method.
  const mappedResolvers = mapValues(resolvers, (resolver) => {
    if (resolver.fulfill) {
      return resolver;
    }

    return {
      ...resolver, // copy the enumerable properties of the resolver function
      fulfill: resolver // add the fulfill method
    };
  });

  const mapSelector = (selector, selectorName) => {
    const resolver = resolvers[selectorName];
    if (!resolver) {
      selector.hasResolver = false;
      return selector;
    }

    const selectorResolver = (...args) => {
      async function fulfillSelector() {
        const state = store.getState();
        if (
          resolversCache.isRunning(selectorName, args) ||
          (typeof resolver.isFulfilled === "function" &&
            resolver.isFulfilled(state, ...args))
        ) {
          return;
        }

        const { metadata } = store.__unstableOriginalGetState();

        if (
          metadataSelectors.hasStartedResolution(metadata, selectorName, args)
        ) {
          return;
        }

        resolversCache.markAsRunning(selectorName, args);

        setTimeout(async () => {
          resolversCache.clear(selectorName, args);
          store.dispatch(metadataActions.startResolution(selectorName, args));
          await fulfillResolver(store, mappedResolvers, selectorName, ...args);
          store.dispatch(metadataActions.finishResolution(selectorName, args));
        });
      }

      fulfillSelector(...args);
      return selector(...args);
    };
    selectorResolver.hasResolver = true;
    return selectorResolver;
  };

  return {
    resolvers: mappedResolvers,
    selectors: mapValues(selectors, mapSelector)
  };
}

/**
 * Calls a resolver given arguments
 *
 * @param {Object} store        Store reference, for fulfilling via resolvers
 * @param {Object} resolvers    Store Resolvers
 * @param {string} selectorName Selector name to fulfill.
 * @param {Array}  args         Selector Arguments.
 */
export async function fulfillResolver(store, resolvers, selectorName, ...args) {
  const resolver = get(resolvers, [selectorName]);
  if (!resolver) {
    return;
  }

  const action = resolver.fulfill(...args);
  if (action) {
    await store.dispatch(action);
  }
}
