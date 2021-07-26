import { combineReducers as defaultCombineReducers } from "@wordpress/data";

export * from "@wordpress/data";
export { useState, useEffect, useCallback, useMemo } from "@wordpress/element";

//export * from "./repo.js";
export * from "./store";
export * from "./slice";

export const combineReducers = (...reducer_maps) => {
  const reducer_map =
    reducer_maps.length > 1
      ? Object.assign({}, ...reducer_maps)
      : reducer_maps[0];

  if (!reducer_map) return (state) => state;

  for (const [key, reducer] in Object.entries(reducer_map)) {
    if ("object" === typeof reducer)
      reducer_map[key] = combineReducers(reducer);
  }

  return defaultCombineReducers(reducer_map);
};
