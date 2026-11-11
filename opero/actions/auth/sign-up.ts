"use server";

import { createClient } from "@/lib/supabase/server";

interface SignUpInput {
  full_name: string;
  email: string;
  password: string;
}

type SignUpResult =
  | { success: true }
  | { success: false; error: string };

const EMAIL_ALREADY_REGISTERED_ERROR =
  "An account with this email already exists";
const GENERIC_SIGN_UP_ERROR = "Failed to create account. Please try again.";

function isEmailAlreadyRegistered(message: string, code?: string): boolean {
  const normalizedCode = code?.toLowerCase();
  const normalizedMessage = message.toLowerCase();

  return (
    normalizedCode === "user_already_exists" ||
    normalizedCode === "email_exists" ||
    normalizedMessage.includes("already registered") ||
    normalizedMessage.includes("already been registered") ||
    normalizedMessage.includes("user already exists")
  );
}

export async function signUpAction(
  input: SignUpInput
): Promise<SignUpResult> {
  const fullName = input.full_name.trim();
  const email = input.email.trim();
  const password = input.password;

  if (!fullName || !email || !password) {
    return {
      success: false,
      error: "Please fill in all required fields.",
    };
  }

  try {
    const supabase = await createClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${siteUrl}/verify-email`,
      },
    });

    if (error) {
      console.error("signUpAction error:", error);

      if (isEmailAlreadyRegistered(error.message, error.code)) {
        return {
          success: false,
          error: EMAIL_ALREADY_REGISTERED_ERROR,
        };
      }

      return {
        success: false,
        error: GENERIC_SIGN_UP_ERROR,
      };
    }

    // Supabase may return an empty identities list when the email is already registered
    if (data.user?.identities?.length === 0) {
      return {
        success: false,
        error: EMAIL_ALREADY_REGISTERED_ERROR,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("signUpAction error:", error);

    return {
      success: false,
      error: GENERIC_SIGN_UP_ERROR,
    };
  }
}
