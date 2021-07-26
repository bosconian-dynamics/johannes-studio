export * as createResolversCacheMiddleware from "@wordpress/data/src/resolvers-cache-middleware";

/**
 * Create a cache to track whether resolvers started running or not.
 *
 * @return {Object} Resolvers Cache.
 */
export function createResolversCache() {
  const cache = {};
  return {
    isRunning(selectorName, args) {
      return cache[selectorName] && cache[selectorName].get(args);
    },

    clear(selectorName, args) {
      if (cache[selectorName]) {
        cache[selectorName].delete(args);
      }
    },

    markAsRunning(selectorName, args) {
      if (!cache[selectorName]) {
        cache[selectorName] = new EquivalentKeyMap();
      }

      cache[selectorName].set(args, true);
    }
  };
}
