import {
  LoginFormValues,
  LoginResult,
  RegisterRequest,
} from "@/features/auth/types/login.types";

export interface AuthServiceContract {
  login(values: LoginFormValues): Promise<LoginResult>;
  register(values: RegisterRequest): Promise<LoginResult>;
}
