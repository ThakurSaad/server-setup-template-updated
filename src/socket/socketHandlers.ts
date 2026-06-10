import { Server, Socket } from "socket.io";
import { EnumSocketEvent } from "../util/enum";
import socketCatchAsync from "../util/socketCatchAsync";
import ChatSocketController from "./chat.socket.controller";
import SocketController from "./socket.controller";
import chalk from "chalk";

const socketHandlers = socketCatchAsync(async (socket: Socket, io: Server) => {
  console.log("Trying to connect");

  const userId = socket.handshake.query.userId as string;

  const user = await SocketController.validateUser(socket, io, { userId });
  if (!user) return;

  socket.join(userId);

  console.log(userId, chalk.green("connected"));

  await SocketController.updateOnlineStatus(socket, io, {
    userId,
    isOnline: true,
  });

  socket.on(EnumSocketEvent.UPDATE_LOCATION, async (payload) => {
    await SocketController.updateLocation(socket, io, { ...payload, userId });
  });

  socket.on(EnumSocketEvent.SEND_MESSAGE, async (payload) => {
    await ChatSocketController.sendMessage(socket, io, { ...payload, userId });
  });

  socket.on(EnumSocketEvent.DISCONNECT, async () => {
    await SocketController.updateOnlineStatus(socket, io, {
      userId,
      isOnline: false,
    });

    console.log(userId, chalk.red("disconnected"));
  });
});

export = socketHandlers;
