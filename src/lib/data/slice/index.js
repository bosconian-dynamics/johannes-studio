// Global Imports.
import { pluck } from "/lib/util";
import { createStore } from "/lib/data/store";

// 3rd-Party Exports.
export { createSlice as createReduxSlice } from "@reduxjs/toolkit";

// Local Exports.
export { createSlice } from "./createSlice";

export const matchesSlicePath = (path) => {
  path = path.toString();

  return (action) => {
    const action_path = action.meta?.slice?.path;

    if (!action_path) return false;

    return action_path.toString().startsWith(path);
  };
};

export const createStoreFromSlices = (name, slices = []) =>
  createStore(name, {
    actions: pluck(slices, "actions", false),
    controls: pluck(slices, "controls", false),
    reducers: pluck(slices, "reducer", "name"),
    resolvers: pluck(slices, "resolvers", false),
    selectors: pluck(slices, "selectors", "name")
  });
