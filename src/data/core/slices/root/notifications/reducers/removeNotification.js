export const removeNotification = (
  { notifications_by_id, notifications, notifications_by_location },
  id,
  location
) => {
  let index;

  if (typeof id === "number") {
    index = id;
    id = notifications[index].id;
  } else if (typeof id === "string") {
    index = Object.keys(notifications_by_id).indexOf(id);
  }

  delete notifications_by_id[id];
  notifications.splice(index, 1);

  if (location) {
    const location_notifs = notifications_by_location[location];
    const loc_index = location_notifs.findIndex((notif) => notif.id === id);
    // TODO ^
    if (loc_index < 0) return;

    location_notifs.splice(loc_index, 1);
  }
};
