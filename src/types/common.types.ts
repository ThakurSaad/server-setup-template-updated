export interface ApiResponse<T = unknown> {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: Record<string, unknown>;
  data?: T | null;
  activationToken?: string | null;
}
