import { createNotificationId } from "../lib";

export const addNotification = {
  prepare: (
    message_or_template,
    {
      created = Date.now(),
      data,
      expires,
      location,
      type = "info",

      ...options
    }
  ) => {
    let message, template;

    switch (typeof message_or_template) {
      case "string":
        if (data) template = message_or_template;
        else message = message_or_template;
        break;

      case "function":
        message = message_or_template({ type, ...data });
        break;

      default:
        throw new TypeError("Unknown message/template type.");
    }

    const notification = {
      created,
      expires,
      data,
      location,
      message,
      template,
      type
    };

    notification.id = createNotificationId(notification);

    return { payload: notification };
  },

  reducer: (
    {
      templates_by_name,
      notifications_by_location,
      notifications,
      notifications_by_id
    },
    { payload: notification }
  ) => {
    const {
      created,
      data = {},
      expires,
      id,
      location,
      message,
      template,
      type
    } = notification;

    if (template) {
      notification.message = templates_by_name[template]({
        type,
        ...data
      });
    }

    if (location) {
      if (!notifications_by_location[location])
        notifications_by_location[location] = [];

      notifications_by_location[location].push(notification);
    }

    notifications_by_id[id] = notification;
    notifications.push(notification);
  }
};
