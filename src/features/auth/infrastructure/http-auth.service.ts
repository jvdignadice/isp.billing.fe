import { AxiosInstance } from "axios";
import { z, ZodError } from "zod";
import { ApiClientError } from "@/shared/api/api-error";
import { AuthServiceContract } from "@/features/auth/contracts/auth-service.contract";
import {
  LoginFormValues,
  LoginResult,
  RegisterRequest,
} from "@/features/auth/types/login.types";

const loginResponseSchema = z.object({
  accessToken: z.string().min(1),
  tokenType: z.literal("Bearer"),
  expiresIn: z.string().min(1),
  user: z.object({
    id: z.string().min(1),
    email: z.string().email(),
    name: z.string().min(1),
    role: z.string().min(1),
  }),
});

export class HttpAuthService implements AuthServiceContract {
  constructor(private readonly httpClient: AxiosInstance) {}

  async login(values: LoginFormValues): Promise<LoginResult> {
    const normalizedEmail = values.email.trim().toLowerCase();
    const normalizedPassword = values.password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      throw new ApiClientError("Email and password are required.");
    }

    return this.authenticate("/auth/login", {
      email: normalizedEmail,
      password: normalizedPassword,
    });
  }

  async register(values: RegisterRequest): Promise<LoginResult> {
    const normalizedName = values.name.trim();
    const normalizedEmail = values.email.trim().toLowerCase();
    const normalizedPassword = values.password.trim();

    if (!normalizedName || !normalizedEmail || !normalizedPassword) {
      throw new ApiClientError("Name, email, and password are required.");
    }

    return this.authenticate("/auth/register", {
      name: normalizedName,
      email: normalizedEmail,
      password: normalizedPassword,
    });
  }

  private async authenticate(
    route: "/auth/login" | "/auth/register",
    payload: Record<string, string>,
  ): Promise<LoginResult> {
    try {
      const { data } = await this.httpClient.post<unknown>(route, payload);
      return loginResponseSchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ApiClientError("Auth response contract mismatch.", {
          details: error.flatten(),
        });
      }

      throw error;
    }
  }
}
