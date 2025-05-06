const ChatService = require("./chat.service");
const sendResponse = require("../../../util/sendResponse");
const catchAsync = require("../../../util/catchAsync");

const postChat = catchAsync(async (req, res) => {
  const result = await ChatService.postChat(req.user, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Chat initiated",
    data: result,
  });
});

const getChatMessages = catchAsync(async (req, res) => {
  const result = await ChatService.getChatMessages(req.user, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Chat retrieved",
    data: result,
  });
});

const getAllChats = catchAsync(async (req, res) => {
  const result = await ChatService.getAllChats(req.user, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Chats retrieved",
    data: result,
  });
});

const updateMessageAsSeen = catchAsync(async (req, res) => {
  const result = await ChatService.updateMessageAsSeen(req.user, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Message updated as seen",
    data: result,
  });
});

const ChatController = {
  postChat,
  getChatMessages,
  getAllChats,
  updateMessageAsSeen,
};

module.exports = ChatController;
