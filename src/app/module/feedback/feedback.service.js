const { status } = require("http-status");

const ApiError = require("../../../error/ApiError");
const QueryBuilder = require("../../../builder/queryBuilder");
const postNotification = require("../../../util/postNotification");
const Feedback = require("./Feedback");
const User = require("../user/User");
const validateFields = require("../../../util/validateFields");
const { EnumUserRole } = require("../../../util/enum");

const postFeedback = async (userData, payload) => {
  validateFields(payload, ["feedback"]);
  let user;

  if (!userData) validateFields(payload, ["name", "email"]);
  else user = await User.findById(userData.userId).lean();

  const feedbackData = {
    ...(userData && {
      user: userData.userId,
      name: user.name,
      email: user.email,
    }),
    ...(!userData && {
      name: payload.name,
      email: payload.email,
    }),
    feedback: payload.feedback,
  };

  const feedback = await Feedback.create(feedbackData);

  if (userData)
    postNotification(
      "Thank You",
      "Thank you for your valuable feedback 🫡",
      userData.userId
    );

  postNotification(
    "New Feedback",
    "Selling point got a new feedback. Check it out!"
  );

  return feedback;
};

const getFeedback = async (userData, query) => {
  validateFields(query, ["feedbackId"]);

  const feedback = await Feedback.findById(query.feedbackId);
  if (!feedback) throw new ApiError(status.NOT_FOUND, "Feedback not found");

  return feedback;
};

const getMyFeedback = async (userData) => {
  const { userId } = userData;

  const feedback = await Feedback.find({ user: userId });
  if (!feedback.length)
    throw new ApiError(status.NOT_FOUND, "Feedback not found");

  return {
    count: feedback.length,
    feedback,
  };
};

const getAllFeedbacks = async (userData, query) => {
  const queryObj =
    userData.role === EnumUserRole.ADMIN ? {} : { user: userData.userId };

  const feedbackQuery = new QueryBuilder(Feedback.find(queryObj).lean(), query)
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [feedback, meta] = await Promise.all([
    feedbackQuery.modelQuery,
    feedbackQuery.countTotal(),
  ]);

  return {
    meta,
    feedback,
  };
};

const updateFeedbackWithReply = async (useData, payload) => {
  validateFields(payload, ["feedbackId", "reply"]);

  const feedback = await Feedback.findByIdAndUpdate(
    payload.feedbackId,
    { reply: payload.reply },
    { new: true, runValidators: true }
  );

  if (!feedback) throw new ApiError(status.NOT_FOUND, "Feedback not found");

  if (feedback.user)
    postNotification(
      "Feedback Reply",
      "Admin has replied to your feedback",
      feedback.user
    );

  return feedback;
};

const deleteFeedback = async (userData, payload) => {
  validateFields(payload, ["feedbackId"]);

  const result = await Feedback.deleteOne({ _id: payload.feedbackId });

  if (!result.deletedCount)
    throw new ApiError(status.NOT_FOUND, "Feedback not found");

  return result;
};

const FeedbackService = {
  postFeedback,
  getFeedback,
  getMyFeedback,
  getAllFeedbacks,
  updateFeedbackWithReply,
  deleteFeedback,
};

module.exports = { FeedbackService };
