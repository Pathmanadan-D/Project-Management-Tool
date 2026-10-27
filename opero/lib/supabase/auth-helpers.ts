import type { AuthError, Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

function isExpectedAuthAbsence(error: AuthError): boolean {
  const message = error.message.toLowerCase();

  return (
    error.name === "AuthSessionMissingError" ||
    message.includes("session missing") ||
    message.includes("not authenticated")
  );
}

export async function getSession(): Promise<Session | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    if (!isExpectedAuthAbsence(error)) {
      console.error("getSession error:", error);
    }

    return null;
  }

  return data.session;
}

export async function getUser(): Promise<User | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    if (!isExpectedAuthAbsence(error)) {
      console.error("getUser error:", error);
    }

    return null;
  }

  return data.user;
}
