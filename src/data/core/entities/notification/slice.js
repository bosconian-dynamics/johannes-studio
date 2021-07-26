import { createEntitySlice } from "/lib/data/entities";

import { slice as location_slice } from "./entities"

export const slice = createEntitySlice("notification", {
  children: [ location_slice ],
  plural_name: "notifications",
  reducers: {
    addNotification: {
      prepare: (...notifications) => ({
        payload: notifications.map(
          n => ({
            ...n,

            location: n.location ?? "default"
          })
        )
      })
    }
  }
});