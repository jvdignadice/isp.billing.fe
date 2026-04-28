export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterFormValues extends RegisterRequest {
  confirmPassword: string;
}

export interface LoginUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginResult {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: string;
  user: LoginUser;
}
