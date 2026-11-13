"use server";

import { createClient } from "@/lib/supabase/server";

interface ResendSignupEmailInput {
  email: string;
}

type ResendSignupEmailResult =
  | { success: true }
  | { success: false; error: string };

const GENERIC_RESEND_ERROR =
  "Failed to resend the verification email. Please try again.";

export async function resendSignupEmailAction(
  input: ResendSignupEmailInput
): Promise<ResendSignupEmailResult> {
  const email = input.email.trim();

  if (!email) {
    return {
      success: false,
      error: GENERIC_RESEND_ERROR,
    };
  }

  try {
    const supabase = await createClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${siteUrl}/verify-email`,
      },
    });

    if (error) {
      console.error("resendSignupEmailAction error:", error);
      return {
        success: false,
        error: GENERIC_RESEND_ERROR,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("resendSignupEmailAction error:", error);
    return {
      success: false,
      error: GENERIC_RESEND_ERROR,
    };
  }
}
