import { FormEvent, ReactNode, useState } from "react";

export type FormErrors<TFieldName extends string> = Partial<Record<TFieldName, string>>;

export interface BaseFormField<TFieldName extends string> {
  name: TFieldName;
  label: string;
  type?: "text" | "email" | "password" | "tel";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

interface BaseFormProps<TFieldName extends string> {
  fields: ReadonlyArray<BaseFormField<TFieldName>>;
  initialValues: Record<TFieldName, string>;
  submitLabel: string;
  submittingLabel?: string;
  onSubmit: (values: Record<TFieldName, string>) => Promise<void> | void;
  validate?: (values: Record<TFieldName, string>) => FormErrors<TFieldName>;
  footer?: ReactNode;
}

function hasErrors<TFieldName extends string>(
  errors: FormErrors<TFieldName>,
): boolean {
  return Object.values(errors).some((value) => typeof value === "string" && value.length > 0);
}

export function BaseForm<TFieldName extends string>({
  fields,
  initialValues,
  submitLabel,
  submittingLabel = "Submitting...",
  onSubmit,
  validate,
  footer,
}: BaseFormProps<TFieldName>) {
  const [values, setValues] = useState<Record<TFieldName, string>>(initialValues);
  const [errors, setErrors] = useState<FormErrors<TFieldName>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (name: TFieldName, value: string) => {
    setValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));

    setErrors((previousErrors) => {
      if (!previousErrors[name]) {
        return previousErrors;
      }

      const nextErrors = { ...previousErrors };
      delete nextErrors[name];
      return nextErrors;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const nextErrors = validate ? validate(values) : {};
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("Form submission failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="base-form" onSubmit={(event) => void handleSubmit(event)} noValidate>
      {fields.map((field) => {
        const inputId = `base-form-${field.name}`;
        return (
          <div className="base-form__field" key={field.name}>
            <label htmlFor={inputId}>{field.label}</label>
            <input
              id={inputId}
              name={field.name}
              type={field.type ?? "text"}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              required={field.required}
              value={values[field.name]}
              onChange={(event) => handleFieldChange(field.name, event.target.value)}
            />
            {errors[field.name] ? (
              <p className="base-form__field-error">{errors[field.name]}</p>
            ) : null}
          </div>
        );
      })}

      {formError ? <p className="base-form__error">{formError}</p> : null}

      <button className="btn btn--primary base-form__submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? submittingLabel : submitLabel}
      </button>

      {footer ? <div className="base-form__footer">{footer}</div> : null}
    </form>
  );
}
