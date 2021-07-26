import { createSlice } from "/lib/data";

import { slice as notifications } from "./notifications";
import { slice as scenes } from "./scenes";

export const slice = createSlice("root", {
  children: {
    notifications,
    scenes
  }
});
