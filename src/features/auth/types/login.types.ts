export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginResult {
  sessionToken: string;
  userEmail: string;
}

