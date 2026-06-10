import chalk from "chalk";
import { Server, Socket } from "socket.io";

const socketCatchAsync = (
  fn: (socket: Socket, io: Server, payload: any) => Promise<any>,
) => {
  return async (socket: Socket, io: Server, payload: any) => {
    try {
      return await fn(socket, io, payload);
    } catch (error) {
      console.log(chalk.red("💀 Socket"), error);
    }
  };
};

export = socketCatchAsync;
