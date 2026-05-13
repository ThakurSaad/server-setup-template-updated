import { UserService } from "./user.service";
import sendResponse from "../../../util/sendResponse";
import catchAsync from "../../../util/catchAsync";
import { Request, Response } from "express";

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateProfile(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getProfile(req.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const deleteMyAccount = catchAsync(async (req: Request, res: Response) => {
  await UserService.deleteMyAccount(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Account deleted!",
  });
});

const UserController = {
  deleteMyAccount,
  getProfile,
  updateProfile,
};

export { UserController };
