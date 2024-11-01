const ENUM_USER_ROLE = {
  USER: "USER",
  HOST: "HOST",
  ADMIN: "ADMIN",
};

const ENUM_SERVICE_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  RESCHEDULED: "rescheduled",
  PICK_UP: "pick-up",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  CANCEL: "cancel",
};

const ENUM_SERVICE_TYPE = {
  GOODS: "Goods",
  WASTE: "Waste",
  SECOND_HAND_ITEMS: "Second-hand items",
  RECYCLABLE_MATERIALS: "Recyclable materials",
};

module.exports = {
  ENUM_USER_ROLE,
  ENUM_SERVICE_STATUS,
  ENUM_SERVICE_TYPE,
};
