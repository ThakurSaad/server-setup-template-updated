import type { NextFunction, Request, Response } from "express";
import deleteUploadedFiles from "./deleteUploadedFiles";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

const catchAsync =
  (fn: AsyncHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next);
    } catch (error) {
      deleteUploadedFiles(req.uploadedFiles);
      next(error);
    }
  };

export = catchAsync;
