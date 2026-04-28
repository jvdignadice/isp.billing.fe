import { AuthServiceContract } from "@/features/auth/contracts/auth-service.contract";
import { HttpAuthService } from "@/features/auth/infrastructure/http-auth.service";
import { httpClient } from "@/shared/api/http-client";

export interface ServiceContainer {
  authService: AuthServiceContract;
}

export function createServiceContainer(): ServiceContainer {
  return {
    authService: new HttpAuthService(httpClient),
  };
}

