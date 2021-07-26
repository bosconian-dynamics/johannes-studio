import { createSlice as createReduxSlice } from "@reduxjs/toolkit";

const defaultReducer = (state, action) => {
  return state;
};

const attachChildSlices = (parent, slices) =>
  Object.values(slices).reduce((children, slice) => {
    const name = slice.name;

    slice = Object.assign({}, slice);

    if (parent.children[name]) {
      console.warn(
        `Slice "${name}" already registered as a child to this slice.`
      );
      return children;
    }

    console.log("ATTACH CHILD SLICE", slice);

    //slice.parent = parent;
    //slice.path.unshift(parent.name);

    children[name] = slice;

    parent.children[name] = slice;
    parent.initial_state[name] = {
      ...parent.initial_state[name],
      ...slice.initial_state
    };

    return children;
  }, {});

export const createSlice = (name, options = {}) => {
  const {
    children = {},
    extra_reducers = {},
    initial_state = {},
    path = [name],
    selectors = {},
    ...slice_options
  } = options;
  const child_actions = {};
  const child_reducers = {};

  if(Array.isArray(children))
    children = Object.fromEntries(Object.entries(children));

  for (const child of Object.values(children)) {
    child_reducers[child.name] = child.reducer;
    child_actions[child.name] = child.actions;
  }

  const redux_slice = createReduxSlice({
    ...slice_options,
    name,
    initialState: initial_state,
    reducers: options.reducers,
    extraReducers: (builder) => {
      // Add every child slice's reducer as an RTK "extra reducer" (so RTK doesn't generate actions for them).
      for (const [name, reducer] of Object.entries(child_reducers))
        builder.addCase(name, reducer);

      // Add any extra reducers from the options object...
      if (Array.isArray(extra_reducers)) {
        // If the option is an array, assume it to be an array of RTK builder callbacks.
        for (const [reducerBuilder] of extra_reducers) reducerBuilder(builder);
      } else if (typeof extra_reducers === "function") {
        // If the options is a function, assume it to be a builder callback.
        extra_reducers(builder);
      } else if (typeof extra_reducers === "object") {
        // Add name/reducer mappings directly.
        for (const [name, reducer] of Object.entries(extra_reducers))
          builder.addCase(name, reducer);
      } else {
        throw new TypeError("Unknown extra_reducers format");
      }

      builder.addDefaultCase(defaultReducer);
    }
  });

  const slice = {
    actions: {
      ...child_actions,
      ...redux_slice.actions
    },
    case_reducers: redux_slice.caseReducers,
    children: {},
    initial_state,
    name,
    parent: null,
    path,
    reducer: redux_slice.reducer,
    selectors
  };

  slice.attach = attachChildSlices.bind(null, slice);

  console.log("check 3");

  attachChildSlices(slice, children);

  console.log("check 4");

  return slice;
};
