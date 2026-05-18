const { default: status } = require("http-status");
import { Socket } from "socket.io";
import emitError from "../socket/emitError";

/**
 * Validates required fields in socket event payloads
 * Throws custom errors when validation fails
 *
 * @param {Object} payload - The data object from socket event
 * @param {Array} requiredFields - Array of field names that are required
 * @param {Object} socket - Socket.io socket instance for error emission
 */
const validateSocketFields = (
  socket: Socket,
  payload: Record<string, unknown>,
  requiredFields: string[],
): void => {
  if (!payload) {
    emitError(socket, status.BAD_REQUEST, "Request payload is required");
  }

  for (const field of requiredFields) {
    if (
      payload[field] === undefined ||
      payload[field] === null ||
      (typeof payload[field] === "string" && payload[field].trim() === "")
    ) {
      emitError(socket, status.BAD_REQUEST, `${field} is required`);
    }
  }
};

export = validateSocketFields;
