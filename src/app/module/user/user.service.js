const { status } = require("http-status");

const ApiError = require("../../../error/ApiError");
const User = require("./User");
const Auth = require("../auth/Auth");
const unlinkFile = require("../../../util/unlinkFile");

const updateProfile = async (req) => {
  const { files, body: data } = req;
  const { userId, authId } = req.user;
  const updateData = { ...data };

  if (data?.profile_image === "")
    throw new ApiError(status.BAD_REQUEST, `Missing profile image`);

  if (files && files.profile_image)
    updateData.profile_image = files.profile_image[0].path;

  const existingUser = await User.findById(userId).lean();

  unlinkFile(existingUser.profile_image);

  const [auth, user] = await Promise.all([
    Auth.findByIdAndUpdate(
      authId,
      { name: updateData.name },
      {
        new: true,
      }
    ),
    User.findByIdAndUpdate(
      userId,
      { ...updateData },
      {
        new: true,
      }
    ).populate("authId"),
  ]);

  if (!auth || !user) throw new ApiError(status.NOT_FOUND, "User not found!");

  return user;
};

const getProfile = async (userData) => {
  const { userId, authId } = userData;

  const [auth, result] = await Promise.all([
    Auth.findById(authId).lean(),
    User.findById(userId).populate("authId").lean(),
  ]);

  if (!result || !auth) throw new ApiError(status.NOT_FOUND, "User not found");
  if (auth.isBlocked)
    throw new ApiError(status.FORBIDDEN, "You are blocked. Contact support");

  return result;
};

const deleteMyAccount = async (payload) => {
  const { email, password } = payload;

  const isUserExist = await Auth.isAuthExist(email);
  if (!isUserExist) throw new ApiError(status.NOT_FOUND, "User does not exist");
  if (
    isUserExist.password &&
    !(await Auth.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(status.FORBIDDEN, "Password is incorrect");
  }

  Promise.all([
    Auth.deleteOne({ email }),
    User.deleteOne({ authId: isUserExist._id }),
  ]);
};

const UserService = {
  getProfile,
  deleteMyAccount,
  updateProfile,
};

module.exports = { UserService };
