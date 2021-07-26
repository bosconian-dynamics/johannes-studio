import { createEntitySlice } from "/lib/data/entities";

export const slice = createEntitySlice("notification-location", {
  plural_name: "notification-locations",
  selectors: {
    getLocationNotifications: (state, location) =>
      state.locations.by_id[location]?.map((id) => state.by_id[id])
  }
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
  selectors,

  extra_reducers = {}
} = slice;
