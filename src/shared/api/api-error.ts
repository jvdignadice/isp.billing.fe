import axios from "axios";

interface ApiErrorOptions {
  statusCode?: number;
  details?: unknown;
}

export class ApiClientError extends Error {
  statusCode?: number;
  details?: unknown;

  constructor(message: string, options?: ApiErrorOptions) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = options?.statusCode;
    this.details = options?.details;
  }
}

export function toApiError(error: unknown): ApiClientError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: unknown; statusCode?: unknown; details?: unknown }
      | undefined;

    return new ApiClientError(
      typeof data?.message === "string" ? data.message : error.message || "Request failed",
      {
        statusCode:
          typeof data?.statusCode === "number" ? data.statusCode : error.response?.status,
        details: data?.details,
      },
    );
  }

  if (error instanceof Error) {
    return new ApiClientError(error.message);
  }

  return new ApiClientError("Unknown error occurred");
}
