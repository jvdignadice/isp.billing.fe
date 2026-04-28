import { z, ZodError } from "zod";
import { httpClient } from "@/shared/api/http-client";
import { ApiClientError } from "@/shared/api/api-error";
import { HealthResponse } from "@/features/health/types/health.types";

const healthResponseSchema = z.object({
  service: z.string(),
  status: z.literal("ok"),
  timestamp: z.string().datetime(),
});

export async function getHealth(): Promise<HealthResponse> {
  try {
    const { data } = await httpClient.get<unknown>("/health");
    return healthResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ApiClientError(
        "Backend health response does not match the expected contract.",
        { details: error.flatten() },
      );
    }

    throw error;
  }
}
