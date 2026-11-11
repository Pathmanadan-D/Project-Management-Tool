"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { signUpAction } from "@/actions/auth/sign-up";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PasswordStrength = "weak" | "medium" | "strong";

interface PasswordStrengthPresentation {
  label: "Weak" | "Medium" | "Strong";
  barClassName: string;
  labelClassName: string;
  widthClassName: string;
  value: number;
}

const PASSWORD_STRENGTH_PRESENTATION: Record<
  PasswordStrength,
  PasswordStrengthPresentation
> = {
  weak: {
    label: "Weak",
    barClassName: "bg-red-500",
    labelClassName: "text-red-500",
    widthClassName: "w-1/3",
    value: 1,
  },
  medium: {
    label: "Medium",
    barClassName: "bg-yellow-500",
    labelClassName: "text-yellow-500",
    widthClassName: "w-2/3",
    value: 2,
  },
  strong: {
    label: "Strong",
    barClassName: "bg-green-500",
    labelClassName: "text-green-500",
    widthClassName: "w-full",
    value: 3,
  },
};

function getPasswordStrength(password: string): PasswordStrength {
  const meetsStrongRequirements =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);

  if (meetsStrongRequirements) {
    return "strong";
  }

  if (password.length < 6) {
    return "weak";
  }

  return "medium";
}

interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  hasAcceptedTerms: boolean;
}

interface RegisterFormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

function isValidEmailFormat(email: string): boolean {
  const atIndex = email.indexOf("@");
  if (atIndex <= 0) {
    return false;
  }

  const domain = email.slice(atIndex + 1);
  const domainParts = domain.split(".");

  return domainParts.length >= 2 && domainParts.every((part) => part.length > 0);
}

function getRegisterFormErrors(values: RegisterFormValues): RegisterFormErrors {
  const errors: RegisterFormErrors = {};
  const trimmedFullName = values.fullName.trim();
  const trimmedEmail = values.email.trim();

  if (!trimmedFullName) {
    errors.fullName = "Full name is required";
  }

  if (!trimmedEmail) {
    errors.email = "Email address is required";
  } else if (!isValidEmailFormat(trimmedEmail)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (getPasswordStrength(values.password) === "weak") {
    errors.password = "Password must be medium strength or stronger";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords don't match";
  }

  if (!values.hasAcceptedTerms) {
    errors.terms = "You must agree to the Terms of Service";
  }

  return errors;
}

interface FieldErrorMessageProps {
  id: string;
  message: string | undefined;
}

function FieldErrorMessage({ id, message }: FieldErrorMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="text-xs font-medium text-red-500" role="alert">
      {message}
    </p>
  );
}

