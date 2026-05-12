const { default: status } = require("http-status");

const User = require("../app/module/user/User");

const emitError = require("./emitError");
const emitResult = require("./emitResult");
const postNotification = require("../util/postNotification");
const socketCatchAsync = require("../util/socketCatchAsync");
const { EnumSocketEvent } = require("../util/enum");
const validateSocketFields = require("../util/validateSocketFields");

const validateUser = socketCatchAsync(async (socket, io, payload) => {
  if (!payload.userId) {
    emitError(
      socket,
      status.BAD_REQUEST,
      "userId is required to connect",
      "disconnect",
    );
    return null;
  }

  const user = await User.findById(payload.userId);

  if (!user) {
    emitError(socket, status.NOT_FOUND, "User not found", "disconnect");
    return null;
  }

  return user;
});

const updateOnlineStatus = socketCatchAsync(async (socket, io, payload) => {
  validateSocketFields(socket, payload, ["userId", "isOnline"]);
  const { userId, isOnline } = payload;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { isOnline },
    { returnDocument: "after" },
  );

  socket.emit(
    EnumSocketEvent.ONLINE_STATUS,
    emitResult({
      statusCode: status.OK,
      success: true,
      message: `You are ${updatedUser.isOnline ? "online" : "offline"}`,
      data: { isOnline: updatedUser.isOnline },
    }),
  );
});

const updateLocation = socketCatchAsync(async (socket, io, payload) => {
  validateSocketFields(socket, payload, ["userId", "lat", "long"]);

  const { userId, lat, long } = payload;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { locationCoordinates: { coordinates: [Number(long), Number(lat)] } },
    { returnDocument: "after", runValidators: true },
  );

  // Broadcast to everyone (consider throttling in production)
  io.emit(
    EnumSocketEvent.LOCATION_UPDATE,
    emitResult({
      statusCode: status.OK,
      success: true,
      message: "Location updated",
      data: updatedUser,
    }),
  );
});

const SocketController = {
  validateUser,
  updateOnlineStatus,
  updateLocation,
};

module.exports = SocketController;
