import { createServerClient } from "@supabase/ssr";
import type { Session } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

export async function getSessionFromRequest(
  request: NextRequest
): Promise<Session | null> {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
        },
      },
    }
  );

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("getSessionFromRequest error:", error);
    return null;
  }

  // Enforcement added in Priority 10
  return session;
}
