import type { Response } from "express";
import type { ApiResponse } from "../types/common.types";

const sendResponse = <T>(res: Response, data: ApiResponse<T>) => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message ?? null,
    meta: data.meta ?? undefined,
    data: data.data ?? null,
    activationToken: data.activationToken ?? null,
  };

  if (responseData.activationToken === null)
    delete responseData.activationToken;
  res.status(data.statusCode).json(responseData);
};

export = sendResponse;
