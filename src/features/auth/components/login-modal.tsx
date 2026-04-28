import { useEffect, useState } from "react";
import { useServiceContainer } from "@/app/providers/use-service-container";
import { BaseForm, BaseFormField, FormErrors } from "@/shared/forms/base-form";
import { Modal } from "@/shared/ui/modal";
import {
  LoginFormValues,
  LoginResult,
  RegisterFormValues,
} from "@/features/auth/types/login.types";

export type AuthModalMode = "login" | "register";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (loginResult: LoginResult) => void;
  initialMode?: AuthModalMode;
}

type LoginFormFieldName = Extract<keyof LoginFormValues, string>;
type RegisterFormFieldName = Extract<keyof RegisterFormValues, string>;

const loginFormFields: ReadonlyArray<BaseFormField<LoginFormFieldName>> = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@ispbilling.com",
    autoComplete: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    autoComplete: "current-password",
    required: true,
  },
];

const registerFormFields: ReadonlyArray<BaseFormField<RegisterFormFieldName>> = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Jane Doe",
    autoComplete: "name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@ispbilling.com",
    autoComplete: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "At least 8 characters",
    autoComplete: "new-password",
    required: true,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Repeat your password",
    autoComplete: "new-password",
    required: true,
  },
];

function validateLoginForm(values: LoginFormValues): FormErrors<LoginFormFieldName> {
  const errors: FormErrors<LoginFormFieldName> = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email.";
  }

  if (!values.password.trim()) {
    errors.password = "Password is required.";
  } else if (values.password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

function validateRegisterForm(
  values: RegisterFormValues,
): FormErrors<RegisterFormFieldName> {
  const errors: FormErrors<RegisterFormFieldName> = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim()) {
    errors.name = "Full name is required.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Full name must be at least 2 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email.";
  }

  if (!values.password.trim()) {
    errors.password = "Password is required.";
  } else if (values.password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.password.trim() !== values.confirmPassword.trim()) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

export function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = "login",
}: LoginModalProps) {
  const { authService } = useServiceContainer();
  const [authMode, setAuthMode] = useState<AuthModalMode>(initialMode);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const loginInitialValues: LoginFormValues = {
    email: "",
    password: "",
  };
  const registerInitialValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setAuthMode(initialMode);
    setIsLoginSuccessful(false);
  }, [initialMode, isOpen]);

  const handleClose = () => {
    setIsLoginSuccessful(false);
    onClose();
  };

  const handleLoginSubmit = async (values: LoginFormValues) => {
    const result = await authService.login(values);
    setIsLoginSuccessful(true);
    onLoginSuccess(result);
  };

  const handleRegisterSubmit = async (values: RegisterFormValues) => {
    const result = await authService.register({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    setIsLoginSuccessful(true);
    onLoginSuccess(result);
  };

  const title =
    authMode === "register"
      ? "Create Your Billing Account"
      : "Sign In To Billing Workspace";
  const subtitle =
    authMode === "register"
      ? "Create an account and start managing customer billing operations."
      : "Reusable form foundation in action: same base can power create invoice, add customer, and collect payment flows.";

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      subtitle={subtitle}
    >
      {isLoginSuccessful ? (
        <section className="login-success">
          <h3>{authMode === "register" ? "Account Created" : "Login Flow Ready"}</h3>
          <p>
            {authMode === "register"
              ? "Your account was successfully created and signed in."
              : "Login successful. Your session is now active and the landing page is connected to the backend auth endpoint."}
          </p>
          <button className="btn btn--primary" type="button" onClick={handleClose}>
            Continue
          </button>
        </section>
      ) : authMode === "login" ? (
        <BaseForm<LoginFormFieldName>
          fields={loginFormFields}
          initialValues={loginInitialValues}
          submitLabel="Sign In"
          submittingLabel="Verifying..."
          validate={validateLoginForm}
          onSubmit={handleLoginSubmit}
          footer={
            <div className="auth-form-footer">
              <p className="login-modal__note">
                No account yet?{" "}
                <button
                  className="text-action"
                  type="button"
                  onClick={() => setAuthMode("register")}
                >
                  Create one now
                </button>
              </p>
            </div>
          }
        />
      ) : (
        <BaseForm<RegisterFormFieldName>
          fields={registerFormFields}
          initialValues={registerInitialValues}
          submitLabel="Create Account"
          submittingLabel="Creating..."
          validate={validateRegisterForm}
          onSubmit={handleRegisterSubmit}
          footer={
            <div className="auth-form-footer">
              <p className="login-modal__note">
                Already have an account?{" "}
                <button className="text-action" type="button" onClick={() => setAuthMode("login")}>
                  Sign in
                </button>
              </p>
            </div>
          }
        />
      )}
    </Modal>
  );
}
