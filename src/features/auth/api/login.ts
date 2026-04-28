import { z } from "zod";
import { httpClient } from "@/shared/api/http-client";
import { ApiClientError } from "@/shared/api/api-error";
import { LoginFormValues, LoginResult } from "@/features/auth/types/login.types";

const healthResponseSchema = z.object({
  status: z.literal("ok"),
});

export async function login(values: LoginFormValues): Promise<LoginResult> {
  const normalizedEmail = values.email.trim().toLowerCase();
  const normalizedPassword = values.password.trim();

  if (!normalizedEmail || !normalizedPassword) {
    throw new ApiClientError("Email and password are required.");
  }

  const response = await httpClient.get<unknown>("/health");
  const parsed = healthResponseSchema.safeParse(response.data);

  if (!parsed.success) {
    throw new ApiClientError("Unable to validate backend health before login.");
  }

  await new Promise((resolve) => {
    setTimeout(resolve, 700);
  });

  return {
    sessionToken: `demo-session-${Date.now()}`,
    userEmail: normalizedEmail,
  };
}

