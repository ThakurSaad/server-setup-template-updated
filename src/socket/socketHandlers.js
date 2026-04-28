const { EnumSocketEvent, EnumUserRole } = require("../util/enum");
const socketCatchAsync = require("../util/socketCatchAsync");
const ChatSocketController = require("./chat.socket.controller");
const SocketController = require("./socket.controller");

const socketHandlers = socketCatchAsync(async (socket, io, activeDrivers) => {
  console.log("Trying to connect");

  const userId = socket.handshake.query.userId;

  const user = await SocketController.validateUser(socket, io, { userId });
  if (!user) return;

  socket.join(userId);

  console.log(userId, "connected");

  await SocketController.updateOnlineStatus(socket, io, {
    userId,
    isOnline: true,
  });

  socket.on(EnumSocketEvent.TRIP_DRIVER_LOCATION_UPDATE, (payload) => {
    SocketController.updateDriverLocation(socket, io, { ...payload });
  });

  socket.on(EnumSocketEvent.SEND_MESSAGE, async (payload) => {
    ChatSocketController.sendMessage(socket, io, { ...payload, userId });
  });

  socket.on(EnumSocketEvent.DISCONNECT, () => {
    SocketController.updateOnlineStatus(socket, io, {
      userId,
      isOnline: false,
    });

    console.log(userId, "disconnected");
  });
});

module.exports = socketHandlers;
