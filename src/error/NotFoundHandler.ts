import { Request, Response } from "express";

class NotFoundHandler {
  static handle(req: Request, res: Response) {
    return res.status(404).json({
      success: false,
      message: "Not Found",
      errorMessages: [
        {
          path: req.originalUrl,
          message: `This ${req.originalUrl} API Not Found`,
        },
      ],
    });
  }
}

export = NotFoundHandler;
