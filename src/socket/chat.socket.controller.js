const { default: status } = require("http-status");

const Chat = require("../app/module/chat/Chat");
const Message = require("../app/module/chat/Message");

const { EnumSocketEvent } = require("../util/enum");
const postNotification = require("../util/postNotification");
const validateSocketFields = require("../util/validateSocketFields");
const emitError = require("./emitError");

const sendMessage = socketCatchAsync(async (socket, io, payload) => {
  validateSocketFields(socket, payload, ["receiverId", "chatId", "message"]);
  const { userId, receiverId, chatId, message } = payload;

  const existingChat = await Chat.findOne({
    _id: chatId,
    participants: { $all: [userId, receiverId] },
  });

  if (!existingChat)
    return emitError(socket, status.NOT_FOUND, "Chat not found");

  const newMessage = await Message.create({
    sender: userId,
    receiver: receiverId,
    message,
  });

  // notify both user and driver upon new message
  postNotification("New message", message, receiverId);
  postNotification("New message", message, userId);

  await Promise.all([
    Chat.updateOne({ _id: chatId }, { $push: { messages: newMessage._id } }),
  ]);

  // Broadcast to user
  io.to(userId).emit(
    EnumSocketEvent.SEND_MESSAGE,
    emitResult({
      statusCode: status.OK,
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    })
  );

  // Broadcast to receiver
  io.to(receiverId).emit(
    EnumSocketEvent.SEND_MESSAGE,
    emitResult({
      statusCode: status.OK,
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    })
  );

  return newMessage;
});

const ChatSocketController = {
  sendMessage,
};

module.exports = ChatSocketController;
