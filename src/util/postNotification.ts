import Notification from "../app/module/notification/Notification";
import AdminNotification from "../app/module/notification/AdminNotification";

const postNotification = async (
  title: string,
  message: string,
  toId: string | null = null,
): Promise<void> => {
  if (!title || !message) {
    throw new Error("Missing required fields: title, or message");
  }

  if (!toId) {
    await AdminNotification.create({ title, message });
  } else {
    await Notification.create({ toId, title, message });
  }
};

export = postNotification;
