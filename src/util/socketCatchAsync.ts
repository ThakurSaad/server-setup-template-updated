import { Server, Socket } from "socket.io";

const socketCatchAsync = (
  fn: (socket: Socket, io: Server, payload: any) => Promise<void>,
) => {
  return async (socket: Socket, io: Server, payload: any) => {
    try {
      return await fn(socket, io, payload);
    } catch (error) {
      console.log("🔌Socket error🔌", error);
    }
  };
};

export = socketCatchAsync;
