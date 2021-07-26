export const getNotifications = (
  { notifications_by_location, notifications },
  location
) => (location ? notifications_by_location[location] : notifications);
