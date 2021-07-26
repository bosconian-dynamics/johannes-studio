import { createSlice } from "/lib/data";

import * as reducers from "./reducers";
import * as scenes_selectors from "./selectors";

export const slice = createSlice("scenes", {
  initial_state: {
    active: null,
    scenes: [],
    scenes_by_name: {},
    names: []
  },
  reducers,
  selectors: scenes_selectors
});

export const {
  actions,
  case_reducers,
  children,
  initial_state,
  name,
  parent,
  path,
  reducer,
  selectors
} = slice;
