"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(false);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="full-name">Full Name</Label>
        <Input
          id="full-name"
          name="fullName"
          type="text"
          placeholder="Jane Smith"
          autoComplete="name"
          className="h-10"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          className="h-10"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="new-password"
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
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirm-password"
            name="confirmPassword"
            type={isConfirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm your password"
            autoComplete="new-password"
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
      </div>

      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <Checkbox
          id="accept-terms"
          name="acceptTerms"
          checked={hasAcceptedTerms}
          onCheckedChange={(checked) => {
            setHasAcceptedTerms(checked === true);
          }}
          className="mt-0.5"
          aria-labelledby="accept-terms-label"
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

      <Button
        type="button"
        size="lg"
        disabled={!hasAcceptedTerms}
        className="mt-1 w-full bg-[#3B82F6] text-white hover:bg-[#2563EB] disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100"
      >
        Create Account
      </Button>

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
