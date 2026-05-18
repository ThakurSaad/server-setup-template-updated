import rateLimit from "express-rate-limit";
import sendResponse from "../../util/sendResponse";
import { Request, Response } from "express";

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: async (req: Request, res: Response) =>
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Too many requests please try again later",
    }),
});

export = limiter;
