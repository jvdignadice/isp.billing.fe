import { useState } from "react";
import { BaseForm, BaseFormField, FormErrors } from "@/shared/forms/base-form";
import { Modal } from "@/shared/ui/modal";
import { login } from "@/features/auth/api/login";
import { LoginFormValues, LoginResult } from "@/features/auth/types/login.types";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type LoginFormFieldName = Extract<keyof LoginFormValues, string>;

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

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [loginResult, setLoginResult] = useState<LoginResult | null>(null);

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleClose = () => {
    setLoginResult(null);
    onClose();
  };

  const handleLoginSubmit = async (values: LoginFormValues) => {
    const result = await login(values);
    setLoginResult(result);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Sign In To Billing Workspace"
      subtitle="Reusable form foundation in action: same base can power create invoice, add customer, and collect payment flows."
    >
      {loginResult ? (
        <section className="login-success">
          <h3>Login Flow Ready</h3>
          <p>
            Auth simulation passed for <strong>{loginResult.userEmail}</strong>. Session token:
            <code>{loginResult.sessionToken}</code>
          </p>
          <button className="btn btn--primary" type="button" onClick={handleClose}>
            Continue
          </button>
        </section>
      ) : (
        <BaseForm<LoginFormFieldName>
          fields={loginFormFields}
          initialValues={initialValues}
          submitLabel="Sign In"
          submittingLabel="Verifying..."
          validate={validateLoginForm}
          onSubmit={handleLoginSubmit}
          footer={
            <p className="login-modal__note">
              This modal uses the shared <code>BaseForm</code> component and can be reused by all
              future forms.
            </p>
          }
        />
      )}
    </Modal>
  );
}
