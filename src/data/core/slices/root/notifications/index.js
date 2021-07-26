import { createSlice } from "/lib/data";

import * as reducers from "./reducers";

export const slice = createSlice("notifications", {
  initial_state: {
    all_ids: [],
    ids_by_location: {},
    notifications_by_id: {},
    templates_by_name: {}
  },
  reducers
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
