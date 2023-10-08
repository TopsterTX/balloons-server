export type BackendResponse<T = unknown, E = unknown> = {
  success: boolean;
  error?: E | Error | null;
  data?: T | null;
};
