import type { AuthUserPayload } from "./auth.types";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
      uploadedFiles?: string[];
    }
  }
}

export {};
