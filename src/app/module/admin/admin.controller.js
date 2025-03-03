const sendResponse = require("../../../util/sendResponse");
const { AdminService } = require("./admin.service");
const catchAsync = require("../../../util/catchAsync");

const updateProfile = catchAsync(async (req, res) => {
  const result = await AdminService.updateProfile(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const getProfile = catchAsync(async (req, res) => {
  const result = await AdminService.getProfile(req.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin retrieved successfully",
    data: result,
  });
});

const deleteMyAccount = catchAsync(async (req, res) => {
  await AdminService.deleteMyAccount(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Account deleted!",
  });
});

const AdminController = {
  updateProfile,
  getProfile,
  deleteMyAccount,
};

module.exports = { AdminController };
