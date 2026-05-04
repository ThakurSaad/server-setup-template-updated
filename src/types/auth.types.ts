export type AppRole = "USER" | "DRIVER" | "PROPERTY_OWNER" | "ADMIN";

export interface AuthUserPayload {
  authId: string;
  userId: string;
  email: string;
  role: AppRole;
  iat?: number;
  exp?: number;
}
