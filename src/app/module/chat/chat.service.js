const { default: status } = require("http-status");
const Chat = require("./Chat");
const QueryBuilder = require("../../../builder/queryBuilder");
const ApiError = require("../../../error/ApiError");
const validateFields = require("../../../util/validateFields");
const postNotification = require("../../../util/postNotification");
const User = require("../user/User");
const { default: mongoose } = require("mongoose");
const Message = require("./Message");

const postChat = async (userData, payload) => {
  const { userId } = userData;
  const { receiverId } = payload;

  validateFields(payload, ["receiverId"]);

  const [user, receiver, existingChat] = await Promise.all([
    User.findById(userId).lean(),
    User.findById(receiverId).lean(),
    Chat.findOne({
      participants: { $all: [userId, receiverId] },
    }),
  ]);

  if (!user) throw new ApiError(status.NOT_FOUND, "User not found");
  if (!receiver) throw new ApiError(status.NOT_FOUND, "Receiver not found");
  if (existingChat) return existingChat;

  const newChat = await Chat.create({
    participants: [userId, receiverId],
    messages: [],
  });

  postNotification(
    "New message",
    "You have started a new conversation",
    receiverId
  );
  postNotification(
    "New message",
    "You have started a new conversation",
    userId
  );

  return newChat;
};

const getChatMessages = async (userData, query) => {
  validateFields(query, ["chatId"]);

  const chat = await Chat.findOne({
    _id: query.chatId,
  })
    .populate([
      {
        path: "participants",
        select: "name phoneNumber profile_image",
      },
    ])
    .lean();

  if (!chat) throw new ApiError(status.NOT_FOUND, "Chat not found");

  return chat;
};

const getAllChats = async (userData, query) => {
  const userId = mongoose.Types.ObjectId.createFromHexString(userData.userId);

  const chats = await Chat.aggregate([
    {
      $match: {
        participants: {
          $in: [userId],
        },
      },
    },
    {
      $lookup: {
        from: "messages",
        let: {
          messageIds: "$messages",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ["$_id", "$$messageIds"] },
                  { $eq: ["$receiver", userId] },
                  { $eq: ["$isRead", false] },
                ],
              },
            },
          },
        ],
        as: "unreadMessages",
      },
    },
    {
      $addFields: {
        unRead: { $size: "$unreadMessages" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "participants",
        foreignField: "_id",
        as: "participants",
      },
    },
    {
      $project: {
        unreadMessages: 0,
      },
    },
  ]);

  return {
    // meta,
    chats,
  };
};

const updateMessageAsSeen = async (userData, payload) => {
  /**
   * Updates all unread messages in a chat as seen for the logged-in user
   * Meaning update unread messages where the logged-in user is the receiver
   */
  const userId = userData.userId; // logged in user who's viewing the chat

  validateFields(payload, ["chatId"]);

  const chat = await Chat.findById(payload.chatId).lean();

  if (!chat) throw new ApiError(status.NOT_FOUND, "Chat not found");

  const result = await Message.updateMany(
    {
      _id: { $in: chat.messages },
      receiver: userId,
      isRead: false,
    },
    {
      $set: { isRead: true },
    }
  );

  return result;
};

const ChatService = {
  postChat,
  getChatMessages,
  getAllChats,
  updateMessageAsSeen,
};

module.exports = ChatService;
