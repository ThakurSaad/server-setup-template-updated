import type { AuthUserPayload } from "./auth.types";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
      uploadedFiles?: string[];
      files?: { [fieldname: string]: Multer.File[] } | Multer.File[];
    }
  }
}

export {};
