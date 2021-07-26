// 3rd-Party Dependencies

// Global Dependencies
import { createStoreFromSlices } from "/lib/data";

// Local Dependencies
import * as slices from "./slices";

export const store = createStoreFromSlices("sazerac/core", slices);

export const { dispatch, getState, subscribe } = store;

export { slices };
