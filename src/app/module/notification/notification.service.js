const { default: status } = require("http-status");
const QueryBuilder = require("../../../builder/queryBuilder");
const ApiError = require("../../../error/ApiError");
const validateFields = require("../../../util/validateFields");
const Notification = require("./Notification");
const { EnumUserRole } = require("../../../util/enum");
const AdminNotification = require("./AdminNotification");

const getNotification = async (userData, query) => {
  const { role } = userData;
  const Model = role === EnumUserRole.ADMIN ? AdminNotification : Notification;

  if (role !== EnumUserRole.ADMIN) validateFields(query, ["notificationId"]);

  const queryObj =
    role === EnumUserRole.ADMIN ? {} : { _id: query.notificationId };

  const notification = await Model.findOne(queryObj).lean();

  if (!notification)
    throw new ApiError(status.NOT_FOUND, "Notification not found");

  return notification;
};

/**
 * Retrieves notifications based on the user's role.
 *
 * - If the user is an **admin**, it fetches all notifications from `AdminNotification`.
 * - If the user is a **regular user**, it fetches only notifications relevant to them from `Notification`.
 */
const getAllNotifications = async (userData, query) => {
  const { role } = userData;
  const Model = role === EnumUserRole.ADMIN ? AdminNotification : Notification;
  const queryObj = role === EnumUserRole.ADMIN ? {} : { toId: userData.userId };

  const notificationQuery = new QueryBuilder(Model.find(queryObj).lean(), query)
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [notification, meta] = await Promise.all([
    notificationQuery.modelQuery,
    notificationQuery.countTotal(),
  ]);

  return {
    meta,
    notification,
  };
};

const updateAsReadUnread = async (userData, payload) => {
  const { role } = userData;
  const Model = role === EnumUserRole.ADMIN ? AdminNotification : Notification;
  const queryObj = role === EnumUserRole.ADMIN ? {} : { toId: userData.userId };
  queryObj.isRead = !payload.isRead;

  const result = await Model.updateMany(queryObj, {
    $set: { isRead: payload.isRead },
  });

  if (!result.modifiedCount)
    throw new ApiError(status.BAD_REQUEST, "Already updated");

  return result;
};

const deleteNotification = async (userData, payload) => {
  validateFields(payload, ["notificationId"]);

  const Model =
    userData.role === EnumUserRole.ADMIN ? AdminNotification : Notification;

  const notification = await Model.deleteOne({
    _id: payload.notificationId,
  });

  if (!notification.deletedCount)
    throw new ApiError(status.NOT_FOUND, "Notification not found");

  return notification;
};

const NotificationService = {
  getNotification,
  getAllNotifications,
  updateAsReadUnread,
  deleteNotification,
};

module.exports = NotificationService;
