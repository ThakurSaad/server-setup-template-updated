const { default: status } = require("http-status");

const User = require("../app/module/user/User");

const emitError = require("./emitError");
const socketCatchAsync = require("../util/socketCatchAsync");
const postNotification = require("../util/postNotification");
const emitResult = require("./emitResult");
const validateSocketFields = require("../util/socketValidateFields");
const { EnumSocketEvent } = require("../util/enum");

const validateUser = socketCatchAsync(async (socket, io, payload) => {
  if (!payload.userId) {
    emitError(
      socket,
      status.BAD_REQUEST,
      "userId is required to connect",
      "disconnect"
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
    { new: true }
  );

  socket.emit(
    EnumSocketEvent.ONLINE_STATUS,
    emitResult({
      statusCode: status.OK,
      success: true,
      message: `You are ${updatedUser.isOnline ? "online" : "offline"}`,
      data: { isOnline: updatedUser.isOnline },
    })
  );
});

const updateLocation = socketCatchAsync(async (socket, io, payload) => {
  validateSocketFields(socket, payload, ["userId", "lat", "long"]);

  const { userId, lat, long } = payload;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { locationCoordinates: { coordinates: [Number(long), Number(lat)] } },
    { new: true, runValidators: true }
  );

  // Broadcast to everyone (consider throttling in production)
  io.emit(
    EnumSocketEvent.LOCATION_UPDATE,
    emitResult({
      statusCode: status.OK,
      success: true,
      message: "Location updated",
      data: updatedUser,
    })
  );
});

// utility functions =============================================================================================================================

const handleStatusNotifications = (io, trip, newStatus) => {
  const eventName = EnumSocketEvent.TRIP_UPDATE_STATUS;
  const messageMap = {
    [TripStatus.ON_THE_WAY]: {
      rider: "Your driver is on the way",
      driver: "You are on the way to the rider",
    },
    [TripStatus.ARRIVED]: {
      rider: "Your driver has arrived",
      driver: "You have arrived at the pickup location",
    },
    [TripStatus.PICKED_UP]: {
      rider: "You've been picked up",
      driver: "You have picked up the rider",
    },
    [TripStatus.STARTED]: {
      rider: "Your trip has started",
      driver: "The trip has started",
    },
    [TripStatus.COMPLETED]: {
      rider: "Your trip has been completed successfully",
      driver: "You have successfully completed the trip",
    },
    [TripStatus.CANCELLED]: {
      rider: "Your trip has been cancelled",
      driver: "The trip has been cancelled",
    },
    [TripStatus.NO_SHOW]: {
      rider: "You are marked as no show. You will be charged a fee",
      driver: "The user is marked as no show",
    },
  };

  // Notify user
  io.to(trip.user.toString()).emit(
    eventName,
    emitResult({
      statusCode: status.OK,
      success: true,
      message: messageMap[newStatus].rider,
      data: trip,
    })
  );

  postNotification(`Trip update`, messageMap[newStatus].rider, trip.user);

  // Notify driver if any
  if (trip.driver) {
    io.to(trip.driver.toString()).emit(
      eventName,
      emitResult({
        statusCode: status.OK,
        success: true,
        message: messageMap[newStatus].driver,
        data: trip,
      })
    );

    postNotification(`Trip update`, messageMap[newStatus].driver, trip.driver);
  }
};

const SocketController = {
  validateUser,
  updateOnlineStatus,
  updateLocation,
};

module.exports = SocketController;