export function RegisterForm() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<RegisterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const isSubmittingRef = useRef<boolean>(false);
  const passwordStrength =
    password.length > 0 ? getPasswordStrength(password) : null;
  const passwordStrengthPresentation = passwordStrength
    ? PASSWORD_STRENGTH_PRESENTATION[passwordStrength]
    : null;
  const hasStartedConfirmPassword = confirmPassword.length > 0;
  const doPasswordsMatch = password === confirmPassword;

  function getCurrentValues(): RegisterFormValues {
    return {
      fullName,
      email,
      password,
      confirmPassword,
      hasAcceptedTerms,
    };
  }

  function updateFieldErrors(nextValues: RegisterFormValues): void {
    if (!hasAttemptedSubmit) {
      return;
    }

    setFieldErrors(getRegisterFormErrors(nextValues));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    setServerError(null);

    if (!hasAcceptedTerms) {
      return;
    }

    setHasAttemptedSubmit(true);
    const nextFieldErrors = getRegisterFormErrors(getCurrentValues());
    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const result = await signUpAction({
        full_name: fullName,
        email,
        password,
      });

      if (!result.success) {
        setServerError(result.error);
        return;
      }

      setSubmittedEmail(email.trim());
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  if (submittedEmail) {
    return null;
  }

  return (
    <form
      className="flex flex-col gap-4"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="full-name">Full Name</Label>
        <Input
          id="full-name"
          name="fullName"
          type="text"
          placeholder="Jane Smith"
          autoComplete="name"
          value={fullName}
          onChange={(event) => {
            const nextFullName = event.target.value;
            setFullName(nextFullName);
            updateFieldErrors({
              ...getCurrentValues(),
              fullName: nextFullName,
            });
          }}
          aria-invalid={Boolean(fieldErrors.fullName)}
          aria-describedby={
            fieldErrors.fullName ? "full-name-error" : undefined
          }
          className="h-10"
        />
        <FieldErrorMessage id="full-name-error" message={fieldErrors.fullName} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            const nextEmail = event.target.value;
            setEmail(nextEmail);
            updateFieldErrors({
              ...getCurrentValues(),
              email: nextEmail,
            });
          }}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
          className="h-10"
        />
        <FieldErrorMessage id="email-error" message={fieldErrors.email} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(event) => {
              const nextPassword = event.target.value;
              setPassword(nextPassword);
              updateFieldErrors({
                ...getCurrentValues(),
                password: nextPassword,
              });
            }}
            placeholder="Enter your password"
            autoComplete="new-password"
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={
              fieldErrors.password ? "password-error" : undefined
            }
            className="h-10 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute top-1/2 right-1.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsPasswordVisible((current) => !current)}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? <Eye /> : <EyeOff />}
          </Button>
        </div>
        {passwordStrengthPresentation ? (
          <div className="flex flex-col gap-1.5">
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-border"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={3}
              aria-valuenow={passwordStrengthPresentation.value}
              aria-label={`Password strength: ${passwordStrengthPresentation.label}`}
            >
              <div
                className={`h-full rounded-full transition-all duration-200 ${passwordStrengthPresentation.barClassName} ${passwordStrengthPresentation.widthClassName}`}
              />
            </div>
            <p
              className={`text-xs font-medium ${passwordStrengthPresentation.labelClassName}`}
            >
              {passwordStrengthPresentation.label}
            </p>
          </div>
        ) : null}
        <FieldErrorMessage id="password-error" message={fieldErrors.password} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirm-password"
            name="confirmPassword"
            type={isConfirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => {
              const nextConfirmPassword = event.target.value;
              setConfirmPassword(nextConfirmPassword);
              updateFieldErrors({
                ...getCurrentValues(),
                confirmPassword: nextConfirmPassword,
              });
            }}
            placeholder="Confirm your password"
            autoComplete="new-password"
            aria-invalid={Boolean(fieldErrors.confirmPassword)}
            aria-describedby={
              fieldErrors.confirmPassword
                ? "confirm-password-error"
                : undefined
            }
            className="h-10 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute top-1/2 right-1.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() =>
              setIsConfirmPasswordVisible((current) => !current)
            }
            aria-label={
              isConfirmPasswordVisible
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >
            {isConfirmPasswordVisible ? <Eye /> : <EyeOff />}
          </Button>
        </div>
        {hasStartedConfirmPassword ? (
          <p
            className={`flex items-center gap-1.5 text-xs font-medium ${
              doPasswordsMatch ? "text-green-500" : "text-red-500"
            }`}
            aria-live="polite"
          >
            {doPasswordsMatch ? (
              <Check className="size-3.5" aria-hidden="true" />
            ) : (
              <X className="size-3.5" aria-hidden="true" />
            )}
            {doPasswordsMatch ? "Passwords match" : "Passwords don't match"}
          </p>
        ) : null}
        <FieldErrorMessage
          id="confirm-password-error"
          message={fieldErrors.confirmPassword}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <Checkbox
            id="accept-terms"
            name="acceptTerms"
            checked={hasAcceptedTerms}
            onCheckedChange={(checked) => {
              const nextHasAcceptedTerms = checked === true;
              setHasAcceptedTerms(nextHasAcceptedTerms);
              updateFieldErrors({
                ...getCurrentValues(),
                hasAcceptedTerms: nextHasAcceptedTerms,
              });
            }}
            className="mt-0.5"
            aria-labelledby="accept-terms-label"
            aria-invalid={Boolean(fieldErrors.terms)}
            aria-describedby={fieldErrors.terms ? "terms-error" : undefined}
          />
          <Label
            id="accept-terms-label"
            htmlFor="accept-terms"
            className="font-normal text-muted-foreground"
          >
            I agree to the{" "}
            <Link
              href="/terms-of-service"
              className="font-medium text-[#3B82F6] hover:text-[#2563EB] hover:underline"
            >
              Terms of Service
            </Link>
          </Label>
        </div>
        <FieldErrorMessage id="terms-error" message={fieldErrors.terms} />
      </div>

      <div className="mt-1 flex flex-col gap-1.5">
        <Button
          type="submit"
          size="lg"
          disabled={!hasAcceptedTerms || isSubmitting}
          className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB] disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100"
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>
        {serverError ? (
          <p className="text-xs font-medium text-red-500" role="alert">
            {serverError}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          OR
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button type="button" variant="outline" size="lg" className="w-full">
        <GoogleIcon />
        Continue with Google
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-[#3B82F6] hover:text-[#2563EB] hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.82-.07-1.64-.23-2.43H12v4.6h6.46a5.52 5.52 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.55-5.17 3.55-8.8Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.97-1.07 7.96-2.93l-3.88-3c-1.08.72-2.47 1.13-4.08 1.13-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.24A7.2 7.2 0 0 1 4.89 12c0-.78.14-1.53.38-2.24V6.67H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.33l4-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.35.6 4.6 1.79l3.44-3.44C17.96 1.19 15.24 0 12 0 7.31 0 3.2 2.69 1.27 6.67l4 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}
