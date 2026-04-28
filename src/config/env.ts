import { z } from "zod";

const envSchema = z.object({
  VITE_APP_NAME: z.string().min(1).default("ISP Billing Portal"),
  VITE_API_BASE_URL: z.string().url().default("http://localhost:3000/api"),
});

const viteEnv = import.meta.env as Record<string, string | undefined>;

const parsedEnv = envSchema.safeParse({
  VITE_APP_NAME: viteEnv.VITE_APP_NAME,
  VITE_API_BASE_URL: viteEnv.VITE_API_BASE_URL,
});

if (!parsedEnv.success) {
  const issueMessages = parsedEnv.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(", ");
  throw new Error(`Invalid environment variables: ${issueMessages}`);
}

export const env = parsedEnv.data;
