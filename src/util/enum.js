const EnumUserRole = {
  USER: "USER",
  DRIVER: "DRIVER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
};

const EnumPaymentStatus = {
  SUCCEEDED: "succeeded",
  UNPAID: "unpaid",
};

const EnumSocketEvent = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  SOCKET_ERROR: "socket_error",
  ONLINE_STATUS: "online_status",
  LOCATION_UPDATE: "location_update",

  START_CHAT: "start_chat",
  SEND_MESSAGE: "send_message",
};

const EnumLoginProvider = {
  LOCAL: "local",
  GOOGLE: "google",
  APPLE: "apple",
};

const EnumUserAccountStatus = {
  VERIFIED: "verified",
  UNVERIFIED: "unverified",
};

module.exports = {
  EnumUserRole,
  EnumPaymentStatus,
  EnumSocketEvent,
  EnumLoginProvider,
  EnumUserAccountStatus,
};
