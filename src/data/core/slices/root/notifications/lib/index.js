import { createIdBuilder } from "/lib/util";

export const createNotificationId = createIdBuilder([
  "notif",
  ({ type }) => type,
  ({ created }) => (created ?? Date.now()).toString(32)
]);
