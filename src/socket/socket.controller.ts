import User from "../app/module/user/User";
import emitError from "./emitError";
import emitResult from "./emitResult";
import socketCatchAsync from "../util/socketCatchAsync";
import { EnumSocketEvent } from "../util/enum";
import validateSocketFields from "../util/validateSocketFields";
import { Server, Socket } from "socket.io";

const { default: status } = require("http-status");

const validateUser = socketCatchAsync(
  async (
    socket: Socket,
    io: Server,
    payload: Record<string, unknown>,
  ): Promise<any> => {
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
  },
);

const updateOnlineStatus = socketCatchAsync(
  async (
    socket: Socket,
    io: Server,
    payload: Record<string, unknown>,
  ): Promise<any> => {
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
  },
);

const updateLocation = socketCatchAsync(
  async (
    socket: Socket,
    io: Server,
    payload: Record<string, unknown>,
  ): Promise<any> => {
    validateSocketFields(socket, payload, ["userId", "lat", "long"]);

    const { userId, lat, long } = payload;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { locationCoordinates: { coordinates: [Number(long), Number(lat)] } },
      { returnDocument: "after", runValidators: true },
    );

    // Broadcast to everyone (consider throttling in production)
    io.emit(
      EnumSocketEvent.UPDATE_LOCATION,
      emitResult({
        statusCode: status.OK,
        success: true,
        message: "Location updated",
        data: updatedUser.locationCoordinates,
      }),
    );
  },
);

const SocketController = {
  validateUser,
  updateOnlineStatus,
  updateLocation,
};

export = SocketController;
